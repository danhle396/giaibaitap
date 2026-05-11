import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildBaiGiaiUrl, buildLopUrl, buildMonUrl, SUBJECT_LABELS } from "@/lib/url";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MOCK_BAIS_CUNG_CHUONG } from "@/lib/mock-data";
import type { Grade, Subject } from "@/types";

export const revalidate = 3600;

interface Props {
  params: Promise<{ grade: string; subject: string; type: string }>;
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
  const label = type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return buildMetadata({
    title: `${label} - ${SUBJECT_LABELS[subject as Subject]} Lớp ${g}`,
    description: `Lời giải chi tiết ${label}. ${SUBJECT_LABELS[subject as Subject]} lớp ${g}, dễ hiểu, đầy đủ từng bài.`,
    canonical: `/lop-${grade}/${subject}/${type}`,
  });
}

export default async function TypePage({ params }: Props) {
  const { grade, subject, type } = await params;
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) notFound();
  const gTyped = g as Grade;
  const sub = subject as Subject;

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
        {type.replace(/-/g, " ")}
      </h1>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mt-6 overflow-hidden">
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {MOCK_BAIS_CUNG_CHUONG.map((b) => (
            <li key={b.id}>
              <Link
                href={buildBaiGiaiUrl(b)}
                className="flex items-center px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-xs text-gray-400 w-12 shrink-0">{b.bai_so}</span>
                <span className="text-sm text-gray-700 dark:text-gray-200">{b.tieu_de}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
