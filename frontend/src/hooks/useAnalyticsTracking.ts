import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyticsApi } from "@/lib/api";

const VISITOR_KEY = "bytecorner.analyticsVisitor";
const SESSION_KEY = "bytecorner.analyticsSession";

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
}

function visitorId() {
  let value = localStorage.getItem(VISITOR_KEY);
  if (!value) {
    value = id("visitor");
    localStorage.setItem(VISITOR_KEY, value);
  }
  return value;
}

function sessionId() {
  let value = sessionStorage.getItem(SESSION_KEY);
  if (!value) {
    value = id("session");
    sessionStorage.setItem(SESSION_KEY, value);
  }
  return value;
}

function basePayload() {
  return {
    sessionId: sessionId(),
    visitorId: visitorId(),
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer || "",
  };
}

export function useAnalyticsTracking() {
  const location = useLocation();

  useEffect(() => {
    analyticsApi.track({ type: "page_view", ...basePayload() }).catch(() => {});
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickable = target?.closest("a,button") as HTMLAnchorElement | HTMLButtonElement | null;
      if (!clickable) return;

      const href = clickable instanceof HTMLAnchorElement ? clickable.href : "";
      const text = (clickable.textContent || "").trim().slice(0, 160);
      const lower = `${href} ${text}`.toLowerCase();
      let eventType = "button_click";

      if (lower.includes("wa.me") || lower.includes("whatsapp")) eventType = "whatsapp_click";
      else if (lower.includes("contact") || lower.includes("hubungi") || lower.includes("konsultasi") || lower.includes("mulai proyek")) eventType = "cta_click";
      else if (lower.includes("view detail") || lower.includes("lihat detail")) eventType = "detail_click";
      else return;

      analyticsApi.track({
        type: "event",
        ...basePayload(),
        eventType,
        eventName: text || eventType,
        label: text,
        targetUrl: href,
      }).catch(() => {});
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const sent = new Set<number>();
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) return;
      const depth = Math.round((window.scrollY / height) * 100);
      const mark = depth >= 90 ? 90 : depth >= 50 ? 50 : 0;
      if (!mark || sent.has(mark)) return;
      sent.add(mark);
      analyticsApi.track({
        type: "event",
        ...basePayload(),
        eventType: "scroll_depth",
        eventName: `${mark}% scroll`,
        label: `${mark}%`,
        metadata: { depth: mark },
      }).catch(() => {});
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, location.search]);
}
