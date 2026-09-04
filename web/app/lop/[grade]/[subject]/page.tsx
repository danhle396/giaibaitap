import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildArticleUrl,
  buildLopUrl,
  buildMonUrl,
  SUBJECT_LABELS,
  BO_SACH_LABELS,
} from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { listBaiGiaiByMon, listBaiGiaiSlugs, type StrapiBaiGiai } from "@/lib/strapi";
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
  // Môn chưa có bài nào thì noindex — tránh nộp trang rỗng cho Google.
  const slugs = await listBaiGiaiSlugs().catch(() => []);
  const coBai = slugs.some((b) => String(b.lop) === String(g) && b.mon === subject);
  return buildMetadata({
    title: SEO_TEMPLATES.mon.title(g as Grade, subject as Subject),
    description: SEO_TEMPLATES.mon.description(g as Grade, subject as Subject),
    canonical: `/lop-${grade}/${subject}`,
    noIndex: !coBai,
  });
}

const BO_SACHS: BoSach[] = ["ket-noi-tri-thuc", "chan-troi-sang-tao", "canh-dieu"];

export default async function MonPage({ params }: Props) {
  const { grade, subject } = await params;
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) notFound();
  const gTyped = g as Grade;
  const sub = subject as Subject;
  // Lấy bài của CẢ BA bộ sách rồi hiển thị hết. Trước đây chỉ hiện 1 bộ, 2 bộ còn
  // lại nằm sau ?bo-sach= nên hàng trăm bài không có liên kết thường nào trỏ tới —
  // Google không phát hiện ra chúng ("Đã phát hiện - chưa lập chỉ mục").
  const perBoSach = await Promise.all(
    BO_SACHS.map((bs) =>
      listBaiGiaiByMon({ lop: gTyped, monMa: sub, boSachMa: bs, pageSize: 500 })
        .then((r) => [bs, r.data] as const)
        .catch(() => [bs, [] as StrapiBaiGiai[]] as const),
    ),
  );
  const tongBai = perBoSach.reduce((n, [, list]) => n + list.length, 0);

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
        Lời giải {SUBJECT_LABELS[sub]} lớp {gTyped} đầy đủ, chi tiết. Bao gồm tất cả bộ sách: Kết
        nối tri thức, Chân trời sáng tạo, Cánh Diều.
      </p>

      {tongBai === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-sm text-yellow-800 dark:text-yellow-300">
          Chưa có bài giải cho {SUBJECT_LABELS[sub]} lớp {gTyped}.
        </div>
      ) : (
        <div className="space-y-8">
          {perBoSach.map(([bs, list]) =>
            list.length === 0 ? null : (
              <section key={bs} id={bs}>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {BO_SACH_LABELS[bs]}
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    {list.length} bài
                  </span>
                </h2>
                <ul className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
                  {list.map((b) => (
                    <li key={b.id}>
                      <Link
                        href={buildArticleUrl({
                          lop: b.lop,
                          mon: b.mon_hoc!.ma,
                          loai: b.loai,
                          bo_sach: b.bo_sach!.ma,
                          slug: b.slug,
                        })}
                        className="flex items-center px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                      >
                        <span className="mr-3 text-xs text-gray-400">{b.bai_so ?? ""}</span>
                        {b.tieu_de}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ),
          )}
        </div>
      )}
    </div>
  );
}
