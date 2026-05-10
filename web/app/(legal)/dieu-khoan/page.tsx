import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Điều Khoản Sử Dụng | Giải Bài Tập",
  description: "Điều khoản sử dụng dịch vụ của giaibaitap247.com.",
  canonical: "/dieu-khoan",
});

export default function DieuKhoanPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={[{ label: "Điều Khoản Sử Dụng", href: "/dieu-khoan" }]} />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-6">
        <h1>Điều Khoản Sử Dụng</h1>
        <p><em>Cập nhật lần cuối: 09/05/2026</em></p>

        <p>
          Bằng cách truy cập và sử dụng <strong>giaibaitap247.com</strong>, bạn đồng ý tuân thủ các điều khoản sử dụng dưới đây.
        </p>

        <h2>1. Mục đích sử dụng</h2>
        <p>
          Nội dung trên website chỉ mang tính chất tham khảo, hỗ trợ học tập. Không được sử dụng cho mục đích thương mại hoặc gian lận học thuật.
        </p>

        <h2>2. Bản quyền nội dung</h2>
        <p>
          Tất cả nội dung trên website (văn bản, hình ảnh, công thức) thuộc bản quyền của <strong>giaibaitap247.com</strong> hoặc các tác giả tương ứng. Nghiêm cấm sao chép, phân phối lại mà không có sự cho phép bằng văn bản.
        </p>

        <h2>3. Tuyên bố miễn trách nhiệm</h2>
        <p>
          Chúng tôi cố gắng đảm bảo tính chính xác nhưng không đảm bảo lời giải hoàn toàn không có lỗi. Người dùng nên kiểm chứng lại với giáo viên trước khi sử dụng trong bài kiểm tra.
        </p>

        <h2>4. Thay đổi điều khoản</h2>
        <p>
          Chúng tôi có quyền thay đổi điều khoản bất kỳ lúc nào. Tiếp tục sử dụng website sau khi thay đổi nghĩa là bạn chấp nhận điều khoản mới.
        </p>

        <h2>5. Luật áp dụng</h2>
        <p>Các điều khoản này được điều chỉnh bởi pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.</p>

        <h2>6. Liên hệ</h2>
        <p><a href="mailto:lienhe@giaibaitap247.com">lienhe@giaibaitap247.com</a></p>
      </article>
    </div>
  );
}
