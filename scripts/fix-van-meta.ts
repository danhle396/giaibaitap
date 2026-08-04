/**
 * fix-van-meta.ts — dọn meta-text của model lọt vào bài soạn văn:
 *   - Dòng "SKIP" và khối "Câu N. Không có câu hỏi..." + "Trả lời:" mồ côi
 *   - Câu chatbot ("hãy cho tôi biết", "vui lòng cung cấp"...)
 *   - "trong ảnh/hình ảnh" (model nhìn ảnh PDF) → "trong trang"
 *   - Mục "## Trang N" rỗng sau khi dọn → xóa cả mục
 *
 * Chạy local:  npx tsx scripts/fix-van-meta.ts <thư-mục> [--dry-run]
 * Chạy prod:   STRAPI_URL=... STRAPI_API_TOKEN=... npx tsx scripts/fix-van-meta.ts --prod [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";

const DRY = process.argv.includes("--dry-run");
const PROD = process.argv.includes("--prod");

// Dòng cần XÓA hẳn (meta-text, không phải nội dung)
const DROP_LINE_RES: RegExp[] = [
  // Mọi dòng chứa từ SKIP nguyên vẹn (viết hoa) — đã kiểm chứng: không có nội dung thật nào chứa nó.
  // Bắt cả các dạng trang trí: **SKIP**, `SKIP`, $\boxed{SKIP}$, "**Kết luận:** SKIP", "## SKIP"...
  /\bSKIP\b/,
  /tôi trả về/i,                                               // "Vậy nên, tôi trả về: SKIP"
  /hãy cho tôi biết|vui lòng cung cấp|nếu bạn cần hỗ trợ|nếu có câu hỏi cụ thể/i,
  // "**Câu N.** Không có câu hỏi..." / "(Không có trong ảnh)" / "- Không có câu hỏi trong ảnh."
  /^[\s>*-]*\*{0,2}\(?\s*(câu hỏi\s+)?(không có|chưa (có|xuất hiện|được nêu))[^.]{0,80}(câu hỏi|yêu cầu|trong ảnh|trong hình|trang này)[^.]{0,40}\)?\.?\*{0,2}\s*$/i,
  /^\*\*Câu \d+\.\*\*\s*\(?\s*không có[^.]{0,80}\)?\.?\s*$/i,
];

// Thay thế trong dòng giữ lại
const REPLACERS: Array<[RegExp, string]> = [
  [/\*\*Câu hỏi trong (ảnh|hình ảnh):\*\*/gi, "**Câu hỏi:**"],
  [/trong (ảnh|hình ảnh) trang này/gi, "trong trang này"],
  [/trong hình ảnh/gi, "trong trang"],
  [/trong ảnh/gi, "trong trang"],
];

const TRALOI_RE = /^\*{0,2}\s*Trả lời:?\s*\*{0,2}\s*$/i;

export function cleanVanBody(body: string): { text: string; changed: boolean } {
  const lines = body.split("\n");
  const kept: string[] = [];
  for (const raw of lines) {
    if (DROP_LINE_RES.some((re) => re.test(raw))) continue;
    let line = raw;
    for (const [re, to] of REPLACERS) line = line.replace(re, to);
    kept.push(line);
  }

  // Xóa "Trả lời:" mồ côi — sau nó (bỏ dòng trống) là hết mục/hết file/"Câu N"/"---"
  const out: string[] = [];
  for (let i = 0; i < kept.length; i++) {
    if (TRALOI_RE.test(kept[i])) {
      let j = i + 1;
      while (j < kept.length && kept[j].trim() === "") j++;
      const next = j < kept.length ? kept[j] : "";
      if (!next || /^(##|---|\*\*Câu \d)/.test(next.trim())) continue; // mồ côi → bỏ
    }
    out.push(kept[i]);
  }

  // Xóa mục "## ..." không còn nội dung thật
  const joined = out.join("\n");
  const sections = joined.split(/^(?=## )/m);
  const goodSections = sections.filter((sec) => {
    if (!sec.startsWith("## ")) return true; // phần mở đầu trước mục đầu tiên
    const bodyOnly = sec
      .split("\n")
      .slice(1)
      .join("\n")
      .replace(/---/g, "")
      .trim();
    return bodyOnly.length >= 30;
  });

  let text = goodSections.join("");
  text = text.replace(/\n{3,}/g, "\n\n").replace(/(\n---\s*)+(?=\n---)/g, "");
  return { text, changed: text !== body };
}

// ---------- local mode ----------
function runLocal(dir: string) {
  let fixed = 0;
  const emptied: string[] = [];
  const walk = (d: string): string[] =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) return e.name === "_skipped" ? [] : walk(p);
      return e.name.endsWith(".md") ? [p] : [];
    });
  for (const file of walk(dir)) {
    const raw = fs.readFileSync(file, "utf8");
    // tách frontmatter
    const m = raw.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
    const fm = m ? m[1] : "";
    const body = m ? m[2] : raw;
    const { text, changed } = cleanVanBody(body);
    if (!changed) continue;
    if (text.trim().length < 400) emptied.push(file);
    console.log(`✓ ${file}`);
    if (!DRY) fs.writeFileSync(file, fm + text, "utf8");
    fixed++;
  }
  console.log(`\n${DRY ? "Sẽ sửa" : "Đã sửa"}: ${fixed} file`);
  if (emptied.length) {
    console.log(`⚠ ${emptied.length} file gần rỗng sau dọn (cân nhắc loại):`);
    emptied.forEach((f) => console.log("   " + f));
  }
}

// ---------- production mode ----------
async function runProd() {
  const STRAPI_URL = process.env.STRAPI_URL!;
  const TOKEN = process.env.STRAPI_API_TOKEN!;
  if (!STRAPI_URL || !TOKEN) throw new Error("Cần STRAPI_URL + STRAPI_API_TOKEN");
  const api = async (p: string, init: RequestInit = {}) => {
    const res = await fetch(`${STRAPI_URL}/api${p}`, {
      ...init,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}`, ...init.headers },
    });
    if (!res.ok) throw new Error(`${res.status} on ${p}: ${await res.text()}`);
    return res.json();
  };
  let page = 1, scanned = 0, fixed = 0;
  const emptied: string[] = [];
  for (;;) {
    const json: any = await api(
      `/bai-giais?fields[0]=slug&fields[1]=noi_dung&pagination[page]=${page}&pagination[pageSize]=100&status=published`,
    );
    for (const bai of json.data) {
      scanned++;
      const body: string = bai.noi_dung ?? "";
      const { text, changed } = cleanVanBody(body);
      if (!changed) continue;
      if (text.trim().length < 400) emptied.push(bai.slug);
      console.log(`✓ ${bai.slug}`);
      if (!DRY) {
        await api(`/bai-giais/${bai.documentId}?status=published`, {
          method: "PUT",
          body: JSON.stringify({ data: { noi_dung: text } }),
        });
      }
      fixed++;
    }
    if (page >= json.meta.pagination.pageCount) break;
    page++;
  }
  console.log(`\nQuét ${scanned} bài. ${DRY ? "Sẽ sửa" : "Đã sửa"}: ${fixed}`);
  if (emptied.length) {
    console.log(`⚠ ${emptied.length} bài gần rỗng sau dọn (cân nhắc gỡ):`);
    emptied.forEach((s) => console.log("   " + s));
  }
}

if (PROD) {
  runProd().catch((e) => { console.error(e); process.exit(1); });
} else {
  const dir = process.argv[2];
  if (!dir || dir.startsWith("--")) {
    console.error("Cần thư mục hoặc --prod");
    process.exit(1);
  }
  runLocal(dir);
}
