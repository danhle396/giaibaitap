/**
 * Logo "Giải Bài Tập 247" — chữ G hình học trên nền xanh gradient.
 * SVG inline nên sắc nét ở mọi kích thước; bản file tĩnh nằm ở /public/logo.svg.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gbt-logo-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#gbt-logo-bg)" />
      <path
        d="M 78 30 A 34 34 0 1 0 84 50 L 58 50"
        fill="none"
        stroke="#ffffff"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(50 50) scale(0.68) translate(-50 -50)"
      />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className={`font-extrabold text-lg tracking-tight ${dark ? "text-white" : "text-gray-900 dark:text-white"}`}>
          Giải Bài Tập
          <span className="text-blue-600 dark:text-blue-400">247</span>
        </span>
        <span className={`text-[10px] font-medium tracking-wide ${dark ? "text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>
          Học tốt mỗi ngày
        </span>
      </span>
    </span>
  );
}
