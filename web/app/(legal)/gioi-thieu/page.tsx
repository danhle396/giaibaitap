import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Giới Thiệu | Giải Bài Tập",
  description: "Giới thiệu về Giải Bài Tập — website giải bài tập SGK, soạn văn, đề thi miễn phí cho học sinh Việt Nam.",
  canonical: "/gioi-thieu",
});

export default function GioiThieuPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={[{ label: "Giới Thiệu", href: "/gioi-thieu" }]} />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-6">
        <h1>Giới Thiệu về Giải Bài Tập</h1>

        <h2>Sứ mệnh của chúng tôi</h2>
        <p>
          <strong>Giải Bài Tập</strong> ra đời với sứ mệnh đơn giản: giúp mọi học sinh Việt Nam tiếp cận lời giải bài tập chất lượng cao, miễn phí, không phân biệt điều kiện kinh tế hay địa lý.
        </p>
        <p>
          Chúng tôi tin rằng giáo dục tốt là quyền của mọi người, không phải đặc quyền của ai.
        </p>

        <h2>Nội dung chúng tôi cung cấp</h2>
        <ul>
          <li>Giải bài tập SGK, SBT, VBT tất cả môn từ lớp 1 đến lớp 12</li>
          <li>Soạn văn 3 phiên bản: Hay nhất, Ngắn nhất, Siêu ngắn</li>
          <li>Đề thi các cấp kèm đáp án chi tiết</li>
          <li>Trắc nghiệm online có giải thích</li>
          <li>Lý thuyết và công thức tổng hợp</li>
        </ul>

        <h2>Cam kết chất lượng</h2>
        <p>
          Mọi lời giải trên Giải Bài Tập đều được kiểm tra kỹ lưỡng bởi đội ngũ giáo viên có kinh nghiệm. Chúng tôi cập nhật theo chương trình SGK mới nhất của Bộ GD&ĐT.
        </p>

        <h2>Liên hệ</h2>
        <p>Email: <a href="mailto:lienhe@giaibaitap247.com">lienhe@giaibaitap247.com</a></p>
        <p>Facebook: <a href="https://facebook.com/giaibaitap" target="_blank" rel="noopener noreferrer">facebook.com/giaibaitap</a></p>
      </article>
    </div>
  );
}
