/**
 * pdf-transcribe-groq.ts — PIPELINE V2, bước 1: QUÉT ĐỀ (không giải).
 *
 * Groq Vision chỉ CHÉP NGUYÊN VĂN đề bài/câu hỏi từ ảnh trang SGK.
 * Bước 2 (Claude Fable 5 trong phiên Claude Code) sẽ đọc file đề và GIẢI.
 *
 * Dùng:
 *   npx tsx scripts/pdf-transcribe-groq.ts \
 *     "--pdf=pdfs/lop-9/Bộ sách Kết nối tri thức/SGK Toán 9 tập 1.pdf" \
 *     --lop=9 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=1 \
 *     [--pages=81-123] [--out=content-templates/de-toan9-kntt-t1]
 *
 * Output: de-{mon}-{lop}-tap-{tap}-trang-X-Y-{code}.md — frontmatter chứa
 * metadata đích (slug bài giải, lớp, môn...) để Claude build bài giải đúng format.
 * Idempotent theo trang (như solver V1).
 */

import Groq from "groq-sdk";
import { pdf as pdfToImg } from "pdf-to-img";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

// ─── CLI args ────────────────────────────────────────────────────────────────

function arg(name: string): string | null {
  const flag = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(flag));
  return found ? found.slice(flag.length) : null;
}

const pdfPath = arg("pdf");
const lop = parseInt(arg("lop") ?? "10", 10);
const mon = arg("mon") ?? "toan";
const boSach = arg("bo_sach") ?? "ket-noi-tri-thuc";
const tap = parseInt(arg("tap") ?? "1", 10);
const outDir = arg("out") ?? `content-templates/de-${mon}${lop}`;
const pagesArg = arg("pages");

if (!pdfPath) {
  console.error(
    "Dùng:\n" +
    '  npx tsx scripts/pdf-transcribe-groq.ts \\\n' +
    '    "--pdf=pdfs/lop-9/.../SGK Toán 9 tập 1.pdf" \\\n' +
    "    --lop=9 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=1 \\\n" +
    "    [--pages=81-123] [--out=content-templates/de-toan9-kntt-t1]"
  );
  process.exit(1);
}

// ─── Constants (đồng bộ với pdf-vision-solver-groq.ts) ──────────────────────

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
  toan: "Toán", van: "Ngữ Văn", anh: "Tiếng Anh", ly: "Vật Lí",
  hoa: "Hoá Học", sinh: "Sinh Học", su: "Lịch Sử", dia: "Địa Lí", gdcd: "GDCD", tin: "Tin Học",
};

const CHUNK_SIZE = 4;
const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const IS_VAN = mon === "van";
const CODE = BOOK_CODE[boSach] ?? "unknown";

function parsePageRange(spec: string | null, total: number): number[] {
  if (!spec) return Array.from({ length: total }, (_, i) => i + 1);
  if (spec.includes("-")) {
    const [a, b] = spec.split("-").map(Number);
    return Array.from({ length: b - a + 1 }, (_, i) => a + i);
  }
  return spec.split(",").map(Number);
}

function deSlug(first: number, last: number): string {
  return first === last
    ? `de-${mon}-${lop}-tap-${tap}-trang-${first}-${CODE}`
    : `de-${mon}-${lop}-tap-${tap}-trang-${first}-${last}-${CODE}`;
}

// slug bài giải đích — trùng quy ước solver V1 để bulk-import idempotent hoạt động
function giaiSlug(first: number, last: number): string {
  const verb = IS_VAN ? "soan" : "giai";
  return first === last
    ? `${verb}-${mon}-${lop}-tap-${tap}-trang-${first}-${CODE}`
    : `${verb}-${mon}-${lop}-tap-${tap}-trang-${first}-${last}-${CODE}`;
}

function buildDeFile(pages: Array<{ page: number; content: string }>): { slug: string; md: string } {
  const first = pages[0].page;
  const last = pages[pages.length - 1].page;
  const slug = deSlug(first, last);
  const body = pages.map((p) => p.content.trim()).join("\n\n---\n\n");
  const md = `---
loai_file: de-bai
giai_slug: ${giaiSlug(first, last)}
lop: ${lop}
mon: ${mon}
bo_sach: ${boSach}
tap: ${tap}
trang: "${first === last ? first : `${first}-${last}`}"
sach: "${BOOK_NAMES[boSach] ?? boSach}"
---

${body}
`;
  return { slug, md };
}

// ─── Groq Vision (multi-key rotation) ─────────────────────────────────────────

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

