/**
 * gemini-solve.mjs — PIPELINE V4, bước 2: Gemini GIẢI đề đã được Claude chép.
 *
 * Đọc file đề trong `content-templates/de-*​/`, gọi Gemini, ghi lời giải ra
 * `content-templates/gemini-out/<giai_slug>.md` (kèm frontmatter lấy từ file đề).
 * Bước 3 (Claude duyệt) làm riêng — script này KHÔNG tự đăng bài.
 *
 * Chạy:
 *   node scripts/gemini-solve.mjs --dir=content-templates/de-toan9-ctst-t2 [--limit=5] [--model=...]
 *
 * ⚠ Free tier chỉ dùng được: gemini-3-flash-preview (mặc định), gemini-3.1-flash-lite.
 *   Các model khác trả 429 limit:0. Script tự đổi sang model dự phòng khi gặp 429.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const arg = (n, d = null) => {
  const f = process.argv.find((a) => a.startsWith(`--${n}=`));
  return f ? f.slice(n.length + 3) : d;
};

const DIR = arg("dir");
const LIMIT = Number(arg("limit", "999"));
const MODELS = [arg("model", "gemini-3-flash-preview"), "gemini-3.1-flash-lite"];
const OUT = join(process.cwd(), "content-templates", "gemini-out");

if (!DIR) {
  console.error("Thiếu --dir=content-templates/de-...");
  process.exit(1);
}

const KEY = readFileSync(join(process.cwd(), ".env.local"), "utf8")
  .split("\n").find((l) => l.startsWith("GEMINI_API_KEY="))
  ?.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
if (!KEY) { console.error("Không tìm thấy GEMINI_API_KEY trong .env.local"); process.exit(1); }

/** Quy tắc định dạng — đã kiểm chứng cho ra 0 lỗi KaTeX, 0 "$" lẻ. */
const FORMAT_RULES = `QUY TẮC ĐỊNH DẠNG (BẮT BUỘC — bài sẽ được render bằng KaTeX qua marked):
- Markdown thuần, tiếng Việt.
- Công thức ngắn đặt trong $...$ và PHẢI nằm gọn trên MỘT dòng.
- Công thức khối: đặt $$ trên DÒNG RIÊNG, có DÒNG TRỐNG trước và sau khối.
- TUYỆT ĐỐI KHÔNG đặt \\begin{cases}, \\begin{aligned}, \\begin{array} bên trong $...$ inline — bắt buộc dùng khối $$.
- Số thập phân kiểu Việt Nam: viết $5{,}25$ (KHÔNG viết 5.25).
- TUYỆT ĐỐI KHÔNG viết chữ tiếng Việt CÓ DẤU bên trong công thức (kể cả trong \\text{...} hay chỉ số dưới). KaTeX không có glyph cho ă â ê ô ơ ư đ và các dấu thanh → hiển thị vỡ. Viết $x = 2$ hoặc $x = -2$ (chữ "hoặc" nằm NGOÀI công thức); dùng $S_{d}$, $V_{1}$ thay vì $S_{đáy}$.
- Mỗi bài: in đậm số hiệu bài, chép lại đề ngắn gọn, rồi "**Lời giải:**" và trình bày từng bước.
- Bài nào phụ thuộc hình vẽ mà đề không mô tả đủ dữ kiện: ghi rõ "*Bài này cần hình trong SGK, không đủ dữ kiện để giải.*" và BỎ QUA — TUYỆT ĐỐI KHÔNG đoán số liệu.
- Nếu đề có dòng ảnh dạng ![...](/hinh/...): CHÉP LẠI NGUYÊN VĂN dòng đó vào lời giải, đặt ngay dưới đề bài tương ứng, trên một DÒNG RIÊNG. Không đổi đường dẫn, không bịa thêm ảnh mới.
- Không lời chào, không nói về bản thân, không thêm phần ngoài đề.`;

function parseFrontmatter(src) {
  const m = src.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, "");
  }
  return { fm, body: m[2] };
}

