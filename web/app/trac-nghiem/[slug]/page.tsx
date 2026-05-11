import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { buildMetadata } from "@/lib/seo";
import { buildTracNghiemUrl } from "@/lib/url";
import { getTracNghiemBySlug } from "@/lib/strapi";
import { QuizInteractive } from "@/components/interaction/QuizInteractive";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tn = await getTracNghiemBySlug(slug).catch(() => null);
  if (!tn) {
    return buildMetadata({ title: "Không tìm thấy", description: "", canonical: "/", noIndex: true });
  }
  return buildMetadata({
    title: tn.meta_title ?? tn.tieu_de,
    description: tn.meta_description ?? `Bộ ${tn.so_cau} câu trắc nghiệm có đáp án và lời giải chi tiết.`,
    canonical: buildTracNghiemUrl(slug),
  });
}

export default async function TracNghiemDetailPage({ params }: Props) {
  const { slug } = await params;
  const tn = await getTracNghiemBySlug(slug).catch(() => null);
  if (!tn) notFound();

  const breadcrumbs = [
    { label: "Trắc Nghiệm", href: "/trac-nghiem" },
    { label: tn.tieu_de, href: buildTracNghiemUrl(slug) },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <BreadcrumbSchema items={breadcrumbs} />
      <Breadcrumb items={breadcrumbs} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        {tn.tieu_de}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Lớp {tn.lop} • {tn.so_cau} câu hỏi • {Math.round(tn.thoi_gian / 60)} phút
      </p>

      <QuizInteractive questions={tn.cau_hoi} />
    </div>
  );
}
