import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
      <Link href="/" className="flex items-center hover:text-blue-600">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, i) => (
        <span key={item.href} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-gray-400" />
          {i === items.length - 1 ? (
            <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-blue-600 line-clamp-1">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
