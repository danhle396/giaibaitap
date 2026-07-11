"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { GRADES, SUBJECT_LABELS, buildLopUrl, buildMonUrl } from "@/lib/url";
import type { Grade, Subject } from "@/types";
import { DarkModeToggle } from "@/components/interaction/DarkModeToggle";
import { SearchBox } from "@/components/search/SearchBox";
import { Logo } from "@/components/ui/Logo";

const MAIN_SUBJECTS: Subject[] = ["toan", "van", "anh", "ly", "hoa", "sinh"];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeGrade, setActiveGrade] = useState<Grade | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="Giải Bài Tập 247 — Trang chủ">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Lớp dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 rounded-md">
                Theo Lớp <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {GRADES.map((g) => (
                    <Link
                      key={g}
                      href={buildLopUrl(g)}
                      className="px-2 py-1.5 text-sm text-center text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"
                    >
                      Lớp {g}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Môn học dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 rounded-md">
                Theo Môn <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {MAIN_SUBJECTS.map((s) => (
                  <Link
                    key={s}
                    href={buildMonUrl(12, s)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                  >
                    {SUBJECT_LABELS[s]}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/de-thi"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 rounded-md"
            >
              Đề Thi
            </Link>
            <Link
              href="/trac-nghiem"
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 rounded-md"
            >
              Trắc Nghiệm
            </Link>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-500 hover:text-blue-600 rounded-md"
              aria-label="Tìm kiếm"
            >
              <Search className="h-5 w-5" />
            </button>
            <DarkModeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-blue-600 rounded-md"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="py-3 border-t border-gray-100 dark:border-gray-700">
            <SearchBox onClose={() => setSearchOpen(false)} autoFocus />
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Theo lớp</p>
            <div className="grid grid-cols-4 gap-1">
              {GRADES.map((g) => (
                <Link
                  key={g}
                  href={buildLopUrl(g)}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-2 text-sm text-center border border-gray-200 dark:border-gray-600 rounded text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  Lớp {g}
                </Link>
              ))}
            </div>
            <div className="pt-2 space-y-1">
              <Link href="/de-thi" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md">Đề Thi</Link>
              <Link href="/trac-nghiem" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md">Trắc Nghiệm</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
