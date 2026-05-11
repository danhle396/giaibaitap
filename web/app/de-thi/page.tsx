import Link from "next/link";
import type { Metadata } from "next";
import { buildDeThiUrl } from "@/lib/url";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { listDeThi } from "@/lib/strapi";
import { FileText } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Đề Thi các cấp — Tốt nghiệp, Vào lớp 10, Giữa kỳ, Cuối kỳ | Giải Bài Tập",
  description:
    "Kho đề thi có đáp án: Đề thi tốt nghiệp THPT, vào lớp 10, giữa kỳ, cuối kỳ tất cả môn. Tải PDF miễn phí.",
  canonical: "/de-thi",
});

const LOAI_LABELS: Record<string, string> = {
  "tot-nghiep-thpt": "Tốt nghiệp THPT",
  "vao-10": "Vào lớp 10",
  "giua-ki-1": "Giữa kì 1",
  "cuoi-ki-1": "Cuối kì 1",
  "giua-ki-2": "Giữa kì 2",
  "cuoi-ki-2": "Cuối kì 2",
  "hoc-sinh-gioi": "HSG",
  "minh-hoa": "Minh hoạ",
  thu: "Thi thử",
  dgnl: "ĐGNL",
};

export default async function DeThiPage() {
  const list = await listDeThi({ pageSize: 100 }).catch(() => ({ data: [] }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: "Đề Thi", href: "/de-thi" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Đề Thi Có Đáp Án
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Tổng hợp đề thi các cấp: tốt nghiệp THPT, vào lớp 10, giữa kỳ, cuối kỳ — kèm đáp án chi tiết.
      </p>

      {list.data.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-sm text-yellow-800 dark:text-yellow-300">
          Chưa có đề thi nào. Quay lại sau nhé.
        </div>
      ) : (
        <div className="space-y-3">
          {list.data.map((d) => (
            <Link
              key={d.id}
              href={buildDeThiUrl(d.slug)}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{d.tieu_de}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {LOAI_LABELS[d.loai_de] ?? d.loai_de} • Năm {d.nam} • Lớp {d.lop}
                    {d.tinh_thanh ? ` • ${d.tinh_thanh}` : ""}
                  </p>
                </div>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium shrink-0">
                Xem đáp án →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
