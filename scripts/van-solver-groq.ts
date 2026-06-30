/**
 * van-solver-groq.ts
 *
 * Dùng Groq (free) để sinh nội dung Ngữ Văn lớp 6-12:
 *   - Soạn bài (phân tích tác phẩm, trả lời câu hỏi SGK)
 *   - Văn mẫu (bài nghị luận văn học / NLXH)
 *   - Tóm tắt tác phẩm
 *
 * Dùng:
 *   npx tsx scripts/van-solver-groq.ts \
 *     [--lop=12] [--bo_sach=ket-noi-tri-thuc] [--loai=soan-van] \
 *     [--out=content-templates/inbox] [--limit=5]
 *
 *   --loai: soan-van | van-mau | tom-tat | all (mặc định: all)
 *   --limit: số tác phẩm tối đa mỗi lần chạy (tránh hết token)
 *
 * Idempotent: bỏ qua slug đã có file .md.
 */

import Groq from "groq-sdk";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { VAN_ITEMS, type VanItem } from "./van-content-list.js";

// ─── CLI args ────────────────────────────────────────────────────────────────

function arg(name: string): string | null {
  const flag = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(flag));
  return found ? found.slice(flag.length) : null;
}

const filterLop = arg("lop") ? parseInt(arg("lop")!, 10) : null;
const filterBoSach = arg("bo_sach");
const filterLoai = arg("loai") ?? "all"; // soan-van | van-mau | tom-tat | all
const outDir = arg("out") ?? "content-templates/inbox";
const limit = arg("limit") ? parseInt(arg("limit")!, 10) : 999;

const LOAI_LIST = filterLoai === "all"
  ? ["soan-van", "van-mau", "tom-tat"] as const
  : [filterLoai] as const;

// ─── Constants ───────────────────────────────────────────────────────────────

const BOOK_NAMES: Record<string, string> = {
  "ket-noi-tri-thuc": "Kết nối tri thức",
  "chan-troi-sang-tao": "Chân trời sáng tạo",
  "canh-dieu": "Cánh diều",
};

const BOOK_CODE: Record<string, string> = {
  "ket-noi-tri-thuc": "kntt",
  "chan-troi-sang-tao": "ctst",
  "canh-dieu": "cd",
};

const GROQ_MODEL = "llama-3.3-70b-versatile";

// ─── Slug & file builders ────────────────────────────────────────────────────

function buildSlug(item: VanItem, loai: string): string {
  const prefix = loai === "soan-van" ? "soan-bai"
    : loai === "van-mau" ? "van-mau"
    : "tom-tat";
  return `${prefix}-${item.slug_suffix}`;
}

function buildMdFile(item: VanItem, loai: string, body: string): { slug: string; md: string } {
  const bookName = BOOK_NAMES[item.bo_sach] ?? item.bo_sach;
  const slug = buildSlug(item, loai);
  const lopStr = `lớp ${item.lop}`;

  const tieu_de = loai === "soan-van"
    ? `Soạn bài ${item.ten_tac_pham}${item.tac_gia ? ` - ${item.tac_gia}` : ""} Ngữ Văn ${item.lop} ${bookName}`
    : loai === "van-mau"
    ? `Văn mẫu ${item.ten_tac_pham}${item.tac_gia ? ` - ${item.tac_gia}` : ""} Ngữ Văn ${item.lop}`
    : `Tóm tắt ${item.ten_tac_pham}${item.tac_gia ? ` - ${item.tac_gia}` : ""} Ngữ Văn ${item.lop}`;

  const metaTitle = tieu_de.length > 60 ? tieu_de.slice(0, 57) + "..." : tieu_de;

  const metaDesc = loai === "soan-van"
    ? `Soạn bài ${item.ten_tac_pham} Ngữ Văn ${item.lop} ${bookName}. Trả lời câu hỏi SGK, phân tích nội dung, nghệ thuật đầy đủ nhất.`.slice(0, 155)
    : loai === "van-mau"
    ? `Văn mẫu ${item.ten_tac_pham} Ngữ Văn ${item.lop}. Tuyển chọn các bài văn hay, phân tích sâu sắc cho học sinh.`.slice(0, 155)
    : `Tóm tắt ${item.ten_tac_pham} Ngữ Văn ${item.lop}. Tóm tắt ngắn gọn, đầy đủ nội dung chính của tác phẩm.`.slice(0, 155);

  const tom_tat = loai === "soan-van"
    ? `Soạn bài ${item.ten_tac_pham} Ngữ Văn ${item.lop} ${bookName}. Hướng dẫn soạn bài chi tiết, trả lời đầy đủ các câu hỏi trong sách giáo khoa.`
    : loai === "van-mau"
    ? `Văn mẫu phân tích ${item.ten_tac_pham} Ngữ Văn ${item.lop}. Các bài văn mẫu hay, dàn ý chi tiết cho học sinh tham khảo.`
    : `Tóm tắt ${item.ten_tac_pham} Ngữ Văn ${item.lop}. Tóm tắt ngắn gọn và đầy đủ nội dung tác phẩm theo chương trình học.`;

  const md = `---
tieu_de: "${tieu_de.replace(/"/g, "'")}"
slug: ${slug}
lop: ${item.lop}
loai: soan-van
mon: van
bo_sach: ${item.bo_sach}
tom_tat: "${tom_tat.replace(/"/g, "'")}"
meta_title: "${metaTitle.replace(/"/g, "'")}"
meta_description: "${metaDesc.replace(/"/g, "'")}"
---

${body.trim()}
`;
  return { slug, md };
}

