import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Giải Bài Tập",
    short_name: "GBT",
    description: "Giải bài tập SGK, soạn văn, đề thi miễn phí cho học sinh Việt Nam",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    categories: ["education"],
    lang: "vi",
    dir: "ltr",
  };
}
