import Link from "next/link";
import type { Metadata } from "next";
import { buildMonUrl, SUBJECT_LABELS, SUBJECTS_BY_GRADE, BO_SACH_LABELS } from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { listBaiGiaiSlugs } from "@/lib/strapi";
import type { Grade, Subject } from "@/types";

interface Props {
  params: Promise<{ grade: string }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ grade: String(i + 1) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grade } = await params;
  const g = parseInt(grade) as Grade;
  // Lớp chưa có bài nào thì noindex: người dùng vẫn vào được, nhưng Google không
  // lập chỉ mục trang rỗng (bị đánh thin content, kéo tụt chất lượng cả site).
  const slugs = await listBaiGiaiSlugs().catch(() => []);
  const coBai = slugs.some((b) => String(b.lop) === String(g));
  return buildMetadata({
    title: SEO_TEMPLATES.lop.title(g),
    description: SEO_TEMPLATES.lop.description(g),
    canonical: `/lop-${grade}`,
    noIndex: !coBai,
  });
}

const BO_SACHS = ["ket-noi-tri-thuc", "chan-troi-sang-tao", "canh-dieu"] as const;

export default async function LopPage({ params }: Props) {
  const { grade } = await params;
  const g = parseInt(grade) as Grade;
  const subjects = SUBJECTS_BY_GRADE[g] || [];

  const breadcrumbs = [{ label: `Lớp ${g}`, href: `/lop-${g}` }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <BreadcrumbSchema items={breadcrumbs} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Giải Bài Tập Lớp {g}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Tổng hợp lời giải bài tập lớp {g}: tất cả môn học, đầy đủ bộ sách, chi tiết từng bước.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <Link
            key={sub}
            href={buildMonUrl(g, sub)}
            className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
              {SUBJECT_LABELS[sub]}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {BO_SACHS.map((bs) => (
                <span
                  key={bs}
                  className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {BO_SACH_LABELS[bs]}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
