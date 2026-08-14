/**
 * page-grid.mjs — Phủ lưới toạ độ tỉ lệ 0–1 lên ảnh trang PDF.
 *
 * Dùng để ĐỌC RA toạ độ hình cần cắt thay vì ước lượng bằng mắt (ước lượng chay
 * lệch rất nhiều). Đọc ảnh có lưới → ghi lại box → đưa cho crop-figure.mjs.
 *
 *   node scripts/page-grid.mjs --img=<page.png> [--out=<grid.png>] [--step=0.05]
 */
import { dirname, join, basename } from "node:path";

const sharp = (await import(
  "file:///e:/giaibaitap/web/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js"
)).default;

const arg = (n, d = null) => {
  const f = process.argv.find((a) => a.startsWith(`--${n}=`));
  return f ? f.slice(n.length + 3) : d;
};

const img = arg("img");
if (!img) { console.error("Dùng: --img=<page.png> [--out=] [--step=0.05]"); process.exit(1); }
const step = Number(arg("step", "0.05"));
const out = arg("out", join(dirname(img), "grid-" + basename(img)));

const meta = await sharp(img).metadata();
const { width: W, height: H } = meta;

let lines = "";
for (let t = step; t < 1; t += step) {
  const v = Math.round(t * 1000) / 1000;
  const x = Math.round(t * W);
  const y = Math.round(t * H);
  const major = Math.abs(v * 10 - Math.round(v * 10)) < 1e-9; // vạch 0.1 đậm hơn
  const col = major ? "#ff0000" : "#ff000055";
  const sw = major ? 2 : 1;
  lines += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${col}" stroke-width="${sw}"/>`;
  lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${col}" stroke-width="${sw}"/>`;
  if (major) {
    lines += `<text x="${x + 3}" y="26" font-size="22" fill="#d00" font-family="monospace">${v}</text>`;
    lines += `<text x="3" y="${y - 4}" font-size="22" fill="#d00" font-family="monospace">${v}</text>`;
  }
}

const svg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${lines}</svg>`);
await sharp(img).composite([{ input: svg, top: 0, left: 0 }]).png().toFile(out);
console.log(`${out}  (${W}x${H}, lưới ${step})`);
