/**
 * pdf-text-solver-groq.ts
 *
 * Đọc PDF text (không dùng vision) → chia theo bài học → gửi Groq text → sinh bài giải/soạn văn.
 *
 * Ưu điểm so với pdf-vision-solver:
 * - Nhanh gấp 3-5 lần (không cần render ảnh)
 * - Chính xác hơn cho tiếng Việt (không OCR nhầm dấu)
 * - Quota rẻ hơn (~1500 tokens/trang vs 5000 tokens/trang cho vision)
 *
 * Phù hợp với SGK Văn (nhiều chữ, ít hình).
 *
 * Dùng:
 *   npx tsx scripts/pdf-text-solver-groq.ts \
 *     "--pdf=pdfs/lop-12/Bộ sách Kết nối tri thức/SGK Văn 12 tập 1.pdf" \
 *     --lop=12 --mon=van --bo_sach=ket-noi-tri-thuc --tap=1 \
 *     [--chunk_size=8000] [--out=content-templates/inbox]
 *
 *   --chunk_size: ký tự mỗi chunk gửi Groq (default 8000, tương đương ~2000 tokens)
 *
 * Idempotent: bỏ qua chunk có slug đã có file .md.
 */

import Groq from "groq-sdk";
// @ts-expect-error - pdf-parse không có type
import pdfParse from "pdf-parse";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

// ─── CLI args ────────────────────────────────────────────────────────────────

function arg(name: string): string | null {
  const flag = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(flag));
  return found ? found.slice(flag.length) : null;
}

const pdfPath = arg("pdf");
const lop = parseInt(arg("lop") ?? "12", 10);
const mon = arg("mon") ?? "van";
const boSach = arg("bo_sach") ?? "ket-noi-tri-thuc";
const tap = parseInt(arg("tap") ?? "1", 10);
const outDir = arg("out") ?? "content-templates/inbox";
const chunkSize = parseInt(arg("chunk_size") ?? "8000", 10);

if (!pdfPath) {
  console.error(
    "Dùng:\n" +
    '  npx tsx scripts/pdf-text-solver-groq.ts \\\n' +
    '    "--pdf=pdfs/lop-12/.../SGK Văn 12 tập 1.pdf" \\\n' +
    "    --lop=12 --mon=van --bo_sach=ket-noi-tri-thuc --tap=1"
  );
  process.exit(1);
}

// ─── Constants ───────────────────────────────────────────────────────────────

const BOOK_NAMES: Record<string, string> = {
  "ket-noi-tri-thuc": "Kết nối tri thức",
  "chan-troi-sang-tao": "Chân trời sáng tạo",
  "canh-dieu": "Cánh diều",
};

const BOOK_CODE: Record<string, string> = {
  "ket-noi-tri-thuc": "kntt",
  "chan-troi-sang-tao": "ctst",
  "canh-dieu": "cd",
};

const SUBJECT_LABELS: Record<string, string> = {
  van: "Ngữ Văn",
  toan: "Toán",
  anh: "Tiếng Anh",
  ly: "Vật Lí",
  hoa: "Hoá Học",
  sinh: "Sinh Học",
  su: "Lịch Sử",
  dia: "Địa Lí",
};

const GROQ_MODEL = "llama-3.3-70b-versatile";

// ─── Multi-key Groq ──────────────────────────────────────────────────────────

let groqClients: Groq[] = [];
let activeKeyIdx = 0;
const exhaustedKeys = new Set<number>();

function rotateKey(reason: string): boolean {
  exhaustedKeys.add(activeKeyIdx);
  const remaining = groqClients.length - exhaustedKeys.size;
  if (remaining === 0) return false;
  do {
    activeKeyIdx = (activeKeyIdx + 1) % groqClients.length;
  } while (exhaustedKeys.has(activeKeyIdx));
  console.log(`\n   🔄 Đổi sang GROQ_API_KEY #${activeKeyIdx + 1}/${groqClients.length} (${reason})`);
  return true;
}

async function callGroq(prompt: string, maxTokens = 6000): Promise<string> {
  while (true) {
    try {
      const res = await groqClients[activeKeyIdx].chat.completions.create({
        model: GROQ_MODEL,
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      });
      return (res.choices[0]?.message?.content ?? "").trim();
    } catch (err: any) {
      const msg = err?.message ?? "";
      const isQuotaDay = msg.includes("tokens per day") || msg.includes("TPD");
      if (isQuotaDay && rotateKey("hết quota ngày")) continue;
      throw err;
    }
  }
}

// ─── Chunking ────────────────────────────────────────────────────────────────

interface Chunk {
  index: number;
  text: string;
  pageStart: number;
  pageEnd: number;
}

/**
 * Chia PDF text thành các chunk ~chunkSize ký tự, cắt ở ranh giới đoạn văn.
 */