// ─── Prompts ──────────────────────────────────────────────────────────────────

const ANTI_HALLUCINATION = `QUY TẮC BẮT BUỘC VỀ ĐỘ CHÍNH XÁC:
- TUYỆT ĐỐI KHÔNG bịa câu trích dẫn, câu nói, câu thơ. Chỉ trích dẫn khi bạn CHẮC CHẮN 100% câu đó có trong chính tác phẩm này.
- KHÔNG gán nhầm câu nói/danh ngôn của tác giả ở tác phẩm khác vào tác phẩm này.
- KHÔNG bịa tên biện pháp tu từ, hình ảnh, ẩn dụ nếu không chắc chắn nó xuất hiện trong văn bản.
- Nếu không nhớ chính xác một dẫn chứng cụ thể, hãy diễn đạt bằng lời (paraphrase) thay vì đặt trong dấu ngoặc kép như trích dẫn nguyên văn.
- Thà phân tích khái quát đúng còn hơn dẫn chứng cụ thể nhưng sai.

`;

function buildPrompt(item: VanItem, loai: string): string {
  const bookName = BOOK_NAMES[item.bo_sach] ?? item.bo_sach;
  const tacGiaStr = item.tac_gia ? ` của ${item.tac_gia}` : "";

  if (loai === "soan-van") {
    return `${ANTI_HALLUCINATION}Bạn là giáo viên Ngữ Văn THCS/THPT xuất sắc. Hãy soạn bài "${item.ten_tac_pham}"${tacGiaStr} trong chương trình Ngữ Văn lớp ${item.lop} bộ sách ${bookName} (chương trình 2018).

Viết đầy đủ theo cấu trúc sau (Markdown, LaTeX không cần):

## Tác giả - Tác phẩm
### Tác giả [tên tác giả]
[Tiểu sử, phong cách sáng tác, vị trí trong văn học VN]

### Tác phẩm "${item.ten_tac_pham}"
[Hoàn cảnh sáng tác, xuất xứ, thể loại, tóm tắt ngắn]

## Bố cục
[Chia bố cục, nêu nội dung từng phần]

---

## Soạn bài chi tiết (Hay nhất)

[Trả lời lần lượt TẤT CẢ câu hỏi đọc hiểu và luyện tập thường có trong SGK bộ ${bookName} cho bài này. Đánh số Câu 1, Câu 2... Mỗi câu trả lời đầy đủ, sâu sắc, có dẫn chứng từ tác phẩm.]

---

## Phân tích chi tiết

### Nội dung
[Phân tích nội dung chính, chủ đề, tư tưởng]

### Nghệ thuật
[Phân tích các đặc sắc nghệ thuật: ngôn ngữ, hình ảnh, biện pháp tu từ...]

### Ý nghĩa - Giá trị
[Giá trị nội dung và nghệ thuật, ý nghĩa với người đọc]

---

## Những câu hỏi thường gặp

**Hỏi:** [câu hỏi phổ biến 1]
**Đáp:** [trả lời]

**Hỏi:** [câu hỏi phổ biến 2]
**Đáp:** [trả lời]

[Thêm 2-3 câu hỏi hay]

Yêu cầu: Viết chuẩn xác, sâu sắc nhưng dễ hiểu với học sinh lớp ${item.lop}. Không được bịa đặt nội dung tác phẩm.`;
  }

  if (loai === "van-mau") {
    return `${ANTI_HALLUCINATION}Bạn là giáo viên Ngữ Văn xuất sắc. Hãy viết các bài văn mẫu về "${item.ten_tac_pham}"${tacGiaStr} trong chương trình Ngữ Văn lớp ${item.lop} (chương trình 2018).

Viết theo cấu trúc sau (Markdown):

## Dàn ý chi tiết

### Mở bài
[Gợi ý mở bài]

### Thân bài
[Dàn ý thân bài chi tiết theo các luận điểm chính]

### Kết bài
[Gợi ý kết bài]

---

## Bài văn mẫu số 1 (Đạt điểm cao)

[Bài văn hoàn chỉnh, khoảng 600-800 chữ, văn phong học sinh THPT, có cảm xúc, dẫn chứng cụ thể từ tác phẩm]

---

## Bài văn mẫu số 2 (Ngắn gọn)

[Bài văn ngắn hơn, khoảng 400-500 chữ, súc tích]

---

## Một số đoạn văn hay

### Đoạn mở bài sáng tạo
[2-3 cách mở bài khác nhau]

### Đoạn phân tích nhân vật / hình ảnh tiêu biểu
[Đoạn văn phân tích sâu 1 nhân vật hoặc hình ảnh đặc sắc nhất]

Yêu cầu: Văn phong tự nhiên, có cảm xúc, phù hợp học sinh lớp ${item.lop}. Dẫn chứng phải chính xác từ tác phẩm.`;
  }

  // tom-tat
  return `${ANTI_HALLUCINATION}Hãy viết tóm tắt tác phẩm "${item.ten_tac_pham}"${tacGiaStr} trong chương trình Ngữ Văn lớp ${item.lop} (chương trình 2018).

Viết theo cấu trúc sau (Markdown):

## Tóm tắt ngắn gọn (100 chữ)
[Tóm tắt cực ngắn, nắm bắt nhanh nội dung]

---

## Tóm tắt đầy đủ

[Tóm tắt chi tiết theo trình tự cốt truyện / nội dung bài thơ, khoảng 300-400 chữ. Nêu đầy đủ nhân vật, sự kiện chính, kết cục.]

---

## Tóm tắt theo nhân vật / hình ảnh

[Tóm tắt theo từng nhân vật hoặc hình ảnh chính]

---

## Sơ đồ tư duy (dạng text)

\`\`\`
${item.ten_tac_pham}
├── Nhân vật / Hình ảnh chính
│   ├── [nhân vật 1]: [đặc điểm]
│   └── [nhân vật 2]: [đặc điểm]
├── Cốt truyện / Nội dung
│   ├── [phần 1]
│   ├── [phần 2]
│   └── [phần 3]
└── Chủ đề - Ý nghĩa
    └── [chủ đề chính]
\`\`\`

Yêu cầu: Chính xác, không bịa đặt, phù hợp học sinh lớp ${item.lop}.`;
}

