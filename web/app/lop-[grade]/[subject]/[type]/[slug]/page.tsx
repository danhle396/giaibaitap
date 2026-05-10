import type { Metadata } from "next";
import { buildBaiGiaiUrl, buildLopUrl, buildMonUrl, SUBJECT_LABELS } from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { TableOfContents } from "@/components/article/TableOfContents";
import { PrevNextNav } from "@/components/article/PrevNextNav";
import { RelatedPosts } from "@/components/article/RelatedPosts";
import { ShareButtons } from "@/components/interaction/ShareButtons";
import { BookmarkButton } from "@/components/interaction/BookmarkButton";
import { InArticleAd } from "@/components/ads/InArticleAd";
import { Sidebar } from "@/components/layout/Sidebar";
import { MOCK_BAI_GIAI, MOCK_BAIS_CUNG_CHUONG } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { Grade, Subject } from "@/types";

export const revalidate = 3600;

interface Props {
  params: Promise<{ grade: string; subject: string; type: string; slug: string }>;
}

export async function generateStaticParams() {
  return [
    {
      grade: "12",
      subject: "toan",
      type: "giai-sgk-toan-lop-12-ket-noi-tri-thuc",
      slug: "bai-1-tinh-don-dieu-cua-ham-so",
    },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade, subject, slug } = await params;
  const b = MOCK_BAI_GIAI;
  return buildMetadata({
    title: SEO_TEMPLATES.baiGiai.title(b),
    description: SEO_TEMPLATES.baiGiai.description(b),
    canonical: buildBaiGiaiUrl(b),
  });
}

const MOCK_FAQ = [
  { question: "Hàm số đồng biến nghĩa là gì?", answer: "Hàm số f(x) đồng biến trên khoảng (a;b) khi với mọi x1 < x2 trong khoảng đó thì f(x1) < f(x2)." },
  { question: "Làm thế nào để tìm khoảng đơn điệu của hàm số?", answer: "Tính đạo hàm f'(x), giải f'(x) = 0 để tìm điểm tới hạn, rồi lập bảng biến thiên xét dấu f'(x)." },
  { question: "Bài 1 Toán 12 thuộc chương nào?", answer: "Bài 1 thuộc Chương 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số, SGK Toán 12 Kết nối tri thức." },
];

export default async function BaiGiaiPage({ params }: Props) {
  const { grade, subject, type, slug } = await params;
  const g = parseInt(grade) as Grade;
  const sub = subject as Subject;
  const b = MOCK_BAI_GIAI;
  const url = buildBaiGiaiUrl(b);

  const breadcrumbs = [
    { label: `Lớp ${g}`, href: buildLopUrl(g) },
    { label: SUBJECT_LABELS[sub], href: buildMonUrl(g, sub) },
    { label: type.replace(/-/g, " "), href: `/lop-${grade}/${subject}/${type}` },
    { label: b.tieu_de, href: url },
  ];

  const prev = MOCK_BAIS_CUNG_CHUONG[0];
  const next = MOCK_BAIS_CUNG_CHUONG[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <ArticleSchema
        title={SEO_TEMPLATES.baiGiai.title(b)}
        description={SEO_TEMPLATES.baiGiai.description(b)}
        url={url}
        datePublished={b.published_at}
        dateModified={b.updated_at}
      />
      <FAQSchema items={MOCK_FAQ} />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Breadcrumb items={breadcrumbs} />

          <article className="mt-4">
            <header className="mb-6">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{b.chuong}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {b.tieu_de}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Cập nhật: {formatDate(b.updated_at)}</span>
                <span>•</span>
                <span>{b.bo_sach_label}</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <ShareButtons url={url} title={b.tieu_de} />
                <BookmarkButton id={b.id} title={b.tieu_de} href={url} />
              </div>
            </header>

            <TableOfContents />

            <div className="article-body prose prose-gray dark:prose-invert max-w-none">
              <h2 id="ly-thuyet">Lý thuyết</h2>
              <p>
                Hàm số <code>f(x)</code> đồng biến trên khoảng <code>(a; b)</code> nếu với mọi{" "}
                <code>x₁, x₂ ∈ (a; b)</code>:
              </p>
              <blockquote>
                Nếu <code>x₁ &lt; x₂</code> thì <code>f(x₁) &lt; f(x₂)</code>
              </blockquote>

              <h2 id="bai-giai">Bài giải chi tiết</h2>
              <h3 id="cau-1">Câu 1. Xét tính đơn điệu của hàm số</h3>
              <p>
                Cho hàm số <code>y = x³ - 3x + 2</code>. Xét tính đơn điệu trên từng khoảng.
              </p>
              <p>
                <strong>Giải:</strong> Ta tính đạo hàm:{" "}
                <code>y&apos; = 3x² - 3 = 3(x² - 1) = 3(x-1)(x+1)</code>
              </p>
              <p>
                Từ <code>y&apos; = 0</code> suy ra <code>x = ±1</code>
              </p>

              <table>
                <thead>
                  <tr>
                    <th>x</th>
                    <th>(-∞; -1)</th>
                    <th>-1</th>
                    <th>(-1; 1)</th>
                    <th>1</th>
                    <th>(1; +∞)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>y&apos;</td>
                    <td>+</td>
                    <td>0</td>
                    <td>-</td>
                    <td>0</td>
                    <td>+</td>
                  </tr>
                  <tr>
                    <td>y</td>
                    <td>↗</td>
                    <td>4</td>
                    <td>↘</td>
                    <td>0</td>
                    <td>↗</td>
                  </tr>
                </tbody>
              </table>

              <p>
                <strong>Kết luận:</strong> Hàm số đồng biến trên <code>(-∞; -1)</code> và{" "}
                <code>(1; +∞)</code>, nghịch biến trên <code>(-1; 1)</code>.
              </p>
            </div>

            <InArticleAd slot="1234567890" />

            {/* FAQ */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Câu hỏi thường gặp</h2>
              <div className="space-y-3">
                {MOCK_FAQ.map((faq) => (
                  <details key={faq.question} className="bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <summary className="px-4 py-3 font-medium text-gray-900 dark:text-white cursor-pointer text-sm">
                      {faq.question}
                    </summary>
                    <p className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <PrevNextNav
              prev={{ title: prev.tieu_de, href: buildBaiGiaiUrl(prev) }}
              next={{ title: next.tieu_de, href: buildBaiGiaiUrl(next) }}
              listHref={`/lop-${grade}/${subject}/${type}`}
              listLabel="Danh sách bài"
            />

            <RelatedPosts posts={MOCK_BAIS_CUNG_CHUONG} title="Bài cùng chương" />
          </article>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-20">
            <Sidebar relatedPosts={MOCK_BAIS_CUNG_CHUONG} adSlot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
