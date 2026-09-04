/**
 * fix-trung-tieu-de.mjs — Sửa các bài bị Google gộp vì trùng tiêu đề.
 *
 * Hai lỗi khác nhau, xử lý theo thứ tự:
 *
 * 1. meta_title bị cắt cứng ở 60 ký tự rồi thêm "..." — mà phần bị cắt lại
 *    chính là tên bộ sách. tieu_de vẫn còn đủ, nên lấy lại tieu_de.
 * 2. Bài "Tóm tắt ..." / "Văn mẫu ..." của 3 bộ sách dùng chung y hệt tiêu đề
 *    và mô tả. Nội dung thực tế khác nhau (đo được chỉ ~10% trùng), nên gắn
 *    tên bộ sách vào là đủ phân biệt.
 *
 *   node scripts/fix-trung-tieu-de.mjs [--dry-run]
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = join(process.cwd(), "web", "content", "bai-giai");
const DRY = process.argv.includes("--dry-run");

const NHAN = {
  "ket-noi-tri-thuc": "Kết nối tri thức",
  "chan-troi-sang-tao": "Chân trời sáng tạo",
  "canh-dieu": "Cánh diều",
};

// Regex literal, KHÔNG dùng new RegExp với chuỗi — dấu \ trong chuỗi JS bị mất.
const RE = {
  tieu_de: /^(tieu_de:\s*")(.*)("\s*)$/m,
  meta_title: /^(meta_title:\s*")(.*)("\s*)$/m,
  meta_description: /^(meta_description:\s*")(.*)("\s*)$/m,
  tom_tat: /^(tom_tat:\s*")(.*)("\s*)$/m,
};
const layBo = (s) => (s.match(/^bo_sach:\s*"?([a-z-]+)/m) || [])[1] || "";
const lay = (s, k) => (s.match(RE[k]) || [])[2] || "";

const files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
const arts = files.map((f) => {
  const raw = readFileSync(join(DIR, f), "utf8");
  return { f, raw, crlf: raw.includes("\r\n"), s: raw.replace(/\r\n/g, "\n") };
});

// ---- Bước 1: khôi phục meta_title bị cắt cụt ----
let khoiPhuc = 0;
for (const a of arts) {
  const mt = lay(a.s, "meta_title"), td = lay(a.s, "tieu_de");
  if (mt.endsWith("...") && td && !td.endsWith("...")) {
    a.s = a.s.replace(RE.meta_title, (m, p, v, q) => `${p}${td}${q}`);
    khoiPhuc++;
  }
}

// ---- Bước 2: nhóm nào còn trùng thì gắn tên bộ sách ----
const nhom = {};
for (const a of arts) {
  const t = lay(a.s, "meta_title");
  if (t) (nhom[t] = nhom[t] || []).push(a);
}
const trung = Object.values(nhom).filter((v) => v.length > 1);

/** Chèn " bộ <Nhãn>" sau mệnh đề đầu tiên của mô tả. */
const themBo = (v, nhan) => {
  if (!v || v.includes(nhan)) return v;
  const i = v.indexOf(". ");
  return i > 0 ? v.slice(0, i) + ` bộ ${nhan}` + v.slice(i) : `${v} Bộ ${nhan}.`;
};

let ganNhan = 0, boQua = 0;
for (const g of trung) {
  for (const a of g) {
    const nhan = NHAN[layBo(a.s)];
    if (!nhan) { console.log(`  BỎ QUA (không rõ bộ sách): ${a.f}`); boQua++; continue; }
    for (const k of ["tieu_de", "meta_title"]) {
      a.s = a.s.replace(RE[k], (m, p, v, q) => (v.includes(nhan) ? m : `${p}${v} (${nhan})${q}`));
    }
    for (const k of ["meta_description", "tom_tat"]) {
      a.s = a.s.replace(RE[k], (m, p, v, q) => `${p}${themBo(v, nhan)}${q}`);
    }
    ganNhan++;
  }
}

// ---- Ghi ----
let ghi = 0;
for (const a of arts) {
  if (a.s === a.raw.replace(/\r\n/g, "\n")) continue;
  if (!DRY) writeFileSync(join(DIR, a.f), a.crlf ? a.s.replace(/\n/g, "\r\n") : a.s, "utf8");
  ghi++;
}

// ---- Kiểm lại ----
const sau = {};
for (const a of arts) { const t = lay(a.s, "meta_title"); if (t) (sau[t] = sau[t] || []).push(a.f); }
const conTrung = Object.entries(sau).filter(([, v]) => v.length > 1);

console.log(`\nKhôi phục meta_title bị cắt : ${khoiPhuc} bài`);
console.log(`Gắn tên bộ sách             : ${ganNhan} bài (bỏ qua ${boQua})`);
console.log(`Tổng file thay đổi          : ${ghi}`);
console.log(`Nhóm còn trùng sau khi sửa  : ${conTrung.length}`);
conTrung.slice(0, 5).forEach(([t, v]) => console.log(`  ${v.length}x  ${t.slice(0, 60)}`));
if (DRY) console.log("\n--dry-run: chưa ghi gì cả.");
