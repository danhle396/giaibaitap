import type { MetadataRoute } from "next";
import { GRADES, SUBJECTS_BY_GRADE, buildBaiGiaiUrl, buildSoanVanUrl, buildDeThiUrl } from "@/lib/url";
import { listBaiGiaiSlugs, listDeThi } from "@/lib/strapi";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap247.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/de-thi`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/trac-nghiem`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tim-kiem`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/gioi-thieu`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/lien-he`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/chinh-sach-bao-mat`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/dieu-khoan`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/chinh-sach-cookie`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/dmca`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const gradePages: MetadataRoute.Sitemap = GRADES.map((g) => ({
    url: `${BASE_URL}/lop-${g}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const subjectPages: MetadataRoute.Sitemap = GRADES.flatMap((g) =>
    (SUBJECTS_BY_GRADE[g] || []).map((s) => ({
      url: `${BASE_URL}/lop-${g}/${s}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    })),
  );

  const baiGiaiSlugs = await listBaiGiaiSlugs().catch(() => []);
  const baiGiaiPages: MetadataRoute.Sitemap = baiGiaiSlugs.map((b) => ({
    url: `${BASE_URL}${
      b.loai === "soan-van"
        ? buildSoanVanUrl(b.slug)
        : buildBaiGiaiUrl({ lop: b.lop, mon: b.mon, loai: b.loai, bo_sach: b.bo_sach, slug: b.slug })
    }`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const deThiList = await listDeThi({ pageSize: 100 }).catch(() => ({ data: [] as Array<{ slug: string }> }));
  const deThiPages: MetadataRoute.Sitemap = deThiList.data.map((d) => ({
    url: `${BASE_URL}${buildDeThiUrl(d.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...gradePages, ...subjectPages, ...baiGiaiPages, ...deThiPages];
}
