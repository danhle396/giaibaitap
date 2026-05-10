import type { BaiGiai, DeThi, Grade, Subject, BoSach, BaiGiaiLoai } from "@/types";

export function buildBaiGiaiUrl(b: {
  lop: Grade;
  mon: Subject;
  loai: BaiGiaiLoai;
  bo_sach: BoSach;
  slug: string;
}): string {
  return `/lop-${b.lop}/${b.mon}/${b.loai}-${b.mon}-lop-${b.lop}-${b.bo_sach}/${b.slug}`;
}

export function buildLopUrl(grade: Grade): string {
  return `/lop-${grade}`;
}

export function buildMonUrl(grade: Grade, subject: Subject): string {
  return `/lop-${grade}/${subject}`;
}

export function buildTypeUrl(
  grade: Grade,
  subject: Subject,
  type: string,
  boSach: BoSach
): string {
  return `/lop-${grade}/${subject}/${type}-${subject}-lop-${grade}-${boSach}`;
}

export function buildSoanVanUrl(slug: string): string {
  return `/soan-van/${slug}`;
}

export function buildDeThiUrl(slug: string): string {
  return `/de-thi/${slug}`;
}

export function buildTracNghiemUrl(slug: string): string {
  return `/trac-nghiem/${slug}`;
}

export function buildSearchUrl(query: string): string {
  return `/tim-kiem?q=${encodeURIComponent(query)}`;
}

export const SUBJECT_LABELS: Record<Subject, string> = {
  toan: "Toán",
  van: "Ngữ Văn",
  anh: "Tiếng Anh",
  ly: "Vật Lý",
  hoa: "Hóa Học",
  sinh: "Sinh Học",
  su: "Lịch Sử",
  dia: "Địa Lý",
  gdcd: "GDCD",
  tin: "Tin Học",
};

export const BO_SACH_LABELS: Record<BoSach, string> = {
  "ket-noi-tri-thuc": "Kết nối tri thức",
  "chan-troi-sang-tao": "Chân trời sáng tạo",
  "canh-dieu": "Cánh Diều",
  "co-ban": "Cơ bản",
};

export const GRADES: Grade[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const SUBJECTS_BY_GRADE: Record<number, Subject[]> = {
  1: ["toan", "van", "anh"],
  2: ["toan", "van", "anh"],
  3: ["toan", "van", "anh"],
  4: ["toan", "van", "anh"],
  5: ["toan", "van", "anh"],
  6: ["toan", "van", "anh", "su", "dia", "gdcd", "tin"],
  7: ["toan", "van", "anh", "ly", "hoa", "sinh", "su", "dia", "gdcd", "tin"],
  8: ["toan", "van", "anh", "ly", "hoa", "sinh", "su", "dia", "gdcd", "tin"],
  9: ["toan", "van", "anh", "ly", "hoa", "sinh", "su", "dia", "gdcd", "tin"],
  10: ["toan", "van", "anh", "ly", "hoa", "sinh", "su", "dia", "gdcd", "tin"],
  11: ["toan", "van", "anh", "ly", "hoa", "sinh", "su", "dia", "gdcd", "tin"],
  12: ["toan", "van", "anh", "ly", "hoa", "sinh", "su", "dia", "gdcd", "tin"],
};
