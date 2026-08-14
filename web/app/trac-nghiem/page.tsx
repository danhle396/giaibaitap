import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { buildTracNghiemUrl, SUBJECT_LABELS, GRADES } from "@/lib/url";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { listTracNghiem } from "@/lib/strapi";
import type { Grade } from "@/types";
import { Star } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Trắc Nghiệm Online — Tất Cả Môn, Có Đáp Án | Giải Bài Tập",
  description:
    "Luyện trắc nghiệm online tất cả môn học lớp 6-12. Có giải thích đáp án, theo dõi điểm số, ôn thi hiệu quả.",
  canonical: "/trac-nghiem",
  // Mục trắc nghiệm hiện chưa có nội dung → noIndex. Bỏ đi khi có câu hỏi đầu tiên.
  noIndex: true,
});

const DO_KHO_LABELS: Record<string, string> = {
  "nhan-biet": "Nhận biết",
  "thong-hieu": "Thông hiểu",
  "van-dung": "Vận dụng",
  "van-dung-cao": "Vận dụng cao",
};

interface Props {
  searchParams: Promise<{ lop?: string }>;
}

export default async function TracNghiemPage({ searchParams }: Props) {
  const sp = await searchParams;
  const lopParsed = sp.lop ? parseInt(sp.lop, 10) : NaN;
  const activeLop: Grade | undefined =
    !isNaN(lopParsed) && lopParsed >= 1 && lopParsed <= 12 ? (lopParsed as Grade) : undefined;

  const list = await listTracNghiem({ lop: activeLop, pageSize: 100 }).catch(() => ({
    data: [],
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: "Trắc Nghiệm", href: "/trac-nghiem" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Trắc Nghiệm Online
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Luyện trắc nghiệm theo chương, có giải thích đáp án chi tiết.
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        <Link
          href="/trac-nghiem"
          className={
            "px-3 py-1.5 text-xs rounded-full border font-medium transition-colors " +
            (activeLop === undefined
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400")
          }
        >
          Tất cả lớp
        </Link>
        {GRADES.map((g) => (
          <Link
            key={g}
            href={`/trac-nghiem?lop=${g}`}
            className={
              "px-3 py-1.5 text-xs rounded-full border font-medium transition-colors " +
              (g === activeLop
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400")
            }
          >
            Lớp {g}
          </Link>
        ))}
      </div>

      {list.data.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-sm text-yellow-800 dark:text-yellow-300">
          Chưa có bộ trắc nghiệm nào{activeLop ? ` cho lớp ${activeLop}` : ""}.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.data.map((q) => (
            <Link
              key={q.id}
              href={buildTracNghiemUrl(q.slug)}
              className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full">
                  {q.mon_hoc ? SUBJECT_LABELS[q.mon_hoc.ma] : ""} Lớp {q.lop}
                </span>
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                {q.tieu_de}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {q.so_cau} câu • {Math.round(q.thoi_gian / 60)} phút •{" "}
                {DO_KHO_LABELS[q.do_kho] ?? q.do_kho}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
