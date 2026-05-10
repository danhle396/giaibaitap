export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Subject =
  | "toan"
  | "van"
  | "anh"
  | "ly"
  | "hoa"
  | "sinh"
  | "su"
  | "dia"
  | "gdcd"
  | "tin";

export type BaiGiaiLoai =
  | "giai-sgk"
  | "giai-sbt"
  | "giai-vbt"
  | "soan-van"
  | "ly-thuyet";

export type BoSach =
  | "ket-noi-tri-thuc"
  | "chan-troi-sang-tao"
  | "canh-dieu"
  | "co-ban";

export interface BaiGiai {
  id: string;
  slug: string;
  tieu_de: string;
  lop: Grade;
  mon: Subject;
  loai: BaiGiaiLoai;
  bo_sach: BoSach;
  bo_sach_label: string;
  chuong: string;
  bai_so: string;
  noi_dung: string;
  tom_tat?: string;
  published_at: string;
  updated_at: string;
}

export interface SoanVanPhienBan {
  hay_nhat: string;
  ngan_nhat: string;
  sieu_ngan: string;
}

export interface SoanVan {
  id: string;
  slug: string;
  tieu_de: string;
  lop: Grade;
  phien_ban: SoanVanPhienBan;
  published_at: string;
}

export interface DeThi {
  id: string;
  slug: string;
  tieu_de: string;
  lop: Grade;
  mon: Subject;
  loai: "giua-ky" | "cuoi-ky" | "tot-nghiep" | "dgnl" | "vao-lop-10";
  nam: number;
  noi_dung: string;
  dap_an: string;
  published_at: string;
}

export interface CauHoiTracNghiem {
  id: string;
  cau_hoi: string;
  dap_an: ["A" | "B" | "C" | "D"];
  lua_chon: { A: string; B: string; C: string; D: string };
  giai_thich?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
