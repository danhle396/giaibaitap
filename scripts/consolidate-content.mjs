/**
 * consolidate-content.mjs — Gom tất cả bài giải .md rải rác trong content-templates/
 * về MỘT thư mục duy nhất `web/content/bai-giai/<slug>.md` để Next.js đọc lúc build.
 *
 * - Bỏ qua: _skipped, _bo-qua, thư mục "de-" (file đề bài, không phải bài giải), file không có slug.
 * - Trùng slug: giữ bản có nội dung DÀI HƠN (thường là bản đầy đủ/mới hơn).
 * - Áp luôn các bản sửa đã làm trên production: thêm dòng trống quanh khối $$ (fix-math),
 *   thay cụm chữ Hán còn sót sang tiếng Việt (fix-CJK).
 *
 * Chạy: node scripts/consolidate-content.mjs [--dry-run]
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const SRC = join(ROOT, "content-templates");
const OUT = join(ROOT, "web", "content", "bai-giai");
const DRY = process.argv.includes("--dry-run");

const SKIP_DIR = /(^|[\\/])(_skipped|_bo-qua|extracted|de-[^\\/]*)([\\/]|$)/;

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = relative(SRC, p);
    if (statSync(p).isDirectory()) {
      if (SKIP_DIR.test(rel + "/")) continue;
      walk(p, acc);
    } else if (name.endsWith(".md")) {
      if (SKIP_DIR.test(rel)) continue;
      acc.push(p);
    }
  }
  return acc;
}

function parseFrontmatter(src) {
  const m = src.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    fm[mm[1]] = v;
  }
  return { fm, body: m[2] };
}

// --- các bản sửa đã áp trên production ---
function fixMath(src) {
  const L = src.replace(/\r\n/g, "\n").split("\n");
  const isD = (l) => l.trim() === "$$";
  const o = []; let i = 0;
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
        i = j + 1; continue;
      }
    }
    o.push(L[i]); i++;
  }
  return o.join("\n").replace(/\n{3,}/g, "\n\n");
}

const CJK_MAP = [
  ["描繪","khắc họa"],["描绘","khắc họa"],["描述","miêu tả"],["细致","tỉ mỉ"],
  ["展示","thể hiện"],["几个","một số"],["两个","hai"],["生活","cuộc sống"],
  ["幸福","hạnh phúc"],["黒暗","u ám"],["黑暗","u ám"],["芸術","nghệ thuật"],
  ["残忍","tàn nhẫn"],["珍惜","trân trọng"],["文学","văn học"],["探討","khám phá"],
  ["探讨","khám phá"],["观察","quan sát"],["代表","tượng trưng"],["继续","tiếp tục"],
  ["虽然","tuy"],["受到","nhận"],["是在","là ở"],
  ["描 tả","miêu tả"],["富 hình","giàu hình"],["简 dị","giản dị"],
  ["tính詩","tính thi"],["sự复","sự phức"],["决 tâm","quyết tâm"],["決 tâm","quyết tâm"],
  ["分 tích","phân tích"],["现 thực","hiện thực"],["独 đáo","độc đáo"],
  ["宣 bố","tuyên bố"],["魂 của","hồn của"],["hình象","hình tượng"],
  ["tuyên言","tuyên ngôn"],["phản思","suy ngẫm"],["những 点","những điểm"],
  ["thể現","thể hiện"],["thể现","thể hiện"],
];
function fixCJK(s) {
  for (const [a, b] of CJK_MAP) s = s.split(a).join(b);
  return s;
}

const files = walk(SRC);
const bySlug = new Map();
let noFm = 0;

for (const f of files) {
  const raw = readFileSync(f, "utf8");
  const p = parseFrontmatter(raw);
  if (!p || !p.fm.slug) { noFm++; continue; }
  const slug = p.fm.slug.trim();
  const prev = bySlug.get(slug);
  if (!prev || p.body.length > prev.body.length) {
    bySlug.set(slug, { ...p, file: f });
  }
}

// build output
if (!DRY) mkdirSync(OUT, { recursive: true });
let written = 0, fixedMath = 0, fixedCjk = 0;
for (const [slug, rec] of bySlug) {
  let body = rec.body;
  const b1 = fixMath(body);
  if (b1 !== body) { fixedMath++; body = b1; }
  const b2 = fixCJK(body);
  if (b2 !== body) { fixedCjk++; body = b2; }

  const fm = rec.fm;
  const esc = (v) => `"${String(v).replace(/"/g, '\\"')}"`;
  const lines = ["---"];
  for (const key of ["tieu_de","slug","lop","loai","mon","bo_sach","tom_tat","meta_title","meta_description","bai_so","chuong"]) {
    if (fm[key] !== undefined && fm[key] !== "") lines.push(`${key}: ${esc(fm[key])}`);
  }
  lines.push("---", "", body.trim(), "");
  if (!DRY) writeFileSync(join(OUT, `${slug}.md`), lines.join("\n"), "utf8");
  written++;
}

console.log(`Quét ${files.length} file .md (bỏ ${noFm} file không có slug)`);
console.log(`Slug duy nhất: ${bySlug.size}`);
console.log(`Đã sửa khối $$: ${fixedMath} bài | sửa chữ Hán: ${fixedCjk} bài`);
console.log(DRY ? "(DRY-RUN, chưa ghi)" : `Đã ghi ${written} file → web/content/bai-giai/`);
