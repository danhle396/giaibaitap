import type { Grade, Subject, BaiGiaiLoai, BoSach } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface StrapiMeta {
  pagination?: { page: number; pageSize: number; pageCount: number; total: number };
}

interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

interface StrapiList<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiBaiGiai {
  id: number;
  documentId: string;
  tieu_de: string;
  slug: string;
  lop: Grade;
  loai: BaiGiaiLoai;
  bai_so: string | null;
  noi_dung: string;
  tom_tat: string | null;
  meta_title: string | null;
  meta_description: string | null;
  view_count: number;
  publishedAt: string;
  updatedAt: string;
  mon_hoc?: { ma: Subject; ten: string; slug: string };
  bo_sach?: { ma: BoSach; ten: string; slug: string };
  chuong?: { ten: string; slug: string; thu_tu: number };
  tags?: { ten: string; slug: string }[];
}

export interface StrapiDeThi {
  id: number;
  documentId: string;
  tieu_de: string;
  slug: string;
  loai_de: string;
  nam: number;
  lop: Grade;
  tinh_thanh: string | null;
  noi_dung_de: string | null;
  noi_dung_dap_an: string | null;
  thoi_gian_lam_bai: number;
  view_count: number;
  meta_title: string | null;
  meta_description: string | null;
  publishedAt: string;
  mon_hoc?: { ma: Subject; ten: string };
}

export interface StrapiTracNghiemQuestion {
  cau_hoi: string;
  dap_an: string[];
  dap_an_dung: number;
  giai_thich?: string;
}

export interface StrapiTracNghiem {
  id: number;
  documentId: string;
  tieu_de: string;
  slug: string;
  lop: Grade;
  do_kho: "nhan-biet" | "thong-hieu" | "van-dung" | "van-dung-cao";
  thoi_gian: number;
  so_cau: number;
  cau_hoi: StrapiTracNghiemQuestion[];
  view_count: number;
  meta_title: string | null;
  meta_description: string | null;
  publishedAt: string;
  mon_hoc?: { ma: Subject; ten: string };
}

