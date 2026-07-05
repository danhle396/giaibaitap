"use client";

import { useEffect } from "react";
import { trackEvent } from "./analytics";

/**
 * Track engagement metrics on an article page:
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Time on page (30s, 60s, 180s)
 *
 * Each event fires at most once per page mount. Use in the bài giải page.
 */
export function useTrackEngagement(label: string) {
  useEffect(() => {
    const fired = new Set<string>();

    function fire(name: string, value?: number) {
      if (fired.has(name)) return;
      fired.add(name);
      trackEvent(name, "engagement", label, value);
    }

    // ── Scroll depth ────────────────────────────────────────
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const winH = window.innerHeight || doc.clientHeight;
      const docH = doc.scrollHeight;
      const scrollable = docH - winH;
      if (scrollable <= 0) return;
      const pct = (scrollTop / scrollable) * 100;
      if (pct >= 25) fire("scroll_25", 25);
      if (pct >= 50) fire("scroll_50", 50);
      if (pct >= 75) fire("scroll_75", 75);
      if (pct >= 95) fire("scroll_100", 100);
    }

    // ── Time on page ────────────────────────────────────────
    const t30 = window.setTimeout(() => fire("time_30s", 30), 30_000);
    const t60 = window.setTimeout(() => fire("time_60s", 60), 60_000);
    const t180 = window.setTimeout(() => fire("time_180s", 180), 180_000);

    // ── Outbound click detection ───────────────────────────
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href) return;
      // Ignore internal, mailto, tel, anchor
      if (href.startsWith("#") || href.startsWith("/") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      try {
        const url = new URL(href, window.location.origin);
        if (url.host === window.location.host) return;
        trackEvent("outbound_click", "affiliate", `${url.host}${url.pathname}`);
      } catch {
        // ignore
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    // Initial check (in case content is short and no scroll needed)
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      window.clearTimeout(t30);
      window.clearTimeout(t60);
      window.clearTimeout(t180);
    };
  }, [label]);
}
