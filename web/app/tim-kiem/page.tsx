import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SearchBox } from "@/components/search/SearchBox";
import { searchBaiGiai } from "@/lib/strapi";
import { buildBaiGiaiUrl, buildSoanVanUrl, SUBJECT_LABELS } from "@/lib/url";
import { Search } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Tìm Kiếm | Giải Bài Tập",
  description: "Tìm kiếm bài giải SGK, soạn văn, đề thi trên Giải Bài Tập.",
  canonical: "/tim-kiem",
  noIndex: true,
});

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function TimKiemPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await searchBaiGiai(query, 30).catch(() => []) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[{ label: "Tìm kiếm", href: "/tim-kiem" }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
        {query ? `Kết quả tìm kiếm: "${query}"` : "Tìm kiếm"}
      </h1>

      <div className="mb-8">
        <SearchBox autoFocus={!query} />
      </div>

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Không tìm thấy kết quả cho &quot;{query}&quot;
          </p>
          <p className="text-sm text-gray-400 mt-2">Thử tìm với từ khóa khác nhé.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{results.length} kết quả</p>
          {results.map((r) => {
            if (!r.mon_hoc || !r.bo_sach) return null;
            const href =
              r.loai === "soan-van"
                ? buildSoanVanUrl(r.slug)
                : buildBaiGiaiUrl({
                    lop: r.lop,
                    mon: r.mon_hoc.ma,
                    loai: r.loai,
                    bo_sach: r.bo_sach.ma,
                    slug: r.slug,
                  });
            return (
              <Link
                key={r.id}
                href={href}
                className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full mb-2 inline-block">
                  {SUBJECT_LABELS[r.mon_hoc.ma]} • Lớp {r.lop}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm hover:text-blue-600 mt-1">
                  {r.tieu_de}
                </h3>
                {r.tom_tat && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {r.tom_tat}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
