import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Giải Bài Tập 247",
    short_name: "GBT247",
    description: "Giải bài tập SGK, soạn văn, đề thi miễn phí cho học sinh Việt Nam",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    categories: ["education"],
    lang: "vi",
    dir: "ltr",
  };
}
