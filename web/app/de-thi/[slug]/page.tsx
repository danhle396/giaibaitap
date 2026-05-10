import type { Metadata } from "next";
import { buildDeThiUrl } from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ShareButtons } from "@/components/interaction/ShareButtons";
import { MOCK_DE_THI } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Download, FileText } from "lucide-react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "de-thi-tot-nghiep-thpt-2025-mon-toan-de-101" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = MOCK_DE_THI;
  return buildMetadata({
    title: SEO_TEMPLATES.deThi.title(d),
    description: SEO_TEMPLATES.deThi.description(d),
    canonical: buildDeThiUrl(slug),
  });
}

export default async function DeThiDetailPage({ params }: Props) {
  const { slug } = await params;
  const d = MOCK_DE_THI;
  const url = buildDeThiUrl(slug);

  const breadcrumbs = [
    { label: "Đề Thi", href: "/de-thi" },
    { label: d.tieu_de, href: url },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <ArticleSchema
        title={SEO_TEMPLATES.deThi.title(d)}
        description={SEO_TEMPLATES.deThi.description(d)}
        url={url}
        datePublished={d.published_at}
        dateModified={d.published_at}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-3">
        {d.tieu_de}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <ShareButtons url={url} title={d.tieu_de} />
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md">
          <Download className="h-3.5 w-3.5" />
          Tải PDF
        </button>
      </div>

      {/* Đề thi */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mb-6">
        <div className="bg-orange-50 dark:bg-gray-700 px-5 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center gap-2">
          <FileText className="h-4 w-4 text-orange-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Đề thi</h2>
        </div>
        <div className="p-5 prose prose-gray dark:prose-invert max-w-none text-sm">
          <p>Xem đề thi dưới đây (placeholder — sẽ có nội dung thật khi tích hợp Strapi)</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            {d.noi_dung}
          </pre>
        </div>
      </div>

      {/* Đáp án */}
      <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-xl">
        <div className="bg-green-50 dark:bg-green-900/20 px-5 py-3 border-b border-green-200 dark:border-green-800 flex items-center gap-2">
          <h2 className="font-semibold text-green-800 dark:text-green-300 text-sm">Đáp án chi tiết</h2>
        </div>
        <div className="p-5 prose prose-gray dark:prose-invert max-w-none text-sm">
          <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            {d.dap_an}
          </pre>
        </div>
      </div>
    </div>
  );
}
