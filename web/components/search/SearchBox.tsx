"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { buildSearchUrl } from "@/lib/url";

const SUGGESTIONS = [
  { label: "Giải SGK Toán 12 Kết nối tri thức", href: "/lop-12/toan/giai-sgk-toan-lop-12-ket-noi-tri-thuc" },
  { label: "Soạn bài Truyện Kiều", href: "/soan-van/tuyen-kieu" },
  { label: "Đề thi tốt nghiệp THPT 2025 Toán", href: "/de-thi/de-thi-tot-nghiep-thpt-2025-mon-toan-de-101" },
  { label: "Giải toán 9 SGK Kết nối", href: "/lop-9/toan" },
  { label: "Soạn bài Chí Phèo Văn 11", href: "/soan-van/chi-pheo" },
  { label: "Công thức lượng giác lớp 11", href: "/lop-11/toan" },
  { label: "Đề thi vào lớp 10 Hà Nội", href: "/de-thi/de-thi-vao-lop-10-ha-noi-2025" },
  { label: "Giải hóa 12 Kết nối tri thức", href: "/lop-12/hoa" },
];

interface SearchBoxProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

export function SearchBox({ onClose, autoFocus }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const filtered = query.length >= 2
    ? SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS.slice(0, 5);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(buildSearchUrl(query.trim()));
      onClose?.();
    }
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            placeholder="Tìm bài giải, soạn văn, đề thi..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
        >
          Tìm
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {open && filtered.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden">
          {filtered.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                onClick={() => { setOpen(false); onClose?.(); }}
              >
                <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
