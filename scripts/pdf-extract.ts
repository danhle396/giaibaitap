/**
 * pdf-extract.ts
 *
 * Bước 1: Trích xuất bài tập từ PDF sách giáo khoa Toán.
 * Tách PDF thành các "bài" (theo chương/bài SGK).
 *
 * Dùng:
 *   npx tsx scripts/pdf-extract.ts \
 *     --pdf=path/to/toan-12-kntt.pdf \
 *     --out=content-templates/extracted/toan-12-kntt
 *
 * Xuất ra: một folder JSON, mỗi file là một bài/section với:
 *   { title, page, rawText, exercises: string[] }
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

// pdf-parse is a CommonJS module
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

// ─── CLI args ────────────────────────────────────────────────────────────────

function arg(name: string): string | null {
  const flag = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(flag));
  return found ? found.slice(flag.length) : null;
}

const pdfPath = arg("pdf");
const outDir = arg("out");

if (!pdfPath || !outDir) {
  console.error("Usage: npx tsx scripts/pdf-extract.ts --pdf=<path> --out=<dir>");
  process.exit(1);
}

// ─── Regex patterns (SGK Toán Việt Nam) ─────────────────────────────────────

// Nhận biết đầu chương / bài / section
const CHAPTER_RE = /^(CHƯƠNG|Chương)\s+[IVXLCDM\d]+[.:：\s]/m;
const LESSON_RE = /^(Bài|BÀI)\s+\d+[.:\s]/m;
// Nhận biết phần bài tập (các patterns phổ biến trong SGK Toán)
const EXERCISE_SECTION_RE =
  /^(Bài tập|BÀI TẬP|Luyện tập|LUYỆN TẬP|Câu hỏi|CÂU HỎI|Thực hành|THỰC HÀNH)\s*$/im;
// Nhận biết từng bài tập cụ thể
const EXERCISE_ITEM_RE =
  /^(Bài|BÀI|Câu|CÂU|Ví dụ|VÍ DỤ)\s+\d+[.:\s]/m;

// ─── Parse PDF ───────────────────────────────────────────────────────────────

interface ExtractedSection {
  title: string;
  page: number;
  rawText: string;
  exercises: string[];
}

function splitIntoSections(text: string): ExtractedSection[] {
  const lines = text.split("\n");
  const sections: ExtractedSection[] = [];
  let currentTitle = "Giới thiệu";
  let currentPage = 1;
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Phát hiện trang
    const pageMatch = /^Trang\s+(\d+)|^(\d+)\s*$/.exec(trimmed);
    if (pageMatch) {
      currentPage = parseInt(pageMatch[1] ?? pageMatch[2], 10);
      continue;
    }

    // Phát hiện tiêu đề chương / bài mới
    const isChapter = CHAPTER_RE.test(trimmed);
    const isLesson = LESSON_RE.test(trimmed);

    if ((isChapter || isLesson) && trimmed.length > 3 && trimmed.length < 120) {
      // Lưu section hiện tại
      if (currentLines.length > 10) {
        sections.push({
          title: currentTitle,
          page: currentPage,
          rawText: currentLines.join("\n"),
          exercises: extractExercises(currentLines.join("\n")),
        });
      }
      currentTitle = trimmed;
      currentLines = [trimmed];
    } else {
      currentLines.push(line);
    }
  }

  // Lưu section cuối
  if (currentLines.length > 10) {
    sections.push({
      title: currentTitle,
      page: currentPage,
      rawText: currentLines.join("\n"),
      exercises: extractExercises(currentLines.join("\n")),
    });
  }

  return sections;
}

function extractExercises(text: string): string[] {
  const exercises: string[] = [];
  const lines = text.split("\n");

  let inExerciseSection = false;
  let currentExercise: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Vào phần bài tập
    if (EXERCISE_SECTION_RE.test(trimmed)) {
      inExerciseSection = true;
      continue;
    }

    if (!inExerciseSection) continue;

    // Bài tập mới bắt đầu
    if (EXERCISE_ITEM_RE.test(trimmed) && trimmed.length > 3) {
      if (currentExercise.length > 0) {
        const ex = currentExercise.join("\n").trim();
        if (ex.length > 20) exercises.push(ex);
      }
      currentExercise = [trimmed];
    } else if (currentExercise.length > 0) {
      // Tiếp tục bài tập hiện tại (kể cả dòng trống ngắn)
      currentExercise.push(line);
      // Nếu có 3 dòng trống liên tiếp → kết thúc bài tập
      if (
        currentExercise.slice(-3).every((l) => l.trim() === "") &&
        currentExercise.length > 5
      ) {
        const ex = currentExercise.join("\n").trim();
        if (ex.length > 20) exercises.push(ex);
        currentExercise = [];
      }
    }
  }

  // Bài tập cuối cùng
  if (currentExercise.length > 0) {
    const ex = currentExercise.join("\n").trim();
    if (ex.length > 20) exercises.push(ex);
  }

  return exercises;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nĐọc PDF: ${pdfPath}`);
  const buffer = await readFile(pdfPath!);
  const data = await pdfParse(buffer);

  console.log(
    `Tổng: ${data.numpages} trang, ~${data.text.length} ký tự text\n`,
  );

  const sections = splitIntoSections(data.text);
  console.log(`Tìm thấy ${sections.length} sections\n`);

  if (!existsSync(outDir!)) {
    await mkdir(outDir!, { recursive: true });
  }

  let totalExercises = 0;
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    totalExercises += sec.exercises.length;

    const fileName = `${String(i + 1).padStart(3, "0")}-${slugify(sec.title)}.json`;
    const outPath = join(outDir!, fileName);
    await writeFile(outPath, JSON.stringify(sec, null, 2), "utf8");
    console.log(
      `  [${i + 1}] "${sec.title}" (trang ${sec.page}) — ${sec.exercises.length} bài tập → ${fileName}`,
    );
  }

  console.log(`\nXong. Tổng ${totalExercises} bài tập trong ${outDir}`);
  console.log(
    `\nBước tiếp: npx tsx scripts/pdf-solver.ts --extracted=${outDir} --lop=12 --mon=toan --bo_sach=ket-noi-tri-thuc`,
  );
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
