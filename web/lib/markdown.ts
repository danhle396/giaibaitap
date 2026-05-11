import { Marked } from "marked";
import markedKatex from "marked-katex-extension";

const marked = new Marked();
marked.use(
  markedKatex({
    throwOnError: false,
    nonStandard: true,
  }),
);

export function renderMarkdown(source: string): string {
  return marked.parse(source, { gfm: true, breaks: false }) as string;
}
