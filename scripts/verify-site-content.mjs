/**
 * verify-site-content.mjs — Rà soát nội dung như website render THẬT.
 * Đọc trực tiếp `web/content/bai-giai/*.md` (nguồn dữ liệu của site kể từ 01/08/2026,
 * sau khi bỏ Strapi), tái tạo đúng pipeline render của web (marked + marked-katex-extension)
 * rồi quét HTML output tìm:
 *   1) Lỗi KaTeX (.katex-error)  → công thức hỏng / không hiển thị
 *   2) $ lẻ còn sót (ngoài <code>) → khối $$/$ không cân, hiện ra ký tự $ thô
 *   3) Ký tự CJK (Hán/Nhật/Hàn)   → lỗi phông chưa Việt hoá
 *
 * Chạy: node scripts/verify-site-content.mjs [--list]
 *
 * Cách sửa đã biết (xem memory verify-site-audit):
 *  - $ lẻ do khối $$ thiếu dòng trống trước/sau → scripts/consolidate-content.mjs tự xử lý.
 *  - Lỗi còn lại (Toán 10 cũ do Groq sinh) thường do LaTeX hỏng thật → phải giải lại từ PDF (V3).
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "../web/node_modules/marked/lib/marked.esm.js";
import markedKatex from "../web/node_modules/marked-katex-extension/src/index.js";

const DIR = join(process.cwd(), "web", "content", "bai-giai");
const LIST = process.argv.includes("--list");

const marked = new Marked();
marked.use(markedKatex({ throwOnError: false, nonStandard: true }));

const CJK = /[぀-ヿ㐀-䶿一-鿿가-힯豈-﫿]/;
const strayN = (h) => (h.replace(/<code[\s\S]*?<\/code>/g, "").match(/\$/g) || []).length;

const P = { katexError: [], stray: [], cjk: [] };
let total = 0;

for (const name of readdirSync(DIR)) {
  if (!name.endsWith(".md")) continue;
  total++;
  const slug = name.replace(/\.md$/, "");
  const raw = readFileSync(join(DIR, name), "utf8");
  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, "");

  if (CJK.test(body)) P.cjk.push(slug);
  const html = marked.parse(body, { gfm: true, breaks: false });
  if (html.includes("katex-error")) P.katexError.push(slug);
  const sd = strayN(html);
  if (sd > 0) P.stray.push({ slug, count: sd });
}

console.log(`Tổng: ${total} bài`);
console.log(`Lỗi KaTeX: ${P.katexError.length}`);
console.log(`$ lẻ: ${P.stray.length}`);
console.log(`CJK: ${P.cjk.length}`);

const union = new Set([...P.katexError, ...P.stray.map((s) => s.slug), ...P.cjk]);
console.log(`Tổng bài còn vấn đề: ${union.size}`);

if (LIST) {
  if (P.katexError.length) console.log("\n[KaTeX]\n  " + P.katexError.join("\n  "));
  if (P.stray.length)
    console.log(
      "\n[$ lẻ]\n  " +
        P.stray.sort((a, b) => b.count - a.count).map((x) => `${x.count}\t${x.slug}`).join("\n  "),
    );
  if (P.cjk.length) console.log("\n[CJK]\n  " + P.cjk.join("\n  "));
}