async function transcribePage(
  imageBuffer: Buffer,
  pageNum: number
): Promise<{ hasContent: boolean; content: string }> {
  const base64 = imageBuffer.toString("base64");
  const subjectLabel = SUBJECT_LABELS[mon] ?? mon;
  const bookName = BOOK_NAMES[boSach] ?? boSach;

  const prompt = IS_VAN
    ? `Đây là trang ${pageNum} trong SGK Ngữ Văn lớp ${lop} (${bookName}, Tập ${tap}).

NHIỆM VỤ: CHỈ CHÉP LẠI nguyên văn các CÂU HỎI/YÊU CẦU trên trang. TUYỆT ĐỐI KHÔNG TRẢ LỜI, KHÔNG GIẢI THÍCH.

- Chép đủ: câu hỏi ("Câu 1", "Chuẩn bị", "Sau khi đọc", "Suy ngẫm và phản hồi", "Viết", "Nói và nghe", "Luyện tập"...), kèm tên tác phẩm/mục mà câu hỏi thuộc về.
- Nếu câu hỏi tham chiếu đoạn trích cụ thể trên trang, chép kèm 1-2 câu đầu của đoạn đó trong ngoặc kép để định vị.
- Nếu trang chỉ có: bìa/mục lục/lời nói đầu/tranh minh họa/văn bản đọc thuần không câu hỏi → trả về đúng 1 từ "SKIP".

Format:
## Trang ${pageNum} — [Tên bài/tác phẩm nếu thấy]

**Câu X.** [nguyên văn câu hỏi]

[lặp lại cho từng câu]`
    : `Đây là trang ${pageNum} trong SGK ${subjectLabel} lớp ${lop} (${bookName}, Tập ${tap}).

NHIỆM VỤ: CHỈ CHÉP LẠI nguyên văn ĐỀ của các bài tập/câu hỏi/luyện tập/vận dụng/ví dụ trên trang. TUYỆT ĐỐI KHÔNG GIẢI.

- Mọi số, biến, công thức viết bằng LaTeX ($...$).
- Bảng số liệu: chép thành bảng markdown đầy đủ.
- Hình vẽ/đồ thị kèm đề: mô tả ngắn gọn trong [Hình: ...] (chỉ thông tin cần để giải).
- Chép CHÍNH XÁC từng con số — không làm tròn, không đoán số bị mờ (số mờ ghi [?]).
- Nếu trang toàn lý thuyết, không có bài tập nào → trả về đúng 1 từ "SKIP".

Format:
## Trang ${pageNum} — [Tên chương/bài nếu thấy]

**Bài X.** [nguyên văn đề, đủ các ý a) b) c)]

[lặp lại cho từng bài — kể cả Ví dụ, Luyện tập, Vận dụng, HĐ]`;

  while (true) {
    try {
      const response = await groqClients[activeKeyIdx].chat.completions.create({
        model: GROQ_MODEL,
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: { url: `data:image/png;base64,${base64}` } },
              { type: "text", text: prompt },
            ],
          },
        ],
      });
      const text = (response.choices[0]?.message?.content ?? "").trim();
      const hasContent = text !== "SKIP" && text.length > 20;
      return { hasContent, content: text };
    } catch (err: any) {
      const msg = err?.message ?? "";
      const isQuotaDay = msg.includes("tokens per day") || msg.includes("TPD");
      if (isQuotaDay && rotateKey("hết quota ngày")) continue;
      throw err;
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  try {
    const envContent = await readFile(".env.local", "utf8");
    for (const line of envContent.split("\n")) {
      const m = /^([A-Z_][A-Z0-9_]*)=(.+)$/.exec(line.trim());
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* không có file thì thôi */ }

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
  console.log(`🔑 ${keys.length} GROQ key(s) sẵn sàng — CHẾ ĐỘ QUÉT ĐỀ (V2)`);

  console.log(`\n📖 Đọc PDF: ${pdfPath}`);
  const pdfBuffer = await readFile(pdfPath!);

  console.log("   Rendering tất cả trang...");
  const pdfDoc = await pdfToImg(pdfBuffer, { scale: 2.0 });
  const totalPages = pdfDoc.length;
  console.log(`   ${totalPages} trang — đang load vào bộ nhớ...`);

  const pageNums = parsePageRange(pagesArg, totalPages);
  console.log(`🔍 Quét đề ${pageNums.length} trang: ${pageNums[0]}–${pageNums[pageNums.length - 1]}\n`);

  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  const allPages: Buffer[] = [];
  for await (const page of pdfDoc) {
    allPages.push(page as Buffer);
  }

  let pending: Array<{ page: number; content: string }> = [];
  let created = 0;
  let skippedPages = 0;
  let errors = 0;

  async function flush() {
    if (pending.length === 0) return;
    const { slug, md } = buildDeFile(pending);
    const outPath = join(outDir, `${slug}.md`);
    await writeFile(outPath, md, "utf8");
    console.log(`   💾 ${slug}.md — ${pending.length} trang, ~${(md.length / 1000).toFixed(1)}k ký tự`);
    created++;
    pending = [];
  }

  for (const pageNum of pageNums) {
    const singlePath = join(outDir, `${deSlug(pageNum, pageNum)}.md`);
    if (existsSync(singlePath)) {
      process.stdout.write(`⏭  Trang ${pageNum}: file tồn tại\n`);
      await flush();
      skippedPages++;
      continue;
    }

    process.stdout.write(`⚙  Trang ${pageNum}/${pageNums[pageNums.length - 1]}... `);

    try {
      const imgBuffer = allPages[pageNum - 1];
      if (!imgBuffer) {
        process.stdout.write("(không có ảnh)\n");
        skippedPages++;
        continue;
      }

      const { hasContent, content } = await transcribePage(imgBuffer, pageNum);

      if (!hasContent) {
        process.stdout.write("lý thuyết\n");
        if (pending.length >= CHUNK_SIZE) await flush();
        skippedPages++;
      } else {
        process.stdout.write("✓ có đề\n");
        pending.push({ page: pageNum, content });
        if (pending.length >= CHUNK_SIZE) await flush();
      }

      await new Promise((r) => setTimeout(r, 3000));
    } catch (err: any) {
      process.stdout.write(`✗ ${err?.message ?? err}\n`);
      await flush();
      errors++;
    }
  }

  await flush();

  console.log(`\n✅ Quét đề xong!`);
  console.log(`   ${created} file đề | ${skippedPages} trang bỏ qua | ${errors} lỗi`);
  console.log(`\n➡  Bước 2: nói Claude "giải đề trong ${outDir}"`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
