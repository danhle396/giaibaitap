"use client";

import { useState } from "react";
import { Share2, Link2, Mail, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://giaibaitap.com.vn${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  function copyLink() {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-500 dark:text-gray-400">Chia sẻ:</span>
      <button
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank", "width=600,height=400")}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        <Share2 className="h-3.5 w-3.5" />
        Facebook
      </button>
      <button
        onClick={() => window.open(`https://zalo.me/share/url?url=${encodedUrl}&title=${encodedTitle}`, "_blank", "width=600,height=400")}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-400 hover:bg-blue-500 text-white rounded-md"
      >
        Zalo
      </button>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded-md"
      >
        <Mail className="h-3.5 w-3.5" />
        Email
      </a>
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? "Đã copy!" : "Copy link"}
      </button>
    </div>
  );
}
