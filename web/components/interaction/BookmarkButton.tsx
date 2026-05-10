"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkButtonProps {
  id: string;
  title: string;
  href: string;
}

function readBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("bookmarks") || "[]");
  } catch {
    return [];
  }
}

export function BookmarkButton({ id }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(() => readBookmarks().includes(id));

  function toggle() {
    const bookmarks = readBookmarks();
    const next = saved ? bookmarks.filter((b) => b !== id) : [...bookmarks, id];
    localStorage.setItem("bookmarks", JSON.stringify(next));
    setSaved(!saved);
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600"
      aria-label={saved ? "Bỏ lưu bài" : "Lưu bài"}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4 text-blue-600" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {saved ? "Đã lưu" : "Lưu bài"}
    </button>
  );
}
