import type { MetadataRoute } from "next";
import { GRADES, SUBJECTS_BY_GRADE } from "@/lib/url";
import type { Grade, Subject } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap.com.vn";

export default function sitemap(): MetadataRoute.Sitemap {
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
    }))
  );

  return [...staticPages, ...gradePages, ...subjectPages];
}
