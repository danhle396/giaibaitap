"use client";

import { useTrackEngagement } from "@/lib/useTrackEngagement";

/**
 * Client component wrapper: fires GA4 engagement events for the article page.
 * Use inside async server components (page.tsx) — pass slug or an identifier
 * that will appear as event_label in GA4.
 */
export function ArticleTracker({ label }: { label: string }) {
  useTrackEngagement(label);
  return null;
}
