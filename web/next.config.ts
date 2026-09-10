import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    return [
      {
        // Decap CMS là HTML tĩnh trong public/admin/. Next không tự phục vụ
        // index.html cho đường dẫn thư mục nên phải trỏ tay.
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/lop-:grade(\\d+)",
        destination: "/lop/:grade",
      },
      {
        source: "/lop-:grade(\\d+)/:path*",
        destination: "/lop/:grade/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
