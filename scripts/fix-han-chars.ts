/**
 * fix-han-chars.ts — Quét toàn bộ bài đã publish trên Strapi, tìm chữ Hán (CJK)
 * bị model chèn nhầm vào tiếng Việt, dịch theo BẢNG CỐ ĐỊNH, rồi cập nhật lại.
 *
 * AN TOÀN: chỉ sửa 1 bài khi TẤT CẢ cụm chữ Hán trong bài đều có trong HAN_MAP.
 * Nếu gặp chữ Hán chưa biết → BỎ QUA bài đó và in cảnh báo để người xử lý tay.
 * Không bao giờ đoán bừa.
 *
 * Chạy:
 *   STRAPI_URL=https://api.giaibaitap247.com STRAPI_API_TOKEN=xxx \
 *     npx tsx scripts/fix-han-chars.ts [--dry-run]
 *
 * --dry-run : chỉ báo cáo, không ghi lên Strapi.
 */

import fs from "node:fs";
import path from "node:path";

// --- load .env.local nếu chưa có env ---
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";
const DRY_RUN = process.argv.includes("--dry-run");

/**
 * Bảng dịch chữ Hán → tiếng Việt. CHỈ thêm cụm đã xác minh nghĩa theo ngữ cảnh.
 * Sắp theo độ dài giảm dần khi thay để cụm 2 ký tự được ưu tiên trước ký tự lẻ.
 */
export const HAN_MAP: Record<string, string> = {
  "推动": "thúc đẩy",
  "考虑": "cân nhắc",
  "夸張": "cường điệu",
  "夸张": "cường điệu",
  "围绕": "xoay quanh",
  "和谐": "hòa hợp",
  "坚强": "kiên cường",
  "客观": "khách quan",
  "巧妙": "khéo léo",
  "概括": "khái quát",
  "官职": "chức quan",
  "荒诞": "hoang đường",
  "诞": "đường", // trong cụm "hoang诞" khi 荒 bị thay bằng "hoang"
  "敬": "kính",
  "酷": "khốc",
  "严": "nghiêm",
  "严格": "nghiêm khắc",
  "严肃": "nghiêm túc",
  "深刻": "sâu sắc",
  "复杂": "phức tạp",
  "简单": "đơn giản",
  "矛盾": "mâu thuẫn",
  "冲突": "xung đột",
  "背景": "bối cảnh",
  "形象": "hình tượng",
  "主题": "chủ đề",
  "结构": "kết cấu",
  // --- bổ sung 08/07 sau khi đọc ngữ cảnh 9 bài lô vision tốt ---
  "另一": "một",          // "另一 bài thơ" → "một bài thơ (khác)"
  "儒家": "Nho gia",
  "明显": "rõ ràng là",   // "明显 outlier" → "rõ ràng là outlier"
  "挖掘": "đào sâu",
  "紧张": "căng thẳng",
  "惜别": "luyến tiếc chia li",
  "落后": "lạc hậu",
  "貌": "nghi",           // "lễ貌" → "lễ nghi"
  "仗": "đối",            // "đối仗" → "đối" (phép đối) — cẩn thận: chỉ đúng trong ngữ cảnh này
  // --- bổ sung 08/07 (Văn 12 CD T2) ---
  "道具": "đạo cụ",
  "要素": "tố",           // "thành要素" → "thành tố"
  "提醒": "nhắc nhở",
  "渔夫": "ngư phủ",
  "安慰": "an ủi",
  "慰": "ủi",             // "an慰" → "an ủi"
  "논리": "lô-gíc",       // Hàn — "논리 và lập luận" → "lô-gíc và lập luận"
  "封建": "phong kiến",
  "描绘": "khắc họa",
  "描繪": "khắc họa",
  "神秘": "huyền bí",
  "勇气": "lòng dũng cảm",
  "节奏": "nhịp điệu",
  "揭示": "bộc lộ",
  "情节": "cốt truyện",
  "对话": "đối thoại",
  "瞬间": "khoảnh khắc",
  "挽": "vãn",            // "không thể挽 hồi" → "vãn hồi"
  "卉": "cỏ",             // "hoa卉" (花卉) → "hoa cỏ"
  "地位": "địa vị",
  "不断": "không ngừng",
  "淳朴": "chất phác",
  "激励": "khích lệ",
  "叙事": "tự sự",
  "殖": "thực",           // "tính殖 dân" → "tính thực dân"
  "本身": "tự thân",
  "巨大": "khổng lồ",
  "幕": "màn",            // thuật ngữ kịch: hồi, màn, cảnh
  "明确": "rõ ràng",
  "偶": "ngẫu",           // "đối偶" → "đối ngẫu"
  "辱": "nhã",            // "nhục辱" → "nhục nhã"
};

