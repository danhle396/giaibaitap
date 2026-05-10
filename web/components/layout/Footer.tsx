import Link from "next/link";
import { BookOpen, Globe, Mail, ExternalLink } from "lucide-react";
import { GRADES, buildLopUrl } from "@/lib/url";

const LEGAL_LINKS = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Liên hệ", href: "/lien-he" },
  { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
  { label: "Điều khoản sử dụng", href: "/dieu-khoan" },
  { label: "Chính sách Cookie", href: "/chinh-sach-cookie" },
  { label: "DMCA", href: "/dmca" },
];

const SUBJECT_LINKS = [
  { label: "Toán 12", href: "/lop-12/toan" },
  { label: "Văn 12", href: "/lop-12/van" },
  { label: "Toán 9", href: "/lop-9/toan" },
  { label: "Văn 9", href: "/lop-9/van" },
  { label: "Toán 11", href: "/lop-11/toan" },
  { label: "Văn 11", href: "/lop-11/van" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-white text-lg">Giải Bài Tập</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Lời giải bài tập SGK, SBT, soạn văn, đề thi tất cả các môn học từ lớp 1 đến lớp 12. Miễn phí, dễ hiểu.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://facebook.com/giaibaitap" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@giaibaitap" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-red-400 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="mailto:lienhe@giaibaitap.com.vn" aria-label="Email" className="text-gray-400 hover:text-green-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Theo lớp */}
          <div>
            <h3 className="font-semibold text-white mb-4">Theo Lớp</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {GRADES.map((g) => (
                <Link
                  key={g}
                  href={buildLopUrl(g)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Lớp {g}
                </Link>
              ))}
            </div>
          </div>

          {/* Môn phổ biến */}
          <div>
            <h3 className="font-semibold text-white mb-4">Môn Phổ Biến</h3>
            <ul className="space-y-2">
              {SUBJECT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/de-thi" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Đề thi tốt nghiệp
                </Link>
              </li>
            </ul>
          </div>

          {/* Pháp lý & Liên hệ */}
          <div>
            <h3 className="font-semibold text-white mb-4">Thông Tin</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} giaibaitap.com.vn — Tất cả quyền được bảo lưu.
          </p>
          <p className="text-xs text-gray-600">
            Nội dung chỉ mang tính tham khảo, không thay thế sách giáo khoa chính thức.
          </p>
        </div>
      </div>
    </footer>
  );
}
