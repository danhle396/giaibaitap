"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  content?: string;
}

function slugifyVN(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildToc(): TocItem[] {
  const headings = Array.from(
    document.querySelectorAll(".article-body h2, .article-body h3")
  ) as HTMLElement[];
  const seen = new Map<string, number>();
  return headings.map((el) => {
    const text = el.textContent || "";
    const base = el.id || slugifyVN(text) || "heading";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    el.id = id;
    return { id, text, level: el.tagName === "H2" ? 2 : 3 };
  });
}

export function TableOfContents({}: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setItems(buildToc());
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    document
      .querySelectorAll(".article-body h2, .article-body h3")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-lg p-4 my-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white text-sm w-full"
      >
        <List className="h-4 w-4 text-blue-600" />
        Mục lục
        <span className="ml-auto text-xs text-gray-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ol className="mt-3 space-y-1.5 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(item.level === 3 && "ml-4")}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  "hover:text-blue-600 transition-colors",
                  activeId === item.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 dark:text-gray-300"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
