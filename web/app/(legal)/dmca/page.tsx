import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "DMCA | Giải Bài Tập",
  description: "Chính sách DMCA và quy trình khiếu nại bản quyền của giaibaitap247.com.",
  canonical: "/dmca",
});

export default function DmcaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={[{ label: "DMCA", href: "/dmca" }]} />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-6">
        <h1>DMCA & Bản Quyền</h1>
        <p><em>Cập nhật lần cuối: 09/05/2026</em></p>

        <p>
          <strong>giaibaitap247.com</strong> tôn trọng quyền sở hữu trí tuệ. Nếu bạn cho rằng nội dung trên website vi phạm bản quyền của bạn, vui lòng gửi thông báo DMCA theo hướng dẫn bên dưới.
        </p>

        <h2>Quy trình khiếu nại</h2>
        <p>Gửi email đến <a href="mailto:lienhe@giaibaitap247.com">lienhe@giaibaitap247.com</a> với tiêu đề <strong>[DMCA] Khiếu nại bản quyền</strong> và bao gồm:</p>
        <ol>
          <li>Mô tả tác phẩm bị vi phạm bản quyền</li>
          <li>URL cụ thể của nội dung vi phạm trên website</li>
          <li>Thông tin liên hệ của bạn (tên, email, điện thoại)</li>
          <li>Tuyên bố rằng bạn có quyền hợp pháp đối với tác phẩm</li>
          <li>Chữ ký điện tử hoặc tên đầy đủ</li>
        </ol>

        <h2>Thời gian xử lý</h2>
        <p>Chúng tôi sẽ xem xét và xử lý khiếu nại trong vòng <strong>5-7 ngày làm việc</strong> kể từ khi nhận được thông báo hợp lệ.</p>

        <h2>Chính sách nội dung</h2>
        <p>
          Chúng tôi chỉ xuất bản nội dung do đội ngũ biên soạn hoặc được cấp phép hợp lệ. Nội dung lời giải mang tính chất giáo dục, không sao chép toàn bộ sách giáo khoa có bản quyền.
        </p>
      </article>
    </div>
  );
}
