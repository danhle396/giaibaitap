/**
 * crop-figure.mjs — Cắt hình trong SGK từ ảnh trang PDF, xuất ra web/public/hinh/.
 *
 * Toạ độ nhận theo TỈ LỆ 0–1 (không theo pixel) để không phụ thuộc scale render:
 *   --box=x1,y1,x2,y2   góc trên-trái → góc dưới-phải
 *
 * Chạy:
 *   node scripts/crop-figure.mjs --img=<page.png> --box=0.32,0.43,0.77,0.59 \
 *        --out=hinh/toan-9-ctst-t2/trang-88-hinh-1.webp [--trim] [--w=760]
 *
 * `--trim` cắt bỏ viền trắng đều quanh hình (dùng khi ước lượng box hơi rộng).
 * `--w` giới hạn chiều rộng (mặc định 760px — vừa khung nội dung của web).
 */
import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const sharp = (await import(
  "file:///e:/giaibaitap/web/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js"
)).default;

const arg = (n, d = null) => {
  const f = process.argv.find((a) => a.startsWith(`--${n}=`));
  return f ? f.slice(n.length + 3) : d;
};

const img = arg("img");
const box = arg("box");
const out = arg("out");
const maxW = Number(arg("w", "760"));
const TRIM = process.argv.includes("--trim");

if (!img || !box || !out) {
  console.error("Dùng: --img=<png> --box=x1,y1,x2,y2 --out=hinh/<bộ>/<tên>.webp [--trim] [--w=760]");
  process.exit(1);
}

const [x1, y1, x2, y2] = box.split(",").map(Number);
if ([x1, y1, x2, y2].some((v) => !(v >= 0 && v <= 1)) || x2 <= x1 || y2 <= y1) {
  console.error("box phải là 4 số 0–1 và x2>x1, y2>y1");
  process.exit(1);
}

const outPath = join(process.cwd(), "web", "public", out);
mkdirSync(dirname(outPath), { recursive: true });

const meta = await sharp(img).metadata();
const left = Math.round(x1 * meta.width);
const top = Math.round(y1 * meta.height);
const width = Math.round((x2 - x1) * meta.width);
const height = Math.round((y2 - y1) * meta.height);

let p = sharp(img).extract({ left, top, width, height }).flatten({ background: "#ffffff" });
if (TRIM) p = p.trim({ threshold: 12 });
p = p.resize({ width: maxW, withoutEnlargement: true });

const info = await p.webp({ quality: 92, effort: 5 }).toFile(outPath);
console.log(
  `${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB` +
    `  (cắt từ ${meta.width}x${meta.height} tại ${left},${top} ${width}x${height})`,
);
console.log(`Chèn vào .md:  ![Hình](/${out})`);
