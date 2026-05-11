import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import {
  buildBaiGiaiUrl,
  buildLopUrl,
  buildMonUrl,
  SUBJECT_LABELS,
  BO_SACH_LABELS,
} from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ShareButtons } from "@/components/interaction/ShareButtons";
import { BookmarkButton } from "@/components/interaction/BookmarkButton";
import { InArticleAd } from "@/components/ads/InArticleAd";
import { Sidebar } from "@/components/layout/Sidebar";
import { MOCK_BAIS_CUNG_CHUONG } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { getBaiGiaiBySlug, listBaiGiaiSlugs } from "@/lib/strapi";

export const revalidate = 3600;

interface Props {
  params: Promise<{ grade: string; subject: string; type: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const items = await listBaiGiaiSlugs();
    return items.map((b) => ({
      grade: String(b.lop),
      subject: b.mon,
      type: `${b.loai}-${b.mon}-lop-${b.lop}-${b.bo_sach}`,
      slug: b.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBaiGiaiBySlug(slug).catch(() => null);
  if (!b || !b.mon_hoc || !b.bo_sach) {
    return buildMetadata({ title: "Không tìm thấy", description: "", canonical: "/", noIndex: true });
  }
  const seoInput = {
    tieu_de: b.tieu_de,
    bai_so: b.bai_so ?? "",
    mon: b.mon_hoc.ma,
    lop: b.lop,
    bo_sach: b.bo_sach.ma,
  };
  return buildMetadata({
    title: b.meta_title ?? SEO_TEMPLATES.baiGiai.title(seoInput),
    description: b.meta_description ?? SEO_TEMPLATES.baiGiai.description(seoInput),
    canonical: buildBaiGiaiUrl({
      lop: b.lop,
      mon: b.mon_hoc.ma,
      loai: b.loai,
      bo_sach: b.bo_sach.ma,
      slug: b.slug,
    }),
  });
}

export default async function BaiGiaiPage({ params }: Props) {
  const { grade, subject, type, slug } = await params;
  const b = await getBaiGiaiBySlug(slug).catch(() => null);
  if (!b || !b.mon_hoc || !b.bo_sach) notFound();

  const url = buildBaiGiaiUrl({
    lop: b.lop,
    mon: b.mon_hoc.ma,
    loai: b.loai,
    bo_sach: b.bo_sach.ma,
    slug: b.slug,
  });
  const noiDungHtml = await marked.parse(b.noi_dung, { gfm: true, breaks: false });

  const breadcrumbs = [
    { label: `Lớp ${b.lop}`, href: buildLopUrl(b.lop) },
    { label: SUBJECT_LABELS[b.mon_hoc.ma], href: buildMonUrl(b.lop, b.mon_hoc.ma) },
    { label: type.replace(/-/g, " "), href: `/lop-${grade}/${subject}/${type}` },
    { label: b.tieu_de, href: url },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <ArticleSchema
        title={b.meta_title ?? b.tieu_de}
        description={b.meta_description ?? b.tom_tat ?? ""}
        url={url}
        datePublished={b.publishedAt}
        dateModified={b.updatedAt}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <Breadcrumb items={breadcrumbs} />

          <article className="mt-4">
            <header className="mb-6">
              {b.chuong && (
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {b.chuong.ten}
                </p>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {b.tieu_de}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Cập nhật: {formatDate(b.updatedAt)}</span>
                <span>•</span>
                <span>{BO_SACH_LABELS[b.bo_sach.ma]}</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <ShareButtons url={url} title={b.tieu_de} />
                <BookmarkButton id={String(b.id)} title={b.tieu_de} href={url} />
              </div>
            </header>

            <TableOfContents />

            <div
              className="article-body prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: noiDungHtml }}
            />

            <InArticleAd slot="1234567890" />
          </article>
        </div>

        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-20">
            <Sidebar relatedPosts={MOCK_BAIS_CUNG_CHUONG} adSlot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
