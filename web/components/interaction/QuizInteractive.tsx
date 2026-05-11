"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StrapiTracNghiemQuestion } from "@/lib/strapi";

interface Props {
  questions: StrapiTracNghiemQuestion[];
}

export function QuizInteractive({ questions }: Props) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correct = submitted
    ? questions.filter((q, i) => selected[i] === q.dap_an_dung).length
    : 0;
  const total = questions.length;

  return (
    <>
      {submitted && (
        <div
          className={cn(
            "p-4 rounded-xl mb-8",
            correct >= total * 0.7
              ? "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-700"
              : "bg-orange-50 border border-orange-200 dark:bg-orange-900/20 dark:border-orange-700",
          )}
        >
          <p className="font-bold text-lg text-gray-900 dark:text-white">
            Kết quả: {correct}/{total} câu đúng (
            {Math.round((correct / total) * 10)} điểm)
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {correct === total
              ? "Xuất sắc! Bạn đã trả lời đúng tất cả câu."
              : "Xem lại các câu sai bên dưới nhé!"}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5"
          >
            <p className="font-medium text-gray-900 dark:text-white text-sm mb-4">
              <span className="text-blue-600 mr-2">Câu {i + 1}.</span>
              {q.cau_hoi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.dap_an.map((val, optIdx) => {
                const isSelected = selected[i] === optIdx;
                const isCorrect = optIdx === q.dap_an_dung;
                let cls =
                  "border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400";
                if (submitted) {
                  if (isCorrect)
                    cls =
                      "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
                  else if (isSelected && !isCorrect)
                    cls =
                      "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                } else if (isSelected) {
                  cls =
                    "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300";
                }
                const letter = String.fromCharCode(65 + optIdx);
                return (
                  <button
                    key={optIdx}
                    disabled={submitted}
                    onClick={() => setSelected((p) => ({ ...p, [i]: optIdx }))}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg text-sm text-left transition-colors",
                      cls,
                    )}
                  >
                    <span className="font-bold shrink-0">{letter}.</span>
                    <span>{val}</span>
                    {submitted && isCorrect && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto shrink-0" />
                    )}
                    {submitted && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-red-500 ml-auto shrink-0" />
                    )}
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
          disabled={Object.keys(selected).length < total}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2"
        >
          Nộp bài <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
