/**
 * pdf-solver.ts
 *
 * Bước 2: Đọc JSON từ pdf-extract.ts, gọi Claude API giải từng bài,
 * xuất ra file .md sẵn sàng import vào Strapi.
 *
 * Dùng:
 *   ANTHROPIC_API_KEY=xxx npx tsx scripts/pdf-solver.ts \
 *     --extracted=content-templates/extracted/toan-12-kntt \
 *     --lop=12 \
 *     --mon=toan \
 *     --bo_sach=ket-noi-tri-thuc \
 *     --out=content-templates/inbox
 *
 * Mỗi section JSON → 1 file .md trong --out.
 * Idempotent: bỏ qua nếu file .md đã tồn tại.
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename } from "node:path";

// ─── CLI args ────────────────────────────────────────────────────────────────

function arg(name: string): string | null {
  const flag = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(flag));
  return found ? found.slice(flag.length) : null;
}

const extractedDir = arg("extracted");
const lop = parseInt(arg("lop") ?? "12", 10);
const mon = (arg("mon") ?? "toan") as string;
const boSach = (arg("bo_sach") ?? "ket-noi-tri-thuc") as string;
const outDir = arg("out") ?? "content-templates/inbox";

if (!extractedDir) {
  console.error(
    "Usage: ANTHROPIC_API_KEY=xxx npx tsx scripts/pdf-solver.ts " +
    "--extracted=<dir> --lop=12 --mon=toan --bo_sach=ket-noi-tri-thuc [--out=content-templates/inbox]",
  );
  process.exit(1);
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ExtractedSection {
  title: string;
  page: number;
  rawText: string;
  exercises: string[];
}

// ─── Claude client ───────────────────────────────────────────────────────────

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Bạn là giáo viên Toán THPT Việt Nam, chuyên soạn lời giải chi tiết sách giáo khoa.

Quy tắc viết lời giải:
1. Viết bằng Markdown, dùng LaTeX cho công thức: inline $...$ , display $$...$$
2. Mỗi bài tập: tiêu đề "### Bài X" (hoặc tên bài), sau đó "**Lời giải:**" rồi giải chi tiết
3. Giải từng bước, giải thích rõ ràng phù hợp học sinh THPT
4. Nếu có nhiều phần (a, b, c): tách từng phần rõ ràng
5. Cuối bài tập ghi kết quả trong block: > **Kết quả:** ...
6. Không thêm lời mở đầu hay kết luận thừa
7. Viết tiếng Việt, dùng thuật ngữ Toán học chuẩn SGK`;

async function solveSection(section: ExtractedSection): Promise<string> {
  if (section.exercises.length === 0) {
    return `*Phần này không có bài tập.*`;
  }

  const exercisesText = section.exercises
    .map((ex, i) => `[Bài tập ${i + 1}]\n${ex}`)
    .join("\n\n---\n\n");

  const userMessage = `Giải các bài tập sau từ SGK Toán lớp ${lop} (${section.title}):

${exercisesText}

Viết lời giải chi tiết theo định dạng Markdown + LaTeX.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}

// ─── Metadata helpers ────────────────────────────────────────────────────────

function buildSlug(title: string, lop: number, boSach: string): string {
  const base = slugify(title);
  const bookSuffix = boSach === "ket-noi-tri-thuc" ? "kntt" :
                     boSach === "chan-troi-sang-tao" ? "ctst" : "cd";
  return `giai-${base}-lop-${lop}-${bookSuffix}`;
}

function buildMetaTitle(title: string, lop: number): string {
  const raw = `Giải bài tập ${title} - Toán ${lop}`;
  return raw.length > 60 ? raw.slice(0, 57) + "..." : raw;
}

function buildMetaDescription(title: string, lop: number, boSach: string): string {
  const bookName = boSach === "ket-noi-tri-thuc" ? "Kết nối tri thức" :
                   boSach === "chan-troi-sang-tao" ? "Chân trời sáng tạo" : "Cánh diều";
  const raw = `Giải ${title} Toán lớp ${lop} ${bookName}. Lời giải chi tiết từng bài, có hướng dẫn phương pháp.`;
  return raw.length > 155 ? raw.slice(0, 152) + "..." : raw;
}

function buildFrontmatter(section: ExtractedSection): string {
  const slug = buildSlug(section.title, lop, boSach);
  const metaTitle = buildMetaTitle(section.title, lop);
  const metaDesc = buildMetaDescription(section.title, lop, boSach);
  const bookName = boSach === "ket-noi-tri-thuc" ? "Kết nối tri thức" :
                   boSach === "chan-troi-sang-tao" ? "Chân trời sáng tạo" : "Cánh diều";
  const tieu_de = `Giải ${section.title} - Toán ${lop} ${bookName}`;

  return `---
tieu_de: "${tieu_de.replace(/"/g, "'")}"
slug: ${slug}
lop: ${lop}
loai: giai-sgk
mon: ${mon}
bo_sach: ${boSach}
tom_tat: "Giải bài tập ${section.title} Toán lớp ${lop}. Lời giải chi tiết, từng bước, dễ hiểu dành cho học sinh THPT."
meta_title: "${metaTitle.replace(/"/g, "'")}"
meta_description: "${metaDesc.replace(/"/g, "'")}"
---`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ ANTHROPIC_API_KEY chưa được set");
    process.exit(1);
  }

  const files = (await readdir(extractedDir!))
    .filter((f) => f.endsWith(".json"))
    .sort();

  console.log(`\nTìm thấy ${files.length} sections trong ${extractedDir}\n`);

  let created = 0;
  let skipped = 0;
  let errored = 0;

  for (const file of files) {
    const jsonPath = join(extractedDir!, file);
    const section: ExtractedSection = JSON.parse(
      await readFile(jsonPath, "utf8"),
    );

    if (section.exercises.length === 0) {
      console.log(`⏭  ${file}: không có bài tập, bỏ qua`);
      skipped++;
      continue;
    }

    const slug = buildSlug(section.title, lop, boSach);
    const outPath = join(outDir, `${slug}.md`);

    if (existsSync(outPath)) {
      console.log(`⏭  ${file}: "${slug}.md" đã tồn tại, bỏ qua`);
      skipped++;
      continue;
    }

    console.log(
      `⚙  ${file}: giải ${section.exercises.length} bài tập cho "${section.title}"...`,
    );

    try {
      const solution = await solveSection(section);
      const frontmatter = buildFrontmatter(section);
      const intro = `## ${section.title}\n\n*Trang ${section.page} - SGK Toán ${lop}*\n`;
      const content = `${frontmatter}\n\n${intro}\n${solution}\n`;

      await writeFile(outPath, content, "utf8");
      console.log(`✓  → ${slug}.md`);
      created++;

      // Delay nhỏ để tránh rate limit
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`✗  ${file}: ${(err as Error).message}`);
      errored++;
    }
  }

  console.log(`\nXong: ${created} tạo mới, ${skipped} bỏ qua, ${errored} lỗi`);
  if (created > 0) {
    console.log(
      `\nBước tiếp: import vào Strapi:\n` +
      `  STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=xxx ` +
      `npx tsx scripts/bulk-import.ts ${outDir}`,
    );
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
