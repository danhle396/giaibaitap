"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

interface MathRendererProps {
  expression: string;
  inline?: boolean;
}

export function MathRenderer({ expression, inline = false }: MathRendererProps) {
  if (inline) {
    return <InlineMath math={expression} />;
  }
  return (
    <div className="overflow-x-auto my-3">
      <BlockMath math={expression} />
    </div>
  );
}
