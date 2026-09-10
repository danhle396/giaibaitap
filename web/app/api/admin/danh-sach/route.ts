import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Danh sách rút gọn của mọi bài, phục vụ bảng trong trang /admin.
 * Chỉ trả frontmatter — tải nội dung 893 file để dựng bảng thì quá chậm;
 * nội dung đầy đủ chỉ nạp khi mở một bài để sửa.
 */
export const dynamic = "force-dynamic";

const DIR = join(process.cwd(), "content", "bai-giai");

function truong(fm: string, ten: string): string {
  const m = fm.match(new RegExp("^" + ten + ":\\s*(.*)$", "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
}

export async function GET() {
  const bai = readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const fm = (readFileSync(join(DIR, f), "utf8").replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/) || [])[1] ?? "";
      return {
        file: f,
        slug: truong(fm, "slug") || f.replace(/\.md$/, ""),
        tieu_de: truong(fm, "tieu_de"),
        lop: truong(fm, "lop"),
        mon: truong(fm, "mon"),
        loai: truong(fm, "loai"),
        bo_sach: truong(fm, "bo_sach"),
        nguon: truong(fm, "nguon"),
      };
    })
    .sort((a, b) => a.tieu_de.localeCompare(b.tieu_de, "vi"));

  return Response.json(bai, { headers: { "Cache-Control": "no-store" } });
}
