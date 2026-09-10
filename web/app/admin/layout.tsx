import type { Metadata } from "next";

// Trang quản trị: chặn mọi công cụ tìm kiếm. robots.txt đã chặn /admin, thẻ này
// là lớp phòng thứ hai phòng khi Google tới bằng đường khác.
export const metadata: Metadata = {
  title: "Quản trị nội dung",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
