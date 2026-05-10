import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Chính Sách Cookie | Giải Bài Tập",
  description: "Tìm hiểu cách giaibaitap.com.vn sử dụng cookie.",
  canonical: "/chinh-sach-cookie",
});

export default function ChinhSachCookiePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={[{ label: "Chính Sách Cookie", href: "/chinh-sach-cookie" }]} />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-6">
        <h1>Chính Sách Cookie</h1>
        <p><em>Cập nhật lần cuối: 09/05/2026</em></p>

        <h2>Cookie là gì?</h2>
        <p>Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi truy cập website.</p>

        <h2>Chúng tôi sử dụng cookie nào?</h2>
        <table>
          <thead>
            <tr>
              <th>Loại</th>
              <th>Mục đích</th>
              <th>Thời hạn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kỹ thuật</td>
              <td>Lưu dark mode preference, bookmark</td>
              <td>Vĩnh cửu (localStorage)</td>
            </tr>
            <tr>
              <td>Phân tích (GA4)</td>
              <td>Thống kê lượt truy cập ẩn danh</td>
              <td>2 năm</td>
            </tr>
            <tr>
              <td>Quảng cáo (AdSense)</td>
              <td>Hiển thị quảng cáo phù hợp</td>
              <td>13 tháng</td>
            </tr>
          </tbody>
        </table>

        <h2>Cách tắt cookie</h2>
        <p>
          Bạn có thể tắt cookie trong cài đặt trình duyệt. Lưu ý: tắt cookie có thể ảnh hưởng đến trải nghiệm sử dụng website.
        </p>

        <h2>Liên hệ</h2>
        <p><a href="mailto:lienhe@giaibaitap.com.vn">lienhe@giaibaitap.com.vn</a></p>
      </article>
    </div>
  );
}
