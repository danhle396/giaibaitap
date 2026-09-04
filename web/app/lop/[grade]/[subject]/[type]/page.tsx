import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildArticleUrl, buildLopUrl, buildMonUrl, SUBJECT_LABELS, BO_SACH_LABELS } from "@/lib/url";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { listBaiGiaiByMon } from "@/lib/strapi";
import type { Grade, Subject, BaiGiaiLoai, BoSach } from "@/types";

export const revalidate = 3600;

interface Props {
  params: Promise<{ grade: string; subject: string; type: string }>;
}

const ALLOWED_LOAI: BaiGiaiLoai[] = ["giai-sgk", "giai-sbt", "giai-vbt", "soan-van", "ly-thuyet"];
const ALLOWED_BO_SACH: BoSach[] = ["ket-noi-tri-thuc", "chan-troi-sang-tao", "canh-dieu", "co-ban"];

function parseTypeSegment(
  type: string,
  subject: string,
  grade: string,
): { loai: BaiGiaiLoai; boSach: BoSach } | null {
  // Format: ${loai}-${subject}-lop-${grade}-${bo_sach}
  // Loai may contain dashes (giai-sgk), bo_sach may contain dashes (ket-noi-tri-thuc)
  const marker = `-${subject}-lop-${grade}-`;
  const idx = type.indexOf(marker);
  if (idx === -1) return null;
  const loaiCandidate = type.slice(0, idx);
  const boSachCandidate = type.slice(idx + marker.length);
  if (!ALLOWED_LOAI.includes(loaiCandidate as BaiGiaiLoai)) return null;
  if (!ALLOWED_BO_SACH.includes(boSachCandidate as BoSach)) return null;
  return { loai: loaiCandidate as BaiGiaiLoai, boSach: boSachCandidate as BoSach };
}

export async function generateStaticParams() {
  return [
    { grade: "12", subject: "toan", type: "giai-sgk-toan-lop-12-ket-noi-tri-thuc" },
    { grade: "12", subject: "van", type: "soan-van-12-ket-noi-tri-thuc" },
    { grade: "9", subject: "toan", type: "giai-sgk-toan-lop-9-ket-noi-tri-thuc" },
    { grade: "11", subject: "toan", type: "giai-sgk-toan-lop-11-ket-noi-tri-thuc" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade, subject, type } = await params;
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) {
    return buildMetadata({ title: "Không tìm thấy", description: "", canonical: "/", noIndex: true });
  }
  const parsed = parseTypeSegment(type, subject, grade);
  const label = parsed
    ? `${parsed.loai.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} ${SUBJECT_LABELS[subject as Subject]} Lớp ${g} ${BO_SACH_LABELS[parsed.boSach]}`
    : type.replace(/-/g, " ");
  return buildMetadata({
    title: `${label} | Giải Bài Tập`,
    description: `Tổng hợp ${label}, dễ hiểu, đầy đủ từng bài.`,
    canonical: `/lop-${grade}/${subject}/${type}`,
  });
}

export default async function TypePage({ params }: Props) {
  const { grade, subject, type } = await params;
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) notFound();
  const gTyped = g as Grade;
  const sub = subject as Subject;
  const parsed = parseTypeSegment(type, subject, grade);
  if (!parsed) notFound();

  const list = await listBaiGiaiByMon({
    lop: gTyped,
    monMa: sub,
    loai: parsed.loai,
    boSachMa: parsed.boSach,
    pageSize: 200,
  }).catch(() => ({ data: [] }));

  const breadcrumbs = [
    { label: `Lớp ${gTyped}`, href: buildLopUrl(gTyped) },
    { label: SUBJECT_LABELS[sub], href: buildMonUrl(gTyped, sub) },
    { label: type.replace(/-/g, " ").replace("lop", "lớp"), href: `/lop-${grade}/${subject}/${type}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <BreadcrumbSchema items={breadcrumbs} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2 capitalize">
        {parsed.loai.replace(/-/g, " ")} {SUBJECT_LABELS[sub]} Lớp {gTyped}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {BO_SACH_LABELS[parsed.boSach]}
      </p>

      {list.data.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-sm text-yellow-800 dark:text-yellow-300">
          Chưa có bài giải nào cho danh mục này.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mt-6 overflow-hidden">
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {list.data.map((b) => (
              <li key={b.id}>
                <Link
                  href={buildArticleUrl({
                    lop: b.lop,
                    mon: b.mon_hoc!.ma,
                    loai: b.loai,
                    bo_sach: b.bo_sach!.ma,
                    slug: b.slug,
                  })}
                  className="flex items-center px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xs text-gray-400 w-12 shrink-0">{b.bai_so ?? ""}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-200">{b.tieu_de}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
