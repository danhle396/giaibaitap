"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MOCK_QUIZ } from "@/lib/mock-data";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Answer = "A" | "B" | "C" | "D";

export default function TracNghiemDetailPage() {
  const [selected, setSelected] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const quiz = MOCK_QUIZ;
  const correct = submitted
    ? quiz.filter((q) => selected[q.id] === q.dap_an[0]).length
    : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb items={[
        { label: "Trắc Nghiệm", href: "/trac-nghiem" },
        { label: "Toán 12 — Tính đơn điệu", href: "#" },
      ]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
        Trắc Nghiệm: Tính đơn điệu hàm số
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Toán 12 • {quiz.length} câu hỏi</p>

      {submitted && (
        <div className={`p-4 rounded-xl mb-8 ${correct >= quiz.length * 0.7 ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
          <p className="font-bold text-lg">
            Kết quả: {correct}/{quiz.length} câu đúng ({Math.round(correct / quiz.length * 10)} điểm)
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {correct === quiz.length ? "Xuất sắc! Bạn đã trả lời đúng tất cả câu." : "Xem lại các câu sai bên dưới nhé!"}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {quiz.map((q, i) => (
          <div key={q.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <p className="font-medium text-gray-900 dark:text-white text-sm mb-4">
              <span className="text-blue-600 mr-2">Câu {i + 1}.</span>
              {q.cau_hoi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.entries(q.lua_chon) as [Answer, string][]).map(([key, val]) => {
                const isSelected = selected[q.id] === key;
                const isCorrect = key === q.dap_an[0];
                let cls = "border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400";
                if (submitted) {
                  if (isCorrect) cls = "border-green-500 bg-green-50 text-green-800";
                  else if (isSelected && !isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
                } else if (isSelected) {
                  cls = "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300";
                }
                return (
                  <button
                    key={key}
                    disabled={submitted}
                    onClick={() => setSelected((p) => ({ ...p, [q.id]: key }))}
                    className={cn("flex items-center gap-2 p-3 rounded-lg text-sm text-left transition-colors", cls)}
                  >
                    <span className="font-bold shrink-0">{key}.</span>
                    <span>{val}</span>
                    {submitted && isCorrect && <CheckCircle className="h-4 w-4 text-green-500 ml-auto shrink-0" />}
                    {submitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>

            {submitted && q.giai_thich && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-xs text-blue-800 dark:text-blue-200">
                <strong>Giải thích:</strong> {q.giai_thich}
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(selected).length < quiz.length}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2"
        >
          Nộp bài <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
