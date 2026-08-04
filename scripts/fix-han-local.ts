/**
 * fix-han-local.ts — sửa chữ CJK trong file .md LOCAL (content-templates),
 * dùng chung bảng HAN_MAP + HAN_RE với fix-han-chars.ts.
 * Bổ trợ cho fix-han-chars.ts (bản đó chạy trên Strapi production).
 *
 * Chạy: npx tsx scripts/fix-han-local.ts <thư-mục> [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { HAN_MAP, HAN_RE, translate } from "./fix-han-chars.ts";

const dir = process.argv[2];
const DRY = process.argv.includes("--dry-run");
if (!dir) {
  console.error("Cần đường dẫn thư mục. VD: npx tsx scripts/fix-han-local.ts content-templates");
  process.exit(1);
}

function walk(d: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

let fixed = 0;
const skipped: { file: string; unknown: string[] }[] = [];
for (const file of walk(dir)) {
  const body = fs.readFileSync(file, "utf8");
  if (!HAN_RE.test(body)) continue;
  const { text, changed, unknown } = translate(body);
  if (unknown.length > 0) {
    skipped.push({ file, unknown });
    console.warn(`⚠  ${file}: chữ lạ ${unknown.join(" ")} — BỎ QUA`);
    continue;
  }
  if (!changed) continue;
  console.log(`✓ ${file}`);
  if (!DRY) fs.writeFileSync(file, text, "utf8");
  fixed++;
}
console.log(`\n${DRY ? "Sẽ sửa" : "Đã sửa"}: ${fixed} file. Bỏ qua (chữ lạ): ${skipped.length}`);