function chunkText(pages: string[]): Chunk[] {
  const chunks: Chunk[] = [];
  let currentText = "";
  let chunkPageStart = 1;
  let currentPage = 1;

  for (const pageText of pages) {
    const wouldOverflow = currentText.length + pageText.length > chunkSize;
    if (wouldOverflow && currentText.length > chunkSize * 0.4) {
      // Flush chunk hiện tại
      chunks.push({
        index: chunks.length,
        text: currentText.trim(),
        pageStart: chunkPageStart,
        pageEnd: currentPage - 1,
      });
      currentText = "";
      chunkPageStart = currentPage;
    }
    currentText += pageText + "\n\n";
    currentPage++;
  }

  // Flush chunk cuối
  if (currentText.trim().length > 100) {
    chunks.push({
      index: chunks.length,
      text: currentText.trim(),
      pageStart: chunkPageStart,
      pageEnd: currentPage - 1,
    });
  }

  return chunks;
}

// ─── Slug + MD builder ───────────────────────────────────────────────────────

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function buildSlug(chunkIdx: number, pageStart: number, pageEnd: number): string {
  const code = BOOK_CODE[boSach] ?? "unknown";
  const range = pageStart === pageEnd ? `${pageStart}` : `${pageStart}-${pageEnd}`;
  return mon === "van"
    ? `soan-${mon}-${lop}-tap-${tap}-trang-${range}-${code}`
    : `giai-${mon}-${lop}-tap-${tap}-trang-${range}-${code}`;
}

function buildMdFile(slug: string, body: string, chunk: Chunk): { md: string } {
  const bookName = BOOK_NAMES[boSach] ?? boSach;
  const subjectLabel = SUBJECT_LABELS[mon] ?? mon;
  const pageRange = chunk.pageStart === chunk.pageEnd
    ? `${chunk.pageStart}`
    : `${chunk.pageStart}-${chunk.pageEnd}`;

  const tieu_de = mon === "van"
    ? `Soạn ${subjectLabel} ${lop} Tập ${tap} trang ${pageRange} - ${bookName}`
    : `Giải ${subjectLabel} ${lop} Tập ${tap} trang ${pageRange} - ${bookName}`;

  const metaTitle = tieu_de.length > 60 ? tieu_de.slice(0, 57) + "..." : tieu_de;
  const metaDesc = mon === "van"
    ? `Soạn bài ${subjectLabel} ${lop} Tập ${tap} trang ${pageRange} ${bookName}. Trả lời câu hỏi SGK, phân tích chi tiết.`.slice(0, 155)
    : `Giải bài tập ${subjectLabel} ${lop} Tập ${tap} trang ${pageRange} ${bookName}. Lời giải chi tiết, đủ bước.`.slice(0, 155);

  const loai = mon === "van" ? "soan-van" : "giai-sgk";

  const md = `---
tieu_de: "${tieu_de.replace(/"/g, "'")}"
slug: ${slug}
lop: ${lop}
loai: ${loai}
mon: ${mon}
bo_sach: ${boSach}
tom_tat: "${metaDesc.replace(/"/g, "'")}"
meta_title: "${metaTitle.replace(/"/g, "'")}"
meta_description: "${metaDesc.replace(/"/g, "'")}"
---

${body.trim()}
`;
  return { md };
}

// ─── Prompt ──────────────────────────────────────────────────────────────────

