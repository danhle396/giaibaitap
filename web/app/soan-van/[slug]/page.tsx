import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { buildSoanVanUrl } from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ShareButtons } from "@/components/interaction/ShareButtons";
import { BookmarkButton } from "@/components/interaction/BookmarkButton";
import { TableOfContents } from "@/components/article/TableOfContents";
import { formatDate } from "@/lib/utils";
import { getBaiGiaiBySlug, listBaiGiaiSlugs } from "@/lib/strapi";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const items = await listBaiGiaiSlugs();
    return items.filter((b) => b.loai === "soan-van").map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBaiGiaiBySlug(slug).catch(() => null);
  if (!b) {
    return buildMetadata({ title: "Không tìm thấy", description: "", canonical: "/", noIndex: true });
  }
  return buildMetadata({
    title:
      b.meta_title ??
      SEO_TEMPLATES.soanVan.title({ tieu_de: b.tieu_de, lop: b.lop, phien_ban: "Hay nhất" }),
    description:
      b.meta_description ??
      SEO_TEMPLATES.soanVan.description({ tieu_de: b.tieu_de, lop: b.lop }),
    canonical: buildSoanVanUrl(slug),
  });
}

export default async function SoanVanPage({ params }: Props) {
  const { slug } = await params;
  const b = await getBaiGiaiBySlug(slug).catch(() => null);
  if (!b || b.loai !== "soan-van") notFound();

  const url = buildSoanVanUrl(slug);
  const noiDungHtml = await marked.parse(b.noi_dung, { gfm: true, breaks: false });

  const breadcrumbs = [
    { label: "Soạn văn", href: "/soan-van" },
    { label: b.tieu_de, href: url },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <ArticleSchema
        title={b.meta_title ?? b.tieu_de}
        description={b.meta_description ?? b.tom_tat ?? ""}
        url={url}
        datePublished={b.publishedAt}
        dateModified={b.updatedAt}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-3">
        {b.tieu_de}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Ngữ Văn Lớp {b.lop} • Cập nhật: {formatDate(b.updatedAt)}
      </p>

      <div className="flex items-center gap-3 mb-6">
        <ShareButtons url={url} title={b.tieu_de} />
        <BookmarkButton id={String(b.id)} title={b.tieu_de} href={url} />
      </div>

      <TableOfContents />

      <article
        className="article-body prose prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: noiDungHtml }}
      />
    </div>
  );
}
