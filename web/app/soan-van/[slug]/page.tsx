import type { Metadata } from "next";
import { buildSoanVanUrl } from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ShareButtons } from "@/components/interaction/ShareButtons";
import { BookmarkButton } from "@/components/interaction/BookmarkButton";
import { MOCK_SOAN_VAN } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "tuyen-kieu" }, { slug: "chi-pheo" }, { slug: "truyen-kieu" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = MOCK_SOAN_VAN;
  return buildMetadata({
    title: SEO_TEMPLATES.soanVan.title({ tieu_de: b.tieu_de, lop: b.lop, phien_ban: "Hay nhất" }),
    description: SEO_TEMPLATES.soanVan.description({ tieu_de: b.tieu_de, lop: b.lop }),
    canonical: buildSoanVanUrl(slug),
  });
}

type PhienBan = "hay_nhat" | "ngan_nhat" | "sieu_ngan";
const PHIEN_BAN_LABELS: Record<PhienBan, string> = {
  hay_nhat: "Hay nhất",
  ngan_nhat: "Ngắn nhất",
  sieu_ngan: "Siêu ngắn",
};

export default async function SoanVanPage({ params }: Props) {
  const { slug } = await params;
  const b = MOCK_SOAN_VAN;
  const url = buildSoanVanUrl(slug);

  const breadcrumbs = [
    { label: "Soạn văn", href: "/soan-van" },
    { label: b.tieu_de, href: url },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <ArticleSchema
        title={SEO_TEMPLATES.soanVan.title({ tieu_de: b.tieu_de, lop: b.lop, phien_ban: "Hay nhất" })}
        description={SEO_TEMPLATES.soanVan.description({ tieu_de: b.tieu_de, lop: b.lop })}
        url={url}
        datePublished={b.published_at}
        dateModified={b.published_at}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-3">
        Soạn bài {b.tieu_de} — Ngữ Văn Lớp {b.lop}
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <ShareButtons url={url} title={`Soạn bài ${b.tieu_de}`} />
        <BookmarkButton id={b.id} title={b.tieu_de} href={url} />
      </div>

      {/* Phiên bản tabs */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {(Object.keys(PHIEN_BAN_LABELS) as PhienBan[]).map((pv, i) => (
            <button
              key={pv}
              className={`flex-1 py-3 text-sm font-medium ${
                i === 0
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {PHIEN_BAN_LABELS[pv]}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div
            className="prose prose-gray dark:prose-invert max-w-none text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: b.phien_ban.hay_nhat.replace(/\n/g, "<br>") }}
          />
        </div>
      </div>
    </div>
  );
}
