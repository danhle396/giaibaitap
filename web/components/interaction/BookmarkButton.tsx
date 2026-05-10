"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkButtonProps {
  id: string;
  title: string;
  href: string;
}

export function BookmarkButton({ id, title, href }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setSaved(bookmarks.includes(id));
  }, [id]);

  function toggle() {
    const bookmarks: string[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    let next: string[];
    if (saved) {
      next = bookmarks.filter((b) => b !== id);
    } else {
      next = [...bookmarks, id];
    }
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
