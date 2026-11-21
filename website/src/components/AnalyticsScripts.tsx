"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Site search keeps the query in the URL (?q=). Strip it before anything is
// reported so search terms never leave the browser.
function withoutQuery<T extends { url: string }>(event: T): T {
  try {
    const u = new URL(event.url);
    u.search = "";
    return { ...event, url: u.toString() };
  } catch {
    return event;
  }
}

export default function AnalyticsScripts() {
  return (
    <>
      <Analytics beforeSend={withoutQuery} />
      <SpeedInsights beforeSend={withoutQuery} />
    </>
  );
}
