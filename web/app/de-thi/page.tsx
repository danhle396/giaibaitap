import Link from "next/link";
import type { Metadata } from "next";
import { buildDeThiUrl } from "@/lib/url";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MOCK_DE_THI } from "@/lib/mock-data";
import { FileText, Download } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Đề Thi các cấp — Tốt nghiệp, Vào lớp 10, Giữa kỳ, Cuối kỳ | Giải Bài Tập",
  description: "Kho đề thi có đáp án: Đề thi tốt nghiệp THPT, vào lớp 10, giữa kỳ, cuối kỳ tất cả môn. Tải PDF miễn phí.",
  canonical: "/de-thi",
});

const MOCK_DETHI_LIST = Array.from({ length: 8 }, (_, i) => ({
  ...MOCK_DE_THI,
  id: String(i + 1),
  slug: `de-thi-tot-nghiep-thpt-2025-mon-toan-de-${101 + i}`,
  tieu_de: `Đề thi Tốt nghiệp THPT 2025 môn Toán - Đề ${101 + i}`,
}));

const LOAI_LABELS = {
  "tot-nghiep": "Tốt nghiệp THPT",
  "vao-lop-10": "Vào lớp 10",
  "giua-ky": "Giữa kỳ",
  "cuoi-ky": "Cuối kỳ",
  "dgnl": "ĐGNL",
};

export default function DeThiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: "Đề Thi", href: "/de-thi" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Đề Thi Có Đáp Án
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Tổng hợp đề thi các cấp: tốt nghiệp THPT, vào lớp 10, giữa kỳ, cuối kỳ — kèm đáp án chi tiết.
      </p>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {Object.entries(LOAI_LABELS).map(([k, v]) => (
          <button
            key={k}
            className={`px-4 py-2 text-sm rounded-lg border ${
              k === "tot-nghiep"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {MOCK_DETHI_LIST.map((d) => (
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
                  Năm {d.nam} • Kèm đáp án chi tiết
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Xem đáp án</span>
              <Download className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
