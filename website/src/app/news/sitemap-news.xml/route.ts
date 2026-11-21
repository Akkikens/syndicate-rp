import { site } from "@/config/site";
import { news } from "@/data/news";
import { absoluteUrl } from "@/lib/seo";

// Regenerated at most every 15 minutes so the 48-hour window keeps moving
// between deploys.
export const revalidate = 900;

const WINDOW_MS = 48 * 60 * 60 * 1000;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Google News sitemap: only articles published in the last 48 hours.
// Story dates carry no time of day, so each counts from 00:00 UTC.
export function GET() {
  const cutoff = Date.now() - WINDOW_MS;
  const recent = news.filter((n) => Date.parse(`${n.date}T00:00:00Z`) >= cutoff);

  const entries = recent
    .map(
      (n) => `  <url>
    <loc>${absoluteUrl(`/news/${n.slug}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(site.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${n.date}</news:publication_date>
      <news:title>${esc(n.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
