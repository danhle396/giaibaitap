import Link from "next/link";
import type { BaiGiai, BreadcrumbItem } from "@/types";
import { buildBaiGiaiUrl } from "@/lib/url";
import { ChevronRight } from "lucide-react";

interface SidebarProps {
  relatedPosts?: BaiGiai[];
  adSlot?: string;
}

export function Sidebar({ relatedPosts = [], adSlot }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Ad slot */}
      {adSlot && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[250px] flex items-center justify-center">
          <span className="text-xs text-gray-400">Quảng cáo</span>
        </div>
      )}

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
            Bài cùng chương
          </h3>
          <ul className="space-y-2">
            {relatedPosts.map((b) => (
              <li key={b.id}>
                <Link
                  href={buildBaiGiaiUrl(b)}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <ChevronRight className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
                  <span className="line-clamp-2">{b.tieu_de}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick nav by grade */}
      <div className="bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
          Xem theo lớp
        </h3>
        <div className="grid grid-cols-3 gap-1.5">
          {[12, 11, 10, 9, 8, 7, 6, 5, 4].map((g) => (
            <Link
              key={g}
              href={`/lop-${g}`}
              className="text-xs text-center px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
            >
              Lớp {g}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