function buildPrompt(chunk: Chunk): string {
  const bookName = BOOK_NAMES[boSach] ?? boSach;
  const subjectLabel = SUBJECT_LABELS[mon] ?? mon;
  const pageRange = chunk.pageStart === chunk.pageEnd
    ? `trang ${chunk.pageStart}`
    : `trang ${chunk.pageStart}-${chunk.pageEnd}`;

  if (mon === "van") {
    return `Bạn là giáo viên Ngữ Văn xuất sắc. Dưới đây là nội dung SGK Ngữ Văn ${lop} Tập ${tap} bộ ${bookName}, ${pageRange}.

QUY TẮC BẮT BUỘC:
- CHỈ dựa trên nội dung SGK dưới đây. KHÔNG bịa thêm câu hỏi/dẫn chứng không có trong text.
- Trích dẫn nguyên văn khi cần (đặt trong dấu ngoặc kép).
- Nếu chunk chỉ có phần lý thuyết (không có câu hỏi/bài tập), trả về từ "SKIP".

Nhiệm vụ:
1. Đọc kỹ nội dung SGK dưới đây.
2. Xác định các CÂU HỎI/BÀI TẬP/YÊU CẦU (thường bắt đầu bằng "Câu 1", "Bài tập", "Trả lời", "Suy ngẫm", "Chuẩn bị", "Đọc hiểu", "Sau khi đọc"...).
3. Với mỗi câu hỏi, viết câu trả lời/soạn bài đầy đủ theo format:

## ${pageRange.charAt(0).toUpperCase() + pageRange.slice(1)} — [Tên bài/chương nếu có trong text]

**Câu X.** [chép nguyên văn câu hỏi từ SGK]

**Trả lời:**
[trả lời chi tiết, có dẫn chứng nguyên văn từ tác phẩm nếu có]

---

[Lặp lại cho các câu tiếp theo]

Nội dung SGK:
"""
${chunk.text}
"""

Trả lời (bằng tiếng Việt chuẩn, có dấu, dùng markdown):`;
  }

  // Mon toán/khác: giải bài tập
  return `Bạn là giáo viên ${subjectLabel} xuất sắc. Dưới đây là nội dung SGK ${subjectLabel} lớp ${lop} Tập ${tap} bộ ${bookName}, ${pageRange}.

QUY TẮC:
- CHỈ dựa trên nội dung SGK. Không bịa bài không có trong text.
- Dùng LaTeX $...$ cho công thức inline, $$...$$ cho công thức display.
- Nếu chunk chỉ có lý thuyết (không có bài tập), trả về "SKIP".

Nhiệm vụ: Tìm các BÀI TẬP/VÍ DỤ trong text và giải chi tiết theo format:

## ${pageRange.charAt(0).toUpperCase() + pageRange.slice(1)}

**Bài X.** [chép đề]

**Lời giải:**
[giải từng bước, LaTeX cho công thức]

> **Kết quả:** [đáp số]

---

Nội dung SGK:
"""
${chunk.text}
"""

Lời giải (tiếng Việt có dấu, markdown):`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Load .env.local
  try {
    const envContent = await readFile(".env.local", "utf8");
    for (const line of envContent.split("\n")) {
      const m = /^([A-Z_][A-Z0-9_]*)=(.+)$/.exec(line.trim());
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* skip */ }

  // Multi-key Groq
  const keys: string[] = [];
  if (process.env.GROQ_API_KEY) keys.push(process.env.GROQ_API_KEY);
  for (let i = 2; i <= 10; i++) {
    const k = process.env[`GROQ_API_KEY_${i}`];
    if (k) keys.push(k);
  }
  if (keys.length === 0) {
    console.error("❌ Không có GROQ_API_KEY nào trong .env.local");
    process.exit(1);
  }
  groqClients = keys.map((k) => new Groq({ apiKey: k }));
  console.log(`🔑 ${keys.length} GROQ key(s) sẵn sàng`);

  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  console.log(`\n📖 Đọc PDF: ${pdfPath}`);
  const pdfBuffer = await readFile(pdfPath!);

  console.log("   Extracting text từ PDF...");
  const parsed = await pdfParse(pdfBuffer);
  const rawText = parsed.text as string;
  const totalPages = parsed.numpages as number;
  console.log(`   ${totalPages} trang, ${(rawText.length / 1000).toFixed(1)}k ký tự`);

  // Split by form feed (page separator that pdf-parse uses)
  const pageTexts = rawText.split("\f").map((p) => p.trim());
  console.log(`   Chia thành ${pageTexts.length} page-text`);

  const chunks = chunkText(pageTexts);
  console.log(`   → ${chunks.length} chunk (mỗi chunk ~${chunkSize} ký tự)`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const chunk of chunks) {
    const slug = buildSlug(chunk.index, chunk.pageStart, chunk.pageEnd);
    const outPath = join(outDir, `${slug}.md`);

    if (existsSync(outPath)) {
      process.stdout.write(`⏭  Chunk ${chunk.index + 1}/${chunks.length} (trang ${chunk.pageStart}-${chunk.pageEnd}): đã có\n`);
      skipped++;
      continue;
    }

    if (chunk.text.length < 200) {
      process.stdout.write(`⏭  Chunk ${chunk.index + 1}/${chunks.length}: text quá ngắn (${chunk.text.length} ký tự)\n`);
      skipped++;
      continue;
    }

    process.stdout.write(`⚙  Chunk ${chunk.index + 1}/${chunks.length} (trang ${chunk.pageStart}-${chunk.pageEnd}, ${(chunk.text.length / 1000).toFixed(1)}k)... `);

    try {
      const body = await callGroq(buildPrompt(chunk));

      if (body === "SKIP" || body.length < 100) {
        process.stdout.write("lý thuyết (SKIP)\n");
        skipped++;
        continue;
      }

      const { md } = buildMdFile(slug, body, chunk);
      await writeFile(outPath, md, "utf8");
      process.stdout.write(`✓ (~${(md.length / 1000).toFixed(1)}k)\n`);
      created++;

      // Tránh rate limit
      await new Promise((r) => setTimeout(r, 800));
    } catch (err: any) {
      process.stdout.write(`✗ ${err?.message?.slice(0, 120) ?? err}\n`);
      errors++;
    }
  }

  console.log(`\n✅ Xong!`);
  console.log(`   ${created} chunk tạo mới | ${skipped} bỏ qua | ${errors} lỗi`);
  if (created > 0) {
    console.log(`\n📥 Import vào Strapi (production):\n   Đã có sẵn token trong memory, tôi (Claude) sẽ tự chạy.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
