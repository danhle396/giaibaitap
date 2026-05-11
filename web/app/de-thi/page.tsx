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

const LOAI_ENTRIES: Array<{ key: string; label: string }> = [
  { key: "", label: "Tất cả" },
  { key: "tot-nghiep-thpt", label: "Tốt nghiệp THPT" },
  { key: "vao-10", label: "Vào lớp 10" },
  { key: "giua-ki-1", label: "Giữa kì 1" },
  { key: "cuoi-ki-1", label: "Cuối kì 1" },
  { key: "giua-ki-2", label: "Giữa kì 2" },
  { key: "cuoi-ki-2", label: "Cuối kì 2" },
  { key: "hoc-sinh-gioi", label: "HSG" },
  { key: "minh-hoa", label: "Minh hoạ" },
  { key: "thu", label: "Thi thử" },
  { key: "dgnl", label: "ĐGNL" },
];

const LOAI_LABEL_MAP = Object.fromEntries(LOAI_ENTRIES.map((e) => [e.key, e.label]));

interface Props {
  searchParams: Promise<{ loai?: string }>;
}

export default async function DeThiPage({ searchParams }: Props) {
  const sp = await searchParams;
  const activeLoai = sp.loai && LOAI_LABEL_MAP[sp.loai] ? sp.loai : "";
  const list = await listDeThi({
    loaiDe: activeLoai || undefined,
    pageSize: 100,
  }).catch(() => ({ data: [] }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: "Đề Thi", href: "/de-thi" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Đề Thi Có Đáp Án
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Tổng hợp đề thi các cấp: tốt nghiệp THPT, vào lớp 10, giữa kỳ, cuối kỳ — kèm đáp án chi tiết.
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        {LOAI_ENTRIES.map((e) => (
          <Link
            key={e.key}
            href={e.key ? `/de-thi?loai=${e.key}` : "/de-thi"}
            className={
              "px-3 py-1.5 text-xs rounded-full border font-medium transition-colors " +
              (e.key === activeLoai
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400")
            }
          >
            {e.label}
          </Link>
        ))}
      </div>

      {list.data.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-sm text-yellow-800 dark:text-yellow-300">
          Chưa có đề thi nào trong danh mục này.
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
                    {LOAI_LABEL_MAP[d.loai_de] ?? d.loai_de} • Năm {d.nam} • Lớp {d.lop}
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
