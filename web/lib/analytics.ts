"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackPageView(url: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("config", process.env.NEXT_PUBLIC_GA4_ID || "", {
    page_path: url,
  });
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function GA4_ID() {
  return process.env.NEXT_PUBLIC_GA4_ID || "";
}

export function CLARITY_ID() {
  return process.env.NEXT_PUBLIC_CLARITY_ID || "";
}