// ─── Groq API (multi-key rotation) ────────────────────────────────────────────

let groqClients: Groq[] = [];
let activeKeyIdx = 0;
const exhaustedKeys = new Set<number>();

function currentGroq(): Groq {
  return groqClients[activeKeyIdx];
}

function rotateKey(reason: string): boolean {
  exhaustedKeys.add(activeKeyIdx);
  const remaining = groqClients.length - exhaustedKeys.size;
  if (remaining === 0) return false;
  do {
    activeKeyIdx = (activeKeyIdx + 1) % groqClients.length;
  } while (exhaustedKeys.has(activeKeyIdx));
  console.log(`\n   🔄 Đổi sang GROQ_API_KEY #${activeKeyIdx + 1}/${groqClients.length} (${reason})`);
  return true;
}

async function generateWithGroq(prompt: string): Promise<string> {
  while (true) {
    try {
      const res = await currentGroq().chat.completions.create({
        model: GROQ_MODEL,
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      });
      return (res.choices[0]?.message?.content ?? "").trim();
    } catch (err: any) {
      const msg = err?.message ?? "";
      const isQuotaDay = msg.includes("tokens per day") || msg.includes("TPD");
      if (isQuotaDay && rotateKey("hết quota ngày")) continue;
      throw err;
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Load .env.local
  try {
    const envContent = await readFile(".env.local", "utf8");
    for (const line of envContent.split("\n")) {
      const m = /^([A-Z_][A-Z0-9_]*)=(.+)$/.exec(line.trim());
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* không có file thì thôi */ }

  // Hỗ trợ nhiều key: GROQ_API_KEY, GROQ_API_KEY_2, GROQ_API_KEY_3, ...
  const keys: string[] = [];
  if (process.env.GROQ_API_KEY) keys.push(process.env.GROQ_API_KEY);
  for (let i = 2; i <= 10; i++) {
    const k = process.env[`GROQ_API_KEY_${i}`];
    if (k) keys.push(k);
  }
  if (keys.length === 0) {
    console.error("❌ Không có GROQ_API_KEY nào trong .env.local");
    process.exit(1);
  }
  groqClients = keys.map((k) => new Groq({ apiKey: k }));
  console.log(`🔑 ${keys.length} GROQ key(s) sẵn sàng (xoay vòng khi hết quota)`);

  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

  // Filter items
  let items = VAN_ITEMS
    .filter((i) => filterLop === null || i.lop === filterLop)
    .filter((i) => !filterBoSach || i.bo_sach === filterBoSach);

  // Sort: lớp 12 trước, rồi giảm dần
  items.sort((a, b) => b.lop - a.lop || a.bo_sach.localeCompare(b.bo_sach));

  console.log(`\n📚 Ngữ Văn solver — Groq ${GROQ_MODEL}`);
  console.log(`   ${items.length} tác phẩm × ${LOAI_LIST.length} loại = ${items.length * LOAI_LIST.length} file tối đa`);
  if (limit < 999) console.log(`   Giới hạn: ${limit} tác phẩm lần này\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;
  let processed = 0;

  outer: for (const item of items) {
    for (const loai of LOAI_LIST) {
      if (processed >= limit) {
        console.log(`\n⏸  Đã đạt giới hạn ${limit} tác phẩm, dừng.`);
        break outer;
      }

      const slug = buildSlug(item, loai);
      const outPath = join(outDir, `${slug}.md`);

      if (existsSync(outPath)) {
        process.stdout.write(`⏭  ${slug}: đã có\n`);
        skipped++;
        continue;
      }

      const bookCode = BOOK_CODE[item.bo_sach] ?? item.bo_sach;
      process.stdout.write(`⚙  [Lớp ${item.lop}/${bookCode}] ${loai}: ${item.ten_tac_pham}... `);

      try {
        const prompt = buildPrompt(item, loai);
        const body = await generateWithGroq(prompt);
        const { md } = buildMdFile(item, loai, body);
        await writeFile(outPath, md, "utf8");
        process.stdout.write(`✓ (~${(md.length / 1000).toFixed(1)}k)\n`);
        created++;
        processed++;

        // Tránh rate limit: delay 1s giữa các request
        await new Promise((r) => setTimeout(r, 1000));
      } catch (err: any) {
        process.stdout.write(`✗ ${err?.message ?? err}\n`);
        errors++;
        processed++;
      }
    }
  }

  console.log(`\n✅ Xong!`);
  console.log(`   ${created} file tạo mới | ${skipped} bỏ qua | ${errors} lỗi`);

  if (created > 0) {
    console.log(`\n📥 Import vào Strapi:\n   npx tsx scripts/bulk-import.ts ${outDir}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