// Regex bắt ký tự CJK: Hán (一-鿿), Hiragana/Katakana (ぁ-ヿ), Hangul (가-힣).
// Model đôi khi chèn cả chữ Hàn/Nhật, không chỉ Hán. KHÔNG khớp chữ tiếng Việt có dấu.
export const HAN_RE = /[一-鿿ぁ-ヿ가-힣]/;

function api<T>(pathPart: string, init: RequestInit = {}): Promise<T> {
  return fetch(`${STRAPI_URL}/api${pathPart}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      ...init.headers,
    },
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(`Strapi ${res.status} on ${pathPart}: ${await res.text()}`);
    }
    return res.json() as Promise<T>;
  });
}

type Bai = {
  documentId: string;
  slug: string;
  noi_dung: string | null;
};

/**
 * Thử dịch toàn bộ chữ Hán trong text. Trả về:
 *  - { text, unknown: [] } nếu dịch được hết
 *  - { text: original, unknown: [...] } nếu còn chữ Hán ngoài bảng (KHÔNG sửa)
 */
export function translate(text: string): { text: string; changed: boolean; unknown: string[] } {
  let out = text;
  // thay cụm dài trước (đã sort bên dưới)
  const keys = Object.keys(HAN_MAP).sort((a, b) => b.length - a.length);
  for (const han of keys) {
    if (out.includes(han)) out = out.split(han).join(HAN_MAP[han]);
  }
  // còn sót chữ Hán nào không?
  const unknown = [...new Set((out.match(new RegExp(HAN_RE.source, "g")) ?? []))];
  return { text: out, changed: out !== text, unknown };
}

async function main() {
  if (!STRAPI_TOKEN) {
    console.error("✗ Thiếu STRAPI_API_TOKEN");
    process.exit(1);
  }
  console.log(`🔍 Quét bài đã publish trên ${STRAPI_URL}${DRY_RUN ? " (DRY RUN)" : ""}`);

  let page = 1;
  const pageSize = 100;
  let totalScanned = 0;
  let fixed = 0;
  const skippedUnknown: { slug: string; unknown: string[] }[] = [];

  for (;;) {
    const res = await api<{
      data: Bai[];
      meta: { pagination: { pageCount: number } };
    }>(
      `/bai-giais?fields[0]=slug&fields[1]=noi_dung&pagination[page]=${page}&pagination[pageSize]=${pageSize}&status=published`,
    );

    for (const bai of res.data) {
      totalScanned++;
      const body = bai.noi_dung ?? "";
      if (!HAN_RE.test(body)) continue; // không có chữ Hán, bỏ qua

      const { text, changed, unknown } = translate(body);

      if (unknown.length > 0) {
        // còn chữ Hán ngoài bảng → KHÔNG tự sửa
        skippedUnknown.push({ slug: bai.slug, unknown });
        console.warn(`⚠  ${bai.slug}: còn chữ Hán chưa có trong bảng: ${unknown.join(" ")} — BỎ QUA`);
        continue;
      }

      if (!changed) continue;

      console.log(`✓ ${bai.slug}: sửa được toàn bộ chữ Hán`);
      if (!DRY_RUN) {
        await api(`/bai-giais/${bai.documentId}?status=published`, {
          method: "PUT",
          body: JSON.stringify({ data: { noi_dung: text } }),
        });
      }
      fixed++;
    }

    if (page >= res.meta.pagination.pageCount) break;
    page++;
  }

  console.log(`\n=== KẾT QUẢ ===`);
  console.log(`Đã quét: ${totalScanned} bài`);
  console.log(`${DRY_RUN ? "Sẽ sửa" : "Đã sửa"}: ${fixed} bài`);
  if (skippedUnknown.length > 0) {
    console.log(`\n⚠  ${skippedUnknown.length} bài có chữ Hán LẠ (cần bổ sung HAN_MAP hoặc sửa tay):`);
    for (const s of skippedUnknown) console.log(`   - ${s.slug}: ${s.unknown.join(" ")}`);
  }
}

// Chỉ chạy main() khi thực thi trực tiếp, không chạy khi bị import (vd bởi fix-han-local.ts)
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("fix-han-chars.ts")) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
