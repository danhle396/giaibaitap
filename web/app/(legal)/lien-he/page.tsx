import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Mail, Globe } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Liên Hệ | Giải Bài Tập",
  description: "Liên hệ với đội ngũ Giải Bài Tập qua email hoặc Facebook.",
  canonical: "/lien-he",
});

export default function LienHePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumb items={[{ label: "Liên Hệ", href: "/lien-he" }]} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-4">Liên Hệ</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Có câu hỏi, góp ý hoặc muốn hợp tác? Liên hệ với chúng tôi qua các kênh bên dưới.
      </p>

      <div className="space-y-4">
        <a
          href="mailto:lienhe@giaibaitap.com.vn"
          className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 transition-colors"
        >
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Email</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">lienhe@giaibaitap.com.vn</p>
          </div>
        </a>

        <a
          href="https://facebook.com/giaibaitap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 transition-colors"
        >
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Facebook Page</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">facebook.com/giaibaitap</p>
          </div>
        </a>
      </div>

      <div className="mt-10 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl text-sm text-yellow-800 dark:text-yellow-300">
        <strong>Thời gian phản hồi:</strong> Chúng tôi sẽ phản hồi trong vòng 24-48 giờ trong ngày làm việc.
      </div>
    </div>
  );
}
