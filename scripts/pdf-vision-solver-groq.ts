/**
 * pdf-vision-solver-groq.ts
 *
 * Dùng Groq (free, không cần billing) với model Llama 4 Scout Vision.
 *
 * Setup:
 *   1. Đăng ký tại https://console.groq.com (chỉ cần email)
 *   2. Tạo API key tại https://console.groq.com/keys
 *   3. Thêm vào .env.local: GROQ_API_KEY=gsk_...
 *
 * Dùng:
 *   npx tsx scripts/pdf-vision-solver-groq.ts \
 *     "--pdf=pdfs/lop-10/1. SGK Toán 10 tập 1 Kết nối tri thức.pdf" \
 *     --lop=10 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=1 \
 *     [--pages=5-106] [--out=content-templates/inbox]
 *
 * Idempotent: bỏ qua slug đã có file .md.
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
const outDir = arg("out") ?? "content-templates/inbox";
const pagesArg = arg("pages");

if (!pdfPath) {
  console.error(
    "Dùng:\n" +
    '  npx tsx scripts/pdf-vision-solver-groq.ts \\\n' +
    '    "--pdf=pdfs/lop-10/toan-10-tap1.pdf" \\\n' +
    "    --lop=10 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=1 \\\n" +
    "    [--pages=5-106] [--out=content-templates/inbox]"
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

const CHUNK_SIZE = 4;
const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parsePageRange(spec: string | null, total: number): number[] {
  if (!spec) return Array.from({ length: total }, (_, i) => i + 1);
  if (spec.includes("-")) {
    const [a, b] = spec.split("-").map(Number);
    return Array.from({ length: b - a + 1 }, (_, i) => a + i);
  }
  return spec.split(",").map(Number);
}

function buildChunkSlug(firstPage: number, lastPage: number): string {
  const code = BOOK_CODE[boSach] ?? "unknown";
  return firstPage === lastPage
    ? `giai-toan-${lop}-tap-${tap}-trang-${firstPage}-${code}`
    : `giai-toan-${lop}-tap-${tap}-trang-${firstPage}-${lastPage}-${code}`;
}

function buildMdFile(pages: Array<{ page: number; content: string }>): { slug: string; md: string } {
  const firstPage = pages[0].page;
  const lastPage = pages[pages.length - 1].page;
  const bookName = BOOK_NAMES[boSach] ?? boSach;
  const slug = buildChunkSlug(firstPage, lastPage);
  const pageRange = firstPage === lastPage ? `${firstPage}` : `${firstPage}-${lastPage}`;
  const tieu_de = `Giải Toán ${lop} Tập ${tap} trang ${pageRange} - ${bookName}`;
  const metaTitle = tieu_de.length > 60 ? tieu_de.slice(0, 57) + "..." : tieu_de;
  const metaDesc = `Giải bài tập Toán ${lop} Tập ${tap} trang ${pageRange} ${bookName}. Lời giải chi tiết từng bài, đầy đủ các bước.`.slice(0, 155);
  const body = pages.map((p) => p.content.trim()).join("\n\n---\n\n");

  const md = `---
tieu_de: "${tieu_de.replace(/"/g, "'")}"
slug: ${slug}
lop: ${lop}
loai: giai-sgk
mon: ${mon}
bo_sach: ${boSach}
tom_tat: "Giải bài tập Toán ${lop} Tập ${tap} trang ${pageRange} ${bookName}. Lời giải chi tiết, đủ bước, dành cho học sinh THPT."
meta_title: "${metaTitle.replace(/"/g, "'")}"
meta_description: "${metaDesc.replace(/"/g, "'")}"
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

async function analyzePageWithGroq(
  imageBuffer: Buffer,
  pageNum: number
): Promise<{ hasExercises: boolean; content: string }> {
  const base64 = imageBuffer.toString("base64");

  const prompt = `Đây là trang ${pageNum} trong SGK Toán lớp ${lop} (${BOOK_NAMES[boSach] ?? boSach}, Tập ${tap}).

Nhiệm vụ:
1. Trang này có BÀI TẬP / CÂU HỎI / LUYỆN TẬP / VÍ DỤ cần giải không?
2. Nếu CÓ: chép lại đề và giải chi tiết bằng Markdown + LaTeX.
3. Nếu KHÔNG (toàn lý thuyết, không có bài nào): trả về đúng 1 từ "SKIP".

Khi có bài tập, trả về theo format:
## Trang ${pageNum} — [Tên chương/bài nếu thấy trên trang]

**Bài X.** [chép lại đề nguyên văn]

**Lời giải:**
[giải từng bước, dùng LaTeX inline $...$ và display $$...$$]

> **Kết quả:** [đáp số]

---
[lặp lại cho bài tiếp theo trên trang]

Quy tắc:
- Mọi số, biến, công thức đều viết LaTeX
- Giải đủ bước cho học sinh lớp ${lop} hiểu được
- Hình vẽ/đồ thị: mô tả bằng lời thay thế
- Trắc nghiệm: giải thích lý do chọn đáp án`;

  while (true) {
    try {
      const response = await groqClients[activeKeyIdx].chat.completions.create({
        model: GROQ_MODEL,
        max_tokens: 4096,
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
      const hasExercises = text !== "SKIP" && text.length > 20;
      return { hasExercises, content: text };
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
  // Load .env.local
  try {
    const envContent = await readFile(".env.local", "utf8");
    for (const line of envContent.split("\n")) {
      const m = /^([A-Z_]+)=(.+)$/.exec(line.trim());
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* không có file thì thôi */ }

  // Multi-key: GROQ_API_KEY, GROQ_API_KEY_2, GROQ_API_KEY_3, ...
  const keys: string[] = [];
  if (process.env.GROQ_API_KEY) keys.push(process.env.GROQ_API_KEY);
  for (let i = 2; i <= 10; i++) {
    const k = process.env[`GROQ_API_KEY_${i}`];
    if (k) keys.push(k);
  }
  if (keys.length === 0) {
    console.error(
      "❌ Không có GROQ_API_KEY nào trong .env.local\n" +
      "   1. Đăng ký tại: https://console.groq.com\n" +
      "   2. Tạo key tại: https://console.groq.com/keys\n" +
      "   3. Thêm vào .env.local: GROQ_API_KEY=gsk_...\n" +
      "   4. Tạo thêm account để có GROQ_API_KEY_2, GROQ_API_KEY_3, ..."
    );
    process.exit(1);
  }
  groqClients = keys.map((k) => new Groq({ apiKey: k }));
  console.log(`🔑 ${keys.length} GROQ key(s) sẵn sàng (xoay vòng khi hết quota)`);

  console.log(`\n📖 Đọc PDF: ${pdfPath}`);
  const pdfBuffer = await readFile(pdfPath!);

  console.log("   Rendering tất cả trang (lần đầu có thể mất 1-2 phút)...");
  const pdfDoc = await pdfToImg(pdfBuffer, { scale: 2.0 });
  const totalPages = pdfDoc.length;
  console.log(`   ${totalPages} trang — đang load vào bộ nhớ...`);

  const pageNums = parsePageRange(pagesArg, totalPages);
  console.log(`🔍 Xử lý ${pageNums.length} trang: ${pageNums[0]}–${pageNums[pageNums.length - 1]}\n`);

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
    const { slug, md } = buildMdFile(pending);
    const outPath = join(outDir, `${slug}.md`);
    await writeFile(outPath, md, "utf8");
    console.log(`   💾 ${slug}.md — ${pending.length} trang, ~${(md.length / 1000).toFixed(1)}k ký tự`);
    created++;
    pending = [];
  }

  for (const pageNum of pageNums) {
    const singleSlug = buildChunkSlug(pageNum, pageNum);
    const singlePath = join(outDir, `${singleSlug}.md`);
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

      const { hasExercises, content } = await analyzePageWithGroq(imgBuffer, pageNum);

      if (!hasExercises) {
        process.stdout.write("lý thuyết\n");
        if (pending.length >= CHUNK_SIZE) await flush();
        skippedPages++;
      } else {
        process.stdout.write("✓ có bài tập\n");
        pending.push({ page: pageNum, content });
        if (pending.length >= CHUNK_SIZE) await flush();
      }

      // Groq free tier: 30 req/min, 30k TPM → delay 3s
      await new Promise((r) => setTimeout(r, 3000));
    } catch (err: any) {
      process.stdout.write(`✗ ${err?.message ?? err}\n`);
      await flush();
      errors++;
    }
  }

  await flush();

  console.log(`\n✅ Xong!`);
  console.log(`   ${created} file .md tạo mới | ${skippedPages} trang bỏ qua | ${errors} lỗi`);

  if (created > 0) {
    console.log(
      `\n📥 Import vào Strapi:\n` +
      `   npx tsx scripts/bulk-import.ts ${outDir}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
