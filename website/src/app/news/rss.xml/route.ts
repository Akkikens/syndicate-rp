import { site } from "@/config/site";
import { news } from "@/data/news";

export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// RSS feed for aggregators, readers, and faster discovery of new stories.
export function GET() {
  const items = news
    .map((n) => {
      const url = `${site.domain}/news/${n.slug}`;
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${n.date}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(n.tag)}</category>
      <description>${esc(n.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — GTA VI News</title>
    <link>${site.domain}/news</link>
    <atom:link href="${site.domain}/news/rss.xml" rel="self" type="application/rss+xml" />
    <description>Sourced Grand Theft Auto VI news: release date, trailers, pre-orders, and more.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${news[0].date}T12:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
