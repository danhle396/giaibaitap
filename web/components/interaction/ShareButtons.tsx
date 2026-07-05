"use client";

import { useState } from "react";
import { Share2, Link2, Mail, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://giaibaitap247.com"}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  function copyLink() {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      trackEvent("share", "engagement", `copy_link:${url}`);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-500 dark:text-gray-400">Chia sẻ:</span>
      <button
        onClick={() => {
          trackEvent("share", "engagement", `facebook:${url}`);
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank", "width=600,height=400");
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        <Share2 className="h-3.5 w-3.5" />
        Facebook
      </button>
      <button
        onClick={() => {
          trackEvent("share", "engagement", `zalo:${url}`);
          window.open(`https://zalo.me/share/url?url=${encodedUrl}&title=${encodedTitle}`, "_blank", "width=600,height=400");
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-400 hover:bg-blue-500 text-white rounded-md"
      >
        Zalo
      </button>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        onClick={() => trackEvent("share", "engagement", `email:${url}`)}
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