async function callGemini(prompt) {
  let lastErr = "";
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) },
      );
      if (res.ok) {
        const j = await res.json();
        const text = j.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
        if (text.trim()) return { text, model };
        lastErr = "phản hồi rỗng";
      } else {
        const t = await res.text();
        lastErr = `HTTP ${res.status}`;
        if (res.status === 429) {
          // hết quota phút → chờ rồi thử lại; vẫn lỗi thì đổi model
          if (attempt < 3) { await new Promise((r) => setTimeout(r, 20000)); continue; }
          break;
        }
        if (res.status >= 500 && attempt < 3) { await new Promise((r) => setTimeout(r, 5000)); continue; }
        break;
      }
    }
  }
  throw new Error(lastErr);
}

const files = readdirSync(DIR).filter((f) => f.endsWith(".md")).sort();
mkdirSync(OUT, { recursive: true });

let done = 0, skip = 0, fail = 0;
for (const name of files) {
  if (done >= LIMIT) break;
  const parsed = parseFrontmatter(readFileSync(join(DIR, name), "utf8"));
  if (!parsed) { console.log(`BỎ QUA (không có frontmatter): ${name}`); skip++; continue; }
  const slug = parsed.fm.giai_slug;
  if (!slug) { console.log(`BỎ QUA (thiếu giai_slug): ${name}`); skip++; continue; }

  const outPath = join(OUT, `${slug}.md`);
  if (existsSync(outPath)) { skip++; continue; }
  // Đã có bài trên web rồi thì không giải lại (trừ khi cố ý xoá file đó đi)
  if (existsSync(join(process.cwd(), "web", "content", "bai-giai", `${slug}.md`)) && !process.argv.includes("--redo")) {
    skip++; continue;
  }

  const prompt = `Bạn là giáo viên giỏi, đang soạn lời giải cho sách giáo khoa Việt Nam.

${FORMAT_RULES}

ĐỀ BÀI (chép nguyên văn từ SGK ${parsed.fm.sach ?? ""} lớp ${parsed.fm.lop ?? ""}, trang ${parsed.fm.trang ?? ""}):

${parsed.body.trim()}`;

  process.stdout.write(`${slug} ... `);
  try {
    const t0 = Date.now();
    const { text, model } = await callGemini(prompt);
    // Các trường SEO lấy nguyên từ file đề (Claude viết khi chép đề) — Gemini không đụng tới.
    const fm = [
      "---",
      `tieu_de: "${parsed.fm.tieu_de ?? slug}"`,
      `slug: "${slug}"`,
      `lop: "${parsed.fm.lop ?? ""}"`,
      `loai: "giai-sgk"`,
      `mon: "${parsed.fm.mon ?? "toan"}"`,
      `bo_sach: "${parsed.fm.bo_sach ?? ""}"`,
      ...(parsed.fm.tom_tat ? [`tom_tat: "${parsed.fm.tom_tat}"`] : []),
      ...(parsed.fm.meta_title ? [`meta_title: "${parsed.fm.meta_title}"`] : []),
      ...(parsed.fm.meta_description ? [`meta_description: "${parsed.fm.meta_description}"`] : []),
      `nguon: "gemini:${model}"`,
      "---",
      "",
    ].join("\n");
    if (!parsed.fm.tom_tat || !parsed.fm.meta_title) {
      console.log(`  ⚠ ${slug}: file đề thiếu tom_tat/meta_title — phải bổ sung trước khi đăng`);
    }
    writeFileSync(outPath, fm + text.trim() + "\n", "utf8");
    console.log(`OK (${((Date.now() - t0) / 1000).toFixed(1)}s, ${model})`);
    done++;
  } catch (e) {
    console.log(`LỖI: ${e.message}`);
    fail++;
  }
}

console.log(`\n=== Đã giải ${done} | bỏ qua ${skip} | lỗi ${fail} ===`);
console.log(`Kết quả ở: content-templates/gemini-out/`);
console.log(`BƯỚC TIẾP: Claude duyệt chất lượng trước khi đăng (kiểm chứng đáp án + verify hiển thị).`);
