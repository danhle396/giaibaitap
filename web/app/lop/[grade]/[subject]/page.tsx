import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildBaiGiaiUrl, buildLopUrl, buildMonUrl, SUBJECT_LABELS, BO_SACH_LABELS } from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { MOCK_BAIS_CUNG_CHUONG } from "@/lib/mock-data";
import type { Grade, Subject, BoSach } from "@/types";

export const revalidate = 3600;

interface Props {
  params: Promise<{ grade: string; subject: string }>;
}

export async function generateStaticParams() {
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);
  const subjects: Subject[] = ["toan", "van", "anh", "ly", "hoa", "sinh", "su", "dia", "gdcd", "tin"];
  return grades.flatMap((g) => subjects.map((s) => ({ grade: String(g), subject: s })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade, subject } = await params;
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) {
    return buildMetadata({ title: "Không tìm thấy", description: "", canonical: "/", noIndex: true });
  }
  return buildMetadata({
    title: SEO_TEMPLATES.mon.title(g as Grade, subject as Subject),
    description: SEO_TEMPLATES.mon.description(g as Grade, subject as Subject),
    canonical: `/lop-${grade}/${subject}`,
  });
}

const BO_SACHS: BoSach[] = ["ket-noi-tri-thuc", "chan-troi-sang-tao", "canh-dieu"];

const MOCK_CHAPTERS = [
  { id: "chuong-1", label: "Chương 1: Ứng dụng đạo hàm", bais: MOCK_BAIS_CUNG_CHUONG },
  { id: "chuong-2", label: "Chương 2: Hàm số lũy thừa, hàm số mũ và hàm số lôgarit", bais: MOCK_BAIS_CUNG_CHUONG.slice(0, 3) },
  { id: "chuong-3", label: "Chương 3: Nguyên hàm và tích phân", bais: MOCK_BAIS_CUNG_CHUONG.slice(0, 4) },
];

export default async function MonPage({ params }: Props) {
  const { grade, subject } = await params;
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) notFound();
  const gTyped = g as Grade;
  const sub = subject as Subject;

  const breadcrumbs = [
    { label: `Lớp ${gTyped}`, href: buildLopUrl(gTyped) },
    { label: SUBJECT_LABELS[sub], href: buildMonUrl(gTyped, sub) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <BreadcrumbSchema items={breadcrumbs} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Giải {SUBJECT_LABELS[sub]} Lớp {gTyped}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Lời giải {SUBJECT_LABELS[sub]} lớp {gTyped} đầy đủ, chi tiết. Bao gồm tất cả bộ sách: Kết nối tri thức, Chân trời sáng tạo, Cánh Diều.
      </p>

      <div className="flex gap-2 mb-8 flex-wrap">
        {BO_SACHS.map((bs) => (
          <Link
            key={bs}
            href={`/lop-${grade}/${subject}?bo-sach=${bs}`}
            className="px-4 py-2 text-sm rounded-lg border border-blue-600 bg-blue-600 text-white font-medium"
          >
            {BO_SACH_LABELS[bs]}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        {MOCK_CHAPTERS.map((ch) => (
          <div key={ch.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-blue-50 dark:bg-gray-700 px-5 py-3 border-b border-gray-200 dark:border-gray-600">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">{ch.label}</h2>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {ch.bais.map((b) => (
                <li key={b.id}>
                  <Link
                    href={buildBaiGiaiUrl(b)}
                    className="flex items-center px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <span className="mr-3 text-xs text-gray-400">{b.bai_so}</span>
                    {b.tieu_de}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
