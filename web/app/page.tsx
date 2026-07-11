import Link from "next/link";
import { BookOpen, FileText, PenTool, Star, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { buildBaiGiaiUrl, buildLopUrl, buildMonUrl, GRADES, SUBJECT_LABELS } from "@/lib/url";
import { listRecentBaiGiai } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";
import { SearchBox } from "@/components/search/SearchBox";
import type { Grade, Subject } from "@/types";

export const revalidate = 600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap247.com";

// Chỉ trỏ tới nội dung ĐÃ CÓ trên site — link trống có hại cho SEO
const HOT_LINKS = [
  { label: "Soạn văn 12", href: "/lop-12/van", badge: "ĐỦ 3 BỘ SÁCH" },
  { label: "Soạn văn 9", href: "/lop-9/van", badge: "THI VÀO 10" },
  { label: "Giải Toán 10", href: "/lop-10/toan", badge: "" },
  { label: "Đề thi & đáp án", href: "/de-thi", badge: "" },
];

const CONTENT_TYPES = [
  { icon: BookOpen, label: "Giải SGK", desc: "Lời giải chi tiết từng trang sách giáo khoa", href: "/lop-10/toan", color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
  { icon: PenTool, label: "Soạn Văn", desc: "Soạn bài bám sát SGK, đủ 3 bộ sách", href: "/lop-12/van", color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
  { icon: FileText, label: "Đề Thi", desc: "Đề thi kèm đáp án, từ giữa kỳ đến tốt nghiệp", href: "/de-thi", color: "text-orange-600 bg-orange-50 dark:bg-orange-950" },
  { icon: Star, label: "Trắc Nghiệm", desc: "Luyện tập trắc nghiệm có giải thích đáp án", href: "/trac-nghiem", color: "text-green-600 bg-green-50 dark:bg-green-950" },
];

// Lớp có nội dung thật xếp trước
const POPULAR_GRADES: Array<{ grade: Grade; subs: Subject[] }> = [
  { grade: 12, subs: ["van", "toan", "anh", "ly", "hoa"] },
  { grade: 9, subs: ["van", "toan", "anh"] },
  { grade: 10, subs: ["toan", "van", "anh"] },
];

// Số liệu THẬT — cập nhật khi nội dung tăng
const STATS = [
  { num: "600+", label: "Bài giải chi tiết" },
  { num: "3", label: "Bộ sách chuẩn" },
  { num: "1–12", label: "Khối lớp" },
  { num: "100%", label: "Miễn phí" },
];

const FAQS = [
  {
    q: "Giải Bài Tập 247 là gì?",
    a: "Giải Bài Tập 247 (giaibaitap247.com) là website học tập miễn phí cho học sinh Việt Nam, cung cấp lời giải bài tập sách giáo khoa, bài soạn văn, đề thi và trắc nghiệm từ lớp 1 đến lớp 12.",
  },
  {
    q: "Nội dung có miễn phí không?",
    a: "Có. Toàn bộ lời giải, bài soạn và đề thi trên Giải Bài Tập 247 đều miễn phí 100%, không yêu cầu đăng ký tài khoản hay trả phí.",
  },
  {
    q: "Website hỗ trợ những bộ sách nào?",
    a: "Giải Bài Tập 247 biên soạn theo cả 3 bộ sách giáo khoa hiện hành của Việt Nam: Kết nối tri thức với cuộc sống, Chân trời sáng tạo và Cánh Diều.",
  },
  {
    q: "Lời giải có bám sát sách giáo khoa không?",
    a: "Có. Mỗi bài giải được biên soạn theo từng trang sách giáo khoa cụ thể, trả lời đúng câu hỏi trong sách, kèm hướng dẫn từng bước dễ hiểu.",
  },
  {
    q: "Làm sao tìm bài giải nhanh nhất?",
    a: "Dùng ô tìm kiếm ở đầu trang và gõ tên bài hoặc số trang, ví dụ: \"soạn văn 12 trang 71\" hoặc \"toán 10 trang 55\". Bạn cũng có thể duyệt theo lớp và môn học.",
  },
];

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage() {
  const recent = await listRecentBaiGiai(8).catch(() => []);

  return (
    <div>
      <FaqSchema />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        {/* Họa tiết trang trí */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-indigo-400/20 blur-2xl" />

        <div className="relative max-w-4xl mx-auto text-center px-4 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Giải bài tập SGK lớp 1–12
            <span className="block text-blue-200 mt-2 text-2xl sm:text-3xl font-bold">
              Bám sát từng trang sách · Miễn phí
            </span>
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Lời giải chi tiết đủ 3 bộ sách Kết nối tri thức, Chân trời sáng tạo, Cánh Diều.
            Soạn văn, đề thi, trắc nghiệm — tất cả trong một nơi.
          </p>

          {/* Ô tìm kiếm nổi bật */}
          <div className="mb-8 [&_input]:py-3 [&_input]:text-base [&_button[type=submit]]:py-3 [&_button[type=submit]]:px-6">
            <SearchBox />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {HOT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-full text-sm font-medium backdrop-blur-sm transition-colors border border-white/20"
              >
                {l.label}
                {l.badge && (
                  <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full">{l.badge}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Số liệu thật — ngay dưới hero */}
      <section className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">{s.num}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Loại nội dung */}
        <section aria-labelledby="content-types">
          <h2 id="content-types" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Bạn cần gì hôm nay?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_TYPES.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className="group p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl ${t.color} mb-3`}>
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
          <section aria-labelledby="recent">
            <div className="flex items-center justify-between mb-6">
              <h2 id="recent" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
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
                    className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all"
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
        <section aria-labelledby="grades">
          <h2 id="grades" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Chọn theo lớp</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {GRADES.map((g) => (
              <Link
                key={g}
                href={buildLopUrl(g)}
                className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all text-center"
              >
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{g}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Lớp</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Môn phổ biến theo lớp */}
        {POPULAR_GRADES.map(({ grade, subs }) => (
          <section key={grade} aria-label={`Môn học lớp ${grade}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lớp {grade}</h2>
              <Link href={buildLopUrl(grade)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {subs.map((sub) => (
                <Link
                  key={sub}
                  href={buildMonUrl(grade, sub)}
                  className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{SUBJECT_LABELS[sub]}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lớp {grade}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Giới thiệu — khối GEO: mô tả rõ ràng để AI engines hiểu và trích dẫn */}
        <section
          aria-labelledby="about"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 sm:p-10"
        >
          <h2 id="about" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Về Giải Bài Tập 247
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 text-[15px]">
              <p>
                <strong>Giải Bài Tập 247</strong> là website học tập miễn phí dành cho học sinh Việt Nam.
                Chúng tôi biên soạn lời giải bài tập <strong>bám sát từng trang sách giáo khoa</strong> hiện hành
                — trả lời đúng câu hỏi trong sách, giải thích từng bước, không lan man.
              </p>
              <p>
                Nội dung phủ cả 3 bộ sách: <strong>Kết nối tri thức</strong>, <strong>Chân trời sáng tạo</strong> và{" "}
                <strong>Cánh Diều</strong>, cập nhật liên tục mỗi ngày theo chương trình mới.
              </p>
            </div>
            <ul className="space-y-2.5">
              {[
                "Lời giải theo từng trang SGK — tra cứu nhanh đúng bài cần tìm",
                "Soạn văn đầy đủ: trước khi đọc, trong khi đọc, sau khi đọc",
                "Công thức Toán hiển thị chuẩn LaTeX, dễ đọc trên điện thoại",
                "Miễn phí hoàn toàn, không cần tạo tài khoản",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ — nội dung khớp với FAQPage schema ở đầu trang */}
        <section aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Câu hỏi thường gặp
          </h2>
          <div className="grid gap-3 max-w-3xl">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base list-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-90 shrink-0 ml-3" />
                </summary>
                <p className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
