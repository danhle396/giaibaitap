"use client";

import { useRef, useEffect, useState } from "react";
import { AdSenseUnit } from "./AdSenseUnit";

export function InArticleAd({ slot }: { slot: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: "200px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-6 min-h-[250px]">
      {visible && <AdSenseUnit slot={slot} format="rectangle" className="min-h-[250px]" />}
    </div>
  );
}
