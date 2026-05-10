import type { Metadata } from "next";
import type { Grade, Subject, BoSach } from "@/types";
import { SUBJECT_LABELS, BO_SACH_LABELS, buildBaiGiaiUrl, buildSoanVanUrl, buildDeThiUrl } from "./url";

const SITE_NAME = "Giải Bài Tập";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap.com.vn";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const SEO_TEMPLATES = {
  baiGiai: {
    title: (b: { tieu_de: string; mon: Subject; lop: Grade; bo_sach: BoSach }) =>
      `${b.tieu_de} - Giải ${SUBJECT_LABELS[b.mon]} Lớp ${b.lop} ${BO_SACH_LABELS[b.bo_sach]} | ${SITE_NAME}`,
    description: (b: { bai_so: string; tieu_de: string; mon: Subject; lop: Grade; bo_sach: BoSach }) =>
      `Lời giải chi tiết ${b.bai_so}: ${b.tieu_de}. ${SUBJECT_LABELS[b.mon]} lớp ${b.lop} - sách ${BO_SACH_LABELS[b.bo_sach]}. Hướng dẫn từng bước, dễ hiểu, miễn phí.`,
  },
  soanVan: {
    title: (b: { tieu_de: string; lop: Grade; phien_ban: string }) =>
      `Soạn bài ${b.tieu_de} (${b.phien_ban}) - Ngữ Văn Lớp ${b.lop} | ${SITE_NAME}`,
    description: (b: { tieu_de: string; lop: Grade }) =>
      `Soạn bài ${b.tieu_de} lớp ${b.lop}: tóm tắt, phân tích nhân vật, ý nghĩa, nội dung chính. Ngắn gọn, dễ hiểu.`,
  },
  deThi: {
    title: (b: { tieu_de: string; nam: number }) =>
      `${b.tieu_de} có đáp án ${b.nam} | ${SITE_NAME}`,
    description: (b: { tieu_de: string; nam: number }) =>
      `${b.tieu_de} năm ${b.nam} kèm đáp án chi tiết. Tải về PDF, ôn luyện hiệu quả, chuẩn bị tốt nhất cho kỳ thi.`,
  },
  lop: {
    title: (grade: Grade) =>
      `Giải Bài Tập Lớp ${grade} - Tất cả môn học | ${SITE_NAME}`,
    description: (grade: Grade) =>
      `Tổng hợp lời giải bài tập lớp ${grade}: Toán, Văn, Anh, Lý, Hóa, Sinh... Giải chi tiết, đầy đủ, miễn phí.`,
  },
  mon: {
    title: (grade: Grade, subject: Subject) =>
      `Giải ${SUBJECT_LABELS[subject]} Lớp ${grade} - SGK, SBT đầy đủ | ${SITE_NAME}`,
    description: (grade: Grade, subject: Subject) =>
      `Lời giải ${SUBJECT_LABELS[subject]} lớp ${grade} đầy đủ, chi tiết. Bao gồm SGK, SBT tất cả bộ sách: Kết nối, Chân trời, Cánh Diều.`,
  },
};

interface BuildMetadataOptions {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${canonical}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
  };
}

export function buildDefaultMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} - Giải bài tập SGK, SBT tất cả môn học miễn phí`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Giải bài tập SGK, SBT, soạn văn, đề thi tất cả các môn học từ lớp 1 đến lớp 12. Lời giải chi tiết, dễ hiểu, miễn phí.",
    metadataBase: new URL(SITE_URL),
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
    },
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  };
}
