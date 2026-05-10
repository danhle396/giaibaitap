import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { BaiGiai } from "@/types";
import { buildBaiGiaiUrl } from "@/lib/url";

interface RelatedPostsProps {
  posts: BaiGiai[];
  title?: string;
}

export function RelatedPosts({ posts, title = "Bài liên quan" }: RelatedPostsProps) {
  if (!posts.length) return null;
  return (
    <section className="mt-10">
      <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {posts.map((b) => (
          <Link
            key={b.id}
            href={buildBaiGiaiUrl(b)}
            className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <BookOpen className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{b.tieu_de}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{b.chuong}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
