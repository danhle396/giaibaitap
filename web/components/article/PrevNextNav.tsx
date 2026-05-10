import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutList } from "lucide-react";

interface PrevNextNavProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  listHref: string;
  listLabel: string;
}

export function PrevNextNav({ prev, next, listHref, listLabel }: PrevNextNavProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-6 border-t border-b border-gray-200 dark:border-gray-700 my-8">
      {prev ? (
        <Link href={prev.href} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 max-w-[40%]">
          <ChevronLeft className="h-4 w-4 shrink-0" />
          <span className="line-clamp-2">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      <Link href={listHref} className="flex flex-col items-center gap-1 text-xs text-gray-500 hover:text-blue-600 shrink-0">
        <LayoutList className="h-4 w-4" />
        <span>Danh sách</span>
      </Link>
      {next ? (
        <Link href={next.href} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 text-right max-w-[40%]">
          <span className="line-clamp-2">{next.title}</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
