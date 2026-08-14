/**
 * fix-math-blocks.mjs — Chuẩn hoá khối công thức trong web/content/bai-giai/*.md.
 *
 * marked-katex chỉ render khối $$...$$ khi delimiter đứng RIÊNG MỘT DÒNG và có
 * DÒNG TRỐNG trước/sau. Script thêm dòng trống + bỏ thụt lề cho mọi khối $$.
 * Chạy được nhiều lần (idempotent).
 *
 *   node scripts/fix-math-blocks.mjs [--dry-run] [--dir=<thư mục khác>]
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dirArg = process.argv.find((a) => a.startsWith("--dir="));
const DIR = dirArg ? dirArg.slice(6) : join(process.cwd(), "web", "content", "bai-giai");
const DRY = process.argv.includes("--dry-run");

function fixMath(src) {
  const L = src.replace(/\r\n/g, "\n").split("\n");
  const isD = (l) => l.trim() === "$$";
  const o = [];
  let i = 0;
  while (i < L.length) {
    if (isD(L[i])) {
      let j = i + 1;
      while (j < L.length && !isD(L[j])) j++;
      if (j < L.length) {
        if (o.length && o[o.length - 1].trim() !== "") o.push("");
        o.push("$$");
        for (let k = i + 1; k < j; k++) o.push(L[k].replace(/^\s+/, ""));
        o.push("$$");
        if (j + 1 < L.length && L[j + 1].trim() !== "") o.push("");
        i = j + 1;
        continue;
      }
    }
    o.push(L[i]);
    i++;
  }
  return o.join("\n").replace(/\n{3,}/g, "\n\n");
}

let changed = 0, total = 0;
for (const name of readdirSync(DIR)) {
  if (!name.endsWith(".md")) continue;
  total++;
  const p = join(DIR, name);
  const src = readFileSync(p, "utf8");
  // giữ nguyên frontmatter, chỉ xử lý phần thân
  const m = src.replace(/\r\n/g, "\n").match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  if (!m) continue;
  const fixed = m[1] + fixMath(m[2]);
  if (fixed !== src.replace(/\r\n/g, "\n")) {
    changed++;
    if (!DRY) writeFileSync(p, fixed, "utf8");
  }
}
console.log(`${total} file | ${changed} file được chuẩn hoá${DRY ? " (DRY-RUN)" : ""}`);
