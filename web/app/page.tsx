import Link from "next/link";
import { BookOpen, FileText, PenTool, Star, ArrowRight, Clock } from "lucide-react";
import { buildBaiGiaiUrl, buildLopUrl, buildMonUrl, GRADES, SUBJECT_LABELS } from "@/lib/url";
import { listRecentBaiGiai } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";
import type { Grade, Subject } from "@/types";

export const revalidate = 600;

const HOT_LINKS = [
  { label: "Giải SGK Toán 12", href: "/lop-12/toan", badge: "HOT" },
  { label: "Soạn văn 12", href: "/lop-12/van", badge: "HOT" },
  { label: "Giải Toán 9", href: "/lop-9/toan", badge: "HOT" },
  { label: "Soạn bài Truyện Kiều", href: "/soan-van/tuyen-kieu", badge: "" },
  { label: "Đề thi tốt nghiệp THPT 2025", href: "/de-thi", badge: "MỚI" },
  { label: "Giải Toán 11 Kết nối", href: "/lop-11/toan", badge: "" },
];

const CONTENT_TYPES = [
  { icon: BookOpen, label: "Giải SGK/SBT", desc: "Lời giải chi tiết từng bài trong sách giáo khoa", href: "/lop-12/toan", color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
  { icon: PenTool, label: "Soạn Văn", desc: "3 phiên bản: Hay nhất, Ngắn nhất, Siêu ngắn", href: "/soan-van/tuyen-kieu", color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
  { icon: FileText, label: "Đề Thi", desc: "Đề thi kèm đáp án, từ giữa kỳ đến tốt nghiệp", href: "/de-thi", color: "text-orange-600 bg-orange-50 dark:bg-orange-950" },
  { icon: Star, label: "Trắc Nghiệm", desc: "Luyện tập trắc nghiệm có giải thích đáp án", href: "/trac-nghiem", color: "text-green-600 bg-green-50 dark:bg-green-950" },
];

const POPULAR_GRADES: Array<{ grade: Grade; subs: Subject[] }> = [
  { grade: 12, subs: ["toan", "van", "anh", "ly", "hoa"] },
  { grade: 11, subs: ["toan", "van", "anh", "ly", "hoa"] },
  { grade: 9, subs: ["toan", "van", "anh"] },
];

export default async function HomePage() {
  const recent = await listRecentBaiGiai(8).catch(() => []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Giải Bài Tập SGK — Miễn Phí, Dễ Hiểu
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Lời giải chi tiết tất cả môn học từ lớp 1–12. Soạn văn, đề thi, trắc nghiệm — tất cả trong một nơi.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {HOT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium backdrop-blur-sm transition-colors"
              >
                {l.label}
                {l.badge && (
                  <span className="text-xs bg-orange-400 text-white px-1.5 py-0.5 rounded-full">{l.badge}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">
        {/* Content types */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Loại nội dung</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_TYPES.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className={`inline-flex p-3 rounded-lg ${t.color} mb-3`}>
                  <t.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bài mới */}
        {recent.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Bài mới cập nhật
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recent.map((b) => {
                if (!b.mon_hoc || !b.bo_sach) return null;
                const href = buildBaiGiaiUrl({
                  lop: b.lop,
                  mon: b.mon_hoc.ma,
                  loai: b.loai,
                  bo_sach: b.bo_sach.ma,
                  slug: b.slug,
                });
                return (
                  <Link
                    key={b.id}
                    href={href}
                    className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1.5">
                      {SUBJECT_LABELS[b.mon_hoc.ma]} • Lớp {b.lop}
                    </p>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">
                      {b.tieu_de}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(b.publishedAt)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Chọn lớp */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Chọn theo lớp</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {GRADES.map((g) => (
              <Link
                key={g}
                href={buildLopUrl(g)}
                className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all text-center"
              >
                <span className="text-xl font-bold text-blue-600">{g}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Lớp</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Môn phổ biến theo lớp */}
        {POPULAR_GRADES.map(({ grade, subs }) => (
          <section key={grade}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lớp {grade}</h2>
              <Link href={buildLopUrl(grade)} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {subs.map((sub) => (
                <Link
                  key={sub}
                  href={buildMonUrl(grade, sub)}
                  className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{SUBJECT_LABELS[sub]}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lớp {grade}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Stats */}
        <section className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { num: "50.000+", label: "Bài giải" },
              { num: "1M+", label: "Học sinh/tháng" },
              { num: "12", label: "Cấp lớp" },
              { num: "10", label: "Môn học" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-blue-600">{s.num}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
