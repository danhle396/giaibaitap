import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Chính Sách Bảo Mật | Giải Bài Tập",
  description: "Chính sách bảo mật thông tin của Giải Bài Tập — cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.",
  canonical: "/chinh-sach-bao-mat",
});

export default function ChinhSachBaoMatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={[{ label: "Chính Sách Bảo Mật", href: "/chinh-sach-bao-mat" }]} />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-6">
        <h1>Chính Sách Bảo Mật</h1>
        <p><em>Cập nhật lần cuối: 09/05/2026</em></p>

        <p>
          Chính sách bảo mật này mô tả cách <strong>giaibaitap247.com</strong> thu thập, sử dụng và bảo vệ thông tin của bạn khi sử dụng website của chúng tôi, phù hợp với Nghị định 13/2023/NĐ-CP của Chính phủ Việt Nam.
        </p>

        <h2>1. Thông tin chúng tôi thu thập</h2>
        <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
        <ul>
          <li><strong>Thông tin sử dụng:</strong> Trang bạn truy cập, thời gian truy cập, thiết bị và trình duyệt (qua Google Analytics 4 và Microsoft Clarity).</li>
          <li><strong>Cookie:</strong> Cookie kỹ thuật để cải thiện trải nghiệm, cookie quảng cáo của Google AdSense.</li>
          <li><strong>Thông tin tự nguyện cung cấp:</strong> Email khi bạn liên hệ với chúng tôi.</li>
        </ul>

        <h2>2. Mục đích sử dụng</h2>
        <ul>
          <li>Cải thiện nội dung và trải nghiệm người dùng</li>
          <li>Phân tích lưu lượng truy cập</li>
          <li>Hiển thị quảng cáo phù hợp qua Google AdSense</li>
          <li>Phản hồi yêu cầu hỗ trợ</li>
        </ul>

        <h2>3. Google AdSense</h2>
        <p>
          Website sử dụng Google AdSense để hiển thị quảng cáo. Google có thể sử dụng cookie DoubleClick để phục vụ quảng cáo phù hợp với sở thích của bạn. Bạn có thể tắt cá nhân hóa quảng cáo tại <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.
        </p>

        <h2>4. Quyền của bạn</h2>
        <p>Theo Nghị định 13/2023/NĐ-CP, bạn có quyền:</p>
        <ul>
          <li>Được thông báo về việc thu thập dữ liệu</li>
          <li>Yêu cầu xóa dữ liệu cá nhân</li>
          <li>Rút lại sự đồng ý bất kỳ lúc nào</li>
        </ul>

        <h2>5. Liên hệ</h2>
        <p>Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ: <a href="mailto:lienhe@giaibaitap247.com">lienhe@giaibaitap247.com</a></p>
      </article>
    </div>
  );
}
