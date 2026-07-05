import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";
import { buildDeThiUrl } from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ArticleTracker } from "@/components/analytics/ArticleTracker";
import { ShareButtons } from "@/components/interaction/ShareButtons";
import { formatDate } from "@/lib/utils";
import { getDeThiBySlug, listDeThi } from "@/lib/strapi";
import { FileText } from "lucide-react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const list = await listDeThi({ pageSize: 100 });
    return list.data.map((d) => ({ slug: d.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDeThiBySlug(slug).catch(() => null);
  if (!d) {
    return buildMetadata({ title: "Không tìm thấy", description: "", canonical: "/", noIndex: true });
  }
  return buildMetadata({
    title: d.meta_title ?? SEO_TEMPLATES.deThi.title({ tieu_de: d.tieu_de, nam: d.nam }),
    description:
      d.meta_description ?? SEO_TEMPLATES.deThi.description({ tieu_de: d.tieu_de, nam: d.nam }),
    canonical: buildDeThiUrl(slug),
  });
}

export default async function DeThiDetailPage({ params }: Props) {
  const { slug } = await params;
  const d = await getDeThiBySlug(slug).catch(() => null);
  if (!d) notFound();

  const url = buildDeThiUrl(slug);
  const deHtml = d.noi_dung_de ? renderMarkdown(d.noi_dung_de) : "";
  const dapAnHtml = d.noi_dung_dap_an ? renderMarkdown(d.noi_dung_dap_an) : "";

  const breadcrumbs = [
    { label: "Đề Thi", href: "/de-thi" },
    { label: d.tieu_de, href: url },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <ArticleSchema
        title={d.meta_title ?? d.tieu_de}
        description={d.meta_description ?? ""}
        url={url}
        datePublished={d.publishedAt}
        dateModified={d.publishedAt}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleTracker label={`de-thi/${d.slug}`} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        {d.tieu_de}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Năm {d.nam} • Lớp {d.lop} • {d.thoi_gian_lam_bai} phút
        {d.tinh_thanh ? ` • ${d.tinh_thanh}` : ""}
        {" • "}Cập nhật: {formatDate(d.publishedAt)}
      </p>

      <div className="flex items-center gap-4 mb-6">
        <ShareButtons url={url} title={d.tieu_de} />
      </div>

      {deHtml && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
          <div className="bg-orange-50 dark:bg-gray-700 px-5 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-500" />
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Đề thi</h2>
          </div>
          <div
            className="p-5 article-body prose prose-gray dark:prose-invert max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: deHtml }}
          />
        </div>
      )}

      {dapAnHtml && (
        <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="bg-green-50 dark:bg-green-900/20 px-5 py-3 border-b border-green-200 dark:border-green-800">
            <h2 className="font-semibold text-green-800 dark:text-green-300 text-sm">
              Đáp án chi tiết
            </h2>
          </div>
          <div
            className="p-5 article-body prose prose-gray dark:prose-invert max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: dapAnHtml }}
          />
        </div>
      )}
    </div>
  );
}
