/**
 * content.ts — Nguồn dữ liệu bài giải, đọc trực tiếp từ file markdown trong repo.
 *
 * Thay cho Strapi: nội dung nằm ở `web/content/bai-giai/<slug>.md`, đọc lúc build
 * nên trang chạy hoàn toàn tĩnh, không cần backend, không có gì để sập.
 *
 * Giữ NGUYÊN tên hàm + hình dạng dữ liệu như lớp Strapi cũ để các trang không phải sửa.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Grade, Subject, BaiGiaiLoai, BoSach } from "@/types";
import { SUBJECT_LABELS, BO_SACH_LABELS } from "@/lib/url";

const CONTENT_DIR = join(process.cwd(), "content", "bai-giai");

interface StrapiMeta {
  pagination?: { page: number; pageSize: number; pageCount: number; total: number };
}
interface StrapiList<T> {
  data: T[];
  meta: StrapiMeta;
}
interface StrapiResponse<T> {
  data: T;
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

export interface StrapiChuong {
  id: number;
  documentId: string;
  ten: string;
  slug: string;
  thu_tu: number;
  lop: Grade;
  mo_ta: string | null;
  mon_hoc?: { ma: Subject; ten: string };
  bo_sach?: { ma: BoSach; ten: string };
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

// ─── Đọc & phân tích file markdown ───────────────────────────────────────────

function parseFrontmatter(src: string): { fm: Record<string, string>; body: string } | null {
  const m = src.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1).replace(/\\"/g, '"');
    }
    fm[mm[1]] = v;
  }
  return { fm, body: m[2] };
}

/** Số trang đầu tiên trong slug, dùng để sắp xếp tự nhiên (trang 6-9 trước trang 10-13). */
function pageOrder(slug: string): number {
  const m = slug.match(/trang-(\d+)/);
  if (m) return parseInt(m[1], 10);
  const b = slug.match(/bai-(\d+)/);
  return b ? parseInt(b[1], 10) : 9999;
}

let CACHE: StrapiBaiGiai[] | null = null;

function loadAll(): StrapiBaiGiai[] {
  if (CACHE) return CACHE;
  if (!existsSync(CONTENT_DIR)) {
    CACHE = [];
    return CACHE;
  }
  const out: StrapiBaiGiai[] = [];
  let autoId = 1;
  for (const name of readdirSync(CONTENT_DIR)) {
    if (!name.endsWith(".md")) continue;
    const path = join(CONTENT_DIR, name);
    const parsed = parseFrontmatter(readFileSync(path, "utf8"));
    if (!parsed) continue;
    const { fm, body } = parsed;
    const slug = (fm.slug || name.replace(/\.md$/, "")).trim();
    const mon = (fm.mon || "toan") as Subject;
    const boSach = (fm.bo_sach || "co-ban") as BoSach;
    const lop = Number(fm.lop) as Grade;
    const published = statSync(path).mtime.toISOString();

    out.push({
      id: autoId++,
      documentId: slug,
      tieu_de: fm.tieu_de || slug,
      slug,
      lop,
      loai: (fm.loai || "giai-sgk") as BaiGiaiLoai,
      bai_so: fm.bai_so || null,
      noi_dung: body.trim(),
      tom_tat: fm.tom_tat || null,
      meta_title: fm.meta_title || null,
      meta_description: fm.meta_description || null,
      view_count: 0,
      publishedAt: published,
      updatedAt: published,
      mon_hoc: { ma: mon, ten: SUBJECT_LABELS[mon] ?? mon, slug: mon },
      bo_sach: { ma: boSach, ten: BO_SACH_LABELS[boSach] ?? boSach, slug: boSach },
      ...(fm.chuong ? { chuong: { ten: fm.chuong, slug: fm.chuong, thu_tu: 0 } } : {}),
    });
  }
  out.sort((a, b) => pageOrder(a.slug) - pageOrder(b.slug) || a.slug.localeCompare(b.slug));
  CACHE = out;
  return out;
}

function paginate<T>(items: T[], page: number, pageSize: number): StrapiList<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return {
    data: items.slice(start, start + pageSize),
    meta: { pagination: { page, pageSize, pageCount, total } },
  };
}

// ─── API công khai (giữ nguyên chữ ký như lớp Strapi cũ) ─────────────────────

export async function getBaiGiaiBySlug(slug: string): Promise<StrapiBaiGiai | null> {
  return loadAll().find((b) => b.slug === slug) ?? null;
}

export async function listChuongByMon(_opts: {
  lop: Grade;
  monMa: Subject;
  boSachMa?: BoSach;
}): Promise<StrapiChuong[]> {
  // Nội dung markdown chưa chia theo chương → danh sách chương để trống.
  return [];
}

export async function listBaiGiaiByMon(opts: {
  lop: Grade;
  monMa: Subject;
  loai?: BaiGiaiLoai;
  boSachMa?: BoSach;
  chuongSlug?: string;
  page?: number;
  pageSize?: number;
}): Promise<StrapiList<StrapiBaiGiai>> {
  const items = loadAll().filter(
    (b) =>
      b.lop === opts.lop &&
      b.mon_hoc?.ma === opts.monMa &&
      (!opts.loai || b.loai === opts.loai) &&
      (!opts.boSachMa || b.bo_sach?.ma === opts.boSachMa),
  );
  return paginate(items, opts.page ?? 1, opts.pageSize ?? 50);
}

export async function listBaiGiaiSlugs(): Promise<
  { slug: string; lop: Grade; mon: Subject; loai: BaiGiaiLoai; bo_sach: BoSach }[]
> {
  return loadAll()
    .filter((b) => b.mon_hoc && b.bo_sach)
    .map((b) => ({
      slug: b.slug,
      lop: b.lop,
      mon: b.mon_hoc!.ma,
      loai: b.loai,
      bo_sach: b.bo_sach!.ma,
    }));
}

export async function listRecentBaiGiai(limit = 8): Promise<StrapiBaiGiai[]> {
  return [...loadAll()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export async function searchBaiGiai(query: string, limit = 10): Promise<StrapiBaiGiai[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return loadAll()
    .filter(
      (b) =>
        b.tieu_de.toLowerCase().includes(q) ||
        (b.tom_tat ?? "").toLowerCase().includes(q),
    )
    .slice(0, limit);
}

// Đề thi & trắc nghiệm: chưa có nội dung dạng markdown → trả về rỗng (trang tự hiện "đang cập nhật").
export async function getDeThiBySlug(_slug: string): Promise<StrapiDeThi | null> {
  return null;
}

export async function listDeThi(opts: {
  loaiDe?: string;
  nam?: number;
  lop?: Grade;
  page?: number;
  pageSize?: number;
}): Promise<StrapiList<StrapiDeThi>> {
  return paginate<StrapiDeThi>([], opts.page ?? 1, opts.pageSize ?? 30);
}

export async function listTracNghiem(
  opts: { lop?: Grade; monMa?: Subject; page?: number; pageSize?: number } = {},
): Promise<StrapiList<StrapiTracNghiem>> {
  return paginate<StrapiTracNghiem>([], opts.page ?? 1, opts.pageSize ?? 30);
}

export async function getTracNghiemBySlug(_slug: string): Promise<StrapiTracNghiem | null> {
  return null;
}

export type { StrapiResponse, StrapiList };
