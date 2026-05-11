import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildBaiGiaiUrl,
  buildLopUrl,
  buildMonUrl,
  SUBJECT_LABELS,
  BO_SACH_LABELS,
} from "@/lib/url";
import { buildMetadata, SEO_TEMPLATES } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { listChuongByMon, listBaiGiaiByMon, type StrapiBaiGiai } from "@/lib/strapi";
import type { Grade, Subject, BoSach } from "@/types";

export const revalidate = 3600;

interface Props {
  params: Promise<{ grade: string; subject: string }>;
  searchParams: Promise<{ "bo-sach"?: string }>;
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
const ALLOWED_BO_SACH = new Set<string>(BO_SACHS);

export default async function MonPage({ params, searchParams }: Props) {
  const { grade, subject } = await params;
  const sp = await searchParams;
  const g = parseInt(grade);
  if (isNaN(g) || g < 1 || g > 12) notFound();
  const gTyped = g as Grade;
  const sub = subject as Subject;
  const activeBoSach: BoSach =
    sp["bo-sach"] && ALLOWED_BO_SACH.has(sp["bo-sach"]) ? (sp["bo-sach"] as BoSach) : BO_SACHS[0];

  const [chuongs, allBai] = await Promise.all([
    listChuongByMon({ lop: gTyped, monMa: sub, boSachMa: activeBoSach }).catch(() => []),
    listBaiGiaiByMon({ lop: gTyped, monMa: sub, boSachMa: activeBoSach, pageSize: 200 }).catch(
      () => ({ data: [] as StrapiBaiGiai[] }),
    ),
  ]);
  const baiByChuong = new Map<string, StrapiBaiGiai[]>();
  for (const b of allBai.data) {
    const key = b.chuong?.slug ?? "_no_chuong";
    if (!baiByChuong.has(key)) baiByChuong.set(key, []);
    baiByChuong.get(key)!.push(b);
  }
  const orphanBai = baiByChuong.get("_no_chuong") ?? [];

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

      {/* Bộ sách tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {BO_SACHS.map((bs) => (
          <Link
            key={bs}
            href={`/lop-${grade}/${subject}?bo-sach=${bs}`}
            className={
              "px-4 py-2 text-sm rounded-lg border font-medium transition-colors " +
              (bs === activeBoSach
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400")
            }
          >
            {BO_SACH_LABELS[bs]}
          </Link>
        ))}
      </div>

      {chuongs.length === 0 && orphanBai.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-sm text-yellow-800 dark:text-yellow-300">
          Chưa có bài giải cho {SUBJECT_LABELS[sub]} lớp {gTyped} bộ {BO_SACH_LABELS[activeBoSach]}.
        </div>
      ) : (
        <div className="space-y-6">
          {chuongs.map((ch) => {
            const bais = baiByChuong.get(ch.slug) ?? [];
            return (
              <div
                key={ch.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <div className="bg-blue-50 dark:bg-gray-700 px-5 py-3 border-b border-gray-200 dark:border-gray-600">
                  <h2 className="font-semibold text-gray-900 dark:text-white text-sm">{ch.ten}</h2>
                </div>
                {bais.length === 0 ? (
                  <p className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                    Chưa có bài giải nào trong chương này.
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                    {bais.map((b) => (
                      <li key={b.id}>
                        <Link
                          href={buildBaiGiaiUrl({
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
                )}
              </div>
            );
          })}

          {orphanBai.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3 border-b border-gray-200 dark:border-gray-600">
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Khác</h2>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {orphanBai.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={buildBaiGiaiUrl({
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
