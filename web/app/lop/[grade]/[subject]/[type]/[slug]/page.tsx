import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";
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
import { PrevNextNav } from "@/components/article/PrevNextNav";
import { ShareButtons } from "@/components/interaction/ShareButtons";
import { BookmarkButton } from "@/components/interaction/BookmarkButton";
import { InArticleAd } from "@/components/ads/InArticleAd";
import { Sidebar } from "@/components/layout/Sidebar";
import { formatDate } from "@/lib/utils";
import { getBaiGiaiBySlug, listBaiGiaiByMon, listBaiGiaiSlugs } from "@/lib/strapi";

export const revalidate = 3600;

interface Props {
  params: Promise<{ grade: string; subject: string; type: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const items = await listBaiGiaiSlugs();
    return items
      .filter((b) => b.loai !== "soan-van")
      .map((b) => ({
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
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) notFound();
  const b = await getBaiGiaiBySlug(slug).catch(() => null);
  if (!b || !b.mon_hoc || !b.bo_sach) notFound();

  const url = buildBaiGiaiUrl({
    lop: b.lop,
    mon: b.mon_hoc.ma,
    loai: b.loai,
    bo_sach: b.bo_sach.ma,
    slug: b.slug,
  });
  const noiDungHtml = renderMarkdown(b.noi_dung);

  const chuongList = b.chuong
    ? await listBaiGiaiByMon({
        lop: b.lop,
        monMa: b.mon_hoc.ma,
        boSachMa: b.bo_sach.ma,
        chuongSlug: b.chuong.slug,
        pageSize: 50,
      })
        .then((r) => r.data.filter((x) => x.mon_hoc && x.bo_sach))
        .catch(() => [])
    : [];

  const buildHref = (x: (typeof chuongList)[number]) =>
    buildBaiGiaiUrl({
      lop: x.lop,
      mon: x.mon_hoc!.ma,
      loai: x.loai,
      bo_sach: x.bo_sach!.ma,
      slug: x.slug,
    });

  const currentIdx = chuongList.findIndex((x) => x.slug === b.slug);
  const prev = currentIdx > 0 ? chuongList[currentIdx - 1] : null;
  const next = currentIdx >= 0 && currentIdx < chuongList.length - 1 ? chuongList[currentIdx + 1] : null;
  const related = chuongList
    .filter((x) => x.slug !== b.slug)
    .slice(0, 8)
    .map((x) => ({ id: x.id, tieu_de: x.tieu_de, href: buildHref(x) }));

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

            <div className="article-body" dangerouslySetInnerHTML={{ __html: noiDungHtml }} />

            <InArticleAd slot="1234567890" />

            <PrevNextNav
              prev={prev ? { title: prev.tieu_de, href: buildHref(prev) } : undefined}
              next={next ? { title: next.tieu_de, href: buildHref(next) } : undefined}
              listHref={`/lop-${grade}/${subject}/${type}`}
              listLabel="Danh sách bài"
            />
          </article>
        </div>

        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-20">
            <Sidebar relatedPosts={related} adSlot="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
