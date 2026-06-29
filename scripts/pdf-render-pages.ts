/**
 * pdf-render-pages.ts
 * Render PDF thành PNG, lưu theo trang để Claude đọc.
 * Không cần API key.
 *
 * Dùng:
 *   npx tsx scripts/pdf-render-pages.ts \
 *     --pdf="pdfs/lop-10/1. SGK Toán 10 tập 1 Kết nối tri thức.pdf" \
 *     --out=content-templates/extracted/toan-10-kntt-tap1 \
 *     [--pages=1-106]
 */

import { pdf as pdfToImg } from "pdf-to-img";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

function arg(name: string) {
  const flag = `--${name}=`;
  const f = process.argv.find((a) => a.startsWith(flag));
  return f ? f.slice(flag.length) : null;
}

const pdfPath = arg("pdf");
const outDir = arg("out");
const pagesArg = arg("pages");

if (!pdfPath || !outDir) {
  console.error("Dùng: npx tsx scripts/pdf-render-pages.ts --pdf=<path> --out=<dir> [--pages=1-50]");
  process.exit(1);
}

function parseRange(spec: string | null, total: number): number[] {
  if (!spec) return Array.from({ length: total }, (_, i) => i + 1);
  if (spec.includes("-")) {
    const [a, b] = spec.split("-").map(Number);
    return Array.from({ length: b - a + 1 }, (_, i) => a + i);
  }
  return spec.split(",").map(Number);
}

async function main() {
  console.log(`\nĐọc: ${pdfPath}`);
  const buf = await readFile(pdfPath!);
  const doc = await pdfToImg(buf, { scale: 2.0 });
  console.log(`${doc.length} trang`);

  if (!existsSync(outDir!)) await mkdir(outDir!, { recursive: true });

  const pages = parseRange(pagesArg, doc.length);
  let i = 0;
  for await (const page of doc) {
    i++;
    if (!pages.includes(i)) continue;
    const outPath = join(outDir!, `page-${String(i).padStart(3, "0")}.png`);
    if (!existsSync(outPath)) {
      await writeFile(outPath, page as Buffer);
    }
    process.stdout.write(`\r  Trang ${i}/${doc.length}`);
  }
  console.log(`\nXong → ${outDir}`);
}

main().catch(console.error);
