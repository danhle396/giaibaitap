import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Star } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Trắc Nghiệm Online — Tất Cả Môn, Có Đáp Án | Giải Bài Tập",
  description: "Luyện trắc nghiệm online tất cả môn học lớp 6-12. Có giải thích đáp án, theo dõi điểm số, ôn thi hiệu quả.",
  canonical: "/trac-nghiem",
});

const MOCK_QUIZ_LIST = [
  { slug: "toan-12-chuong-1-don-dieu", title: "Toán 12 — Tính đơn điệu hàm số", mon: "Toán", lop: 12, soLuong: 20 },
  { slug: "van-9-truyen-kieu", title: "Văn 9 — Truyện Kiều", mon: "Văn", lop: 9, soLuong: 15 },
  { slug: "ly-12-dien-tu-xoay-chieu", title: "Vật Lý 12 — Điện xoay chiều", mon: "Lý", lop: 12, soLuong: 25 },
  { slug: "hoa-12-polime", title: "Hóa 12 — Polime và vật liệu polymer", mon: "Hóa", lop: 12, soLuong: 20 },
];

export default function TracNghiemPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: "Trắc Nghiệm", href: "/trac-nghiem" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Trắc Nghiệm Online
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Luyện trắc nghiệm theo chương, có giải thích đáp án chi tiết.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_QUIZ_LIST.map((q) => (
          <Link
            key={q.slug}
            href={`/trac-nghiem/${q.slug}`}
            className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full">
                {q.mon} Lớp {q.lop}
              </span>
              <Star className="h-4 w-4 text-yellow-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{q.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{q.soLuong} câu hỏi • Có đáp án</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
