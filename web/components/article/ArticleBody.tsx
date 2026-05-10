import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  content: string;
  className?: string;
}

export function ArticleBody({ content, className }: ArticleBodyProps) {
  return (
    <div
      className={cn(
        "article-body prose prose-gray dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white",
        "prose-h2:text-xl prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2 prose-h2:mt-8",
        "prose-h3:text-lg prose-h3:mt-6",
        "prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-table:text-sm prose-table:border prose-table:border-collapse",
        "prose-th:bg-blue-50 dark:prose-th:bg-gray-700 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-3 prose-th:py-2",
        "prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:px-3 prose-td:py-2",
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-gray-800 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg",
        "prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
        "prose-li:text-gray-700 dark:prose-li:text-gray-300",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