async function strapiFetch<T>(
  path: string,
  options: { revalidate?: number; tags?: string[]; cache?: RequestCache } = {},
): Promise<T> {
  const { revalidate = 3600, tags = [], cache } = options;
  const url = path.startsWith("http") ? path : `${STRAPI_URL}/api${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url, {
    headers,
    ...(cache ? { cache } : { next: { revalidate, tags } }),
  });

  if (!res.ok) {
    throw new Error(`Strapi ${res.status} ${res.statusText} on ${path}`);
  }
  return res.json();
}

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) usp.set(k, String(v));
  }
  const s = usp.toString();
  return s ? `?${s}` : "";
}

export async function getBaiGiaiBySlug(slug: string): Promise<StrapiBaiGiai | null> {
  const q = buildQuery({
    "filters[slug][$eq]": slug,
    "populate[mon_hoc]": "true",
    "populate[bo_sach]": "true",
    "populate[chuong]": "true",
    "populate[tags]": "true",
    "pagination[pageSize]": 1,
  });
  const json = await strapiFetch<StrapiList<StrapiBaiGiai>>(`/bai-giais${q}`, {
    revalidate: 3600,
    tags: [`bai-giai-${slug}`],
  });
  return json.data[0] || null;
}

export async function listBaiGiaiByMon(opts: {
  lop: Grade;
  monMa: Subject;
  loai?: BaiGiaiLoai;
  boSachMa?: BoSach;
  page?: number;
  pageSize?: number;
}): Promise<StrapiList<StrapiBaiGiai>> {
  const q = buildQuery({
    "filters[lop][$eq]": opts.lop,
    "filters[mon_hoc][ma][$eq]": opts.monMa,
    "filters[loai][$eq]": opts.loai,
    "filters[bo_sach][ma][$eq]": opts.boSachMa,
    "populate[chuong]": "true",
    "sort[0]": "chuong.thu_tu:asc",
    "sort[1]": "bai_so:asc",
    "pagination[page]": opts.page ?? 1,
    "pagination[pageSize]": opts.pageSize ?? 50,
  });
  return strapiFetch<StrapiList<StrapiBaiGiai>>(`/bai-giais${q}`, {
    revalidate: 3600,
    tags: [`bai-giai-list-${opts.lop}-${opts.monMa}`],
  });
}

export async function listBaiGiaiSlugs(): Promise<{ slug: string; lop: Grade; mon: Subject; loai: BaiGiaiLoai; bo_sach: BoSach }[]> {
  const q = buildQuery({
    "fields[0]": "slug",
    "fields[1]": "lop",
    "fields[2]": "loai",
    "populate[mon_hoc][fields][0]": "ma",
    "populate[bo_sach][fields][0]": "ma",
    "pagination[pageSize]": 1000,
  });
  const json = await strapiFetch<StrapiList<StrapiBaiGiai>>(`/bai-giais${q}`, {
    revalidate: 3600,
    tags: ["bai-giai-slugs"],
  });
  return json.data
    .filter((b) => b.mon_hoc && b.bo_sach)
    .map((b) => ({
      slug: b.slug,
      lop: b.lop,
      mon: b.mon_hoc!.ma,
      loai: b.loai,
      bo_sach: b.bo_sach!.ma,
    }));
}

export async function getDeThiBySlug(slug: string): Promise<StrapiDeThi | null> {
  const q = buildQuery({
    "filters[slug][$eq]": slug,
    "populate[mon_hoc]": "true",
    "pagination[pageSize]": 1,
  });
  const json = await strapiFetch<StrapiList<StrapiDeThi>>(`/de-this${q}`, {
    revalidate: 3600,
    tags: [`de-thi-${slug}`],
  });
  return json.data[0] || null;
}

export async function listDeThi(opts: {
  loaiDe?: string;
  nam?: number;
  lop?: Grade;
  page?: number;
  pageSize?: number;
}): Promise<StrapiList<StrapiDeThi>> {
  const q = buildQuery({
    "filters[loai_de][$eq]": opts.loaiDe,
    "filters[nam][$eq]": opts.nam,
    "filters[lop][$eq]": opts.lop,
    "populate[mon_hoc]": "true",
    "sort[0]": "nam:desc",
    "sort[1]": "tieu_de:asc",
    "pagination[page]": opts.page ?? 1,
    "pagination[pageSize]": opts.pageSize ?? 30,
  });
  return strapiFetch<StrapiList<StrapiDeThi>>(`/de-this${q}`, {
    revalidate: 3600,
    tags: ["de-thi-list"],
  });
}

export async function listTracNghiem(opts: {
  lop?: Grade;
  monMa?: Subject;
  page?: number;
  pageSize?: number;
} = {}): Promise<StrapiList<StrapiTracNghiem>> {
  const q = buildQuery({
    "filters[lop][$eq]": opts.lop,
    "filters[mon_hoc][ma][$eq]": opts.monMa,
    "populate[mon_hoc]": "true",
    "sort[0]": "publishedAt:desc",
    "pagination[page]": opts.page ?? 1,
    "pagination[pageSize]": opts.pageSize ?? 30,
  });
  return strapiFetch<StrapiList<StrapiTracNghiem>>(`/trac-nghiems${q}`, {
    revalidate: 3600,
    tags: ["trac-nghiem-list"],
  });
}

export async function getTracNghiemBySlug(slug: string): Promise<StrapiTracNghiem | null> {
  const q = buildQuery({
    "filters[slug][$eq]": slug,
    "populate[mon_hoc]": "true",
    "populate[chuong]": "true",
    "pagination[pageSize]": 1,
  });
  const json = await strapiFetch<StrapiList<StrapiTracNghiem>>(`/trac-nghiems${q}`, {
    revalidate: 3600,
    tags: [`trac-nghiem-${slug}`],
  });
  return json.data[0] || null;
}

export async function listRecentBaiGiai(limit = 8): Promise<StrapiBaiGiai[]> {
  const q = buildQuery({
    "populate[mon_hoc]": "true",
    "populate[bo_sach]": "true",
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": limit,
  });
  const json = await strapiFetch<StrapiList<StrapiBaiGiai>>(`/bai-giais${q}`, {
    revalidate: 600,
    tags: ["bai-giai-recent"],
  });
  return json.data;
}

export async function searchBaiGiai(query: string, limit = 10): Promise<StrapiBaiGiai[]> {
  const q = buildQuery({
    "filters[$or][0][tieu_de][$containsi]": query,
    "filters[$or][1][tom_tat][$containsi]": query,
    "populate[mon_hoc]": "true",
    "populate[bo_sach]": "true",
    "pagination[pageSize]": limit,
  });
  const json = await strapiFetch<StrapiList<StrapiBaiGiai>>(`/bai-giais${q}`, {
    cache: "no-store",
  });
  return json.data;
}

export type { StrapiResponse, StrapiList };
