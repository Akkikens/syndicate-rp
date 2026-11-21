import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { news } from "@/data/news";
import { trailers } from "@/data/trailers";
import { absoluteUrl } from "@/lib/seo";

// Pages whose facts move with the news cycle get the site-wide lastUpdated;
// the rest only change on redesigns.
const evergreen = new Set(["/premium", "/gta-v", "/mods"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: absoluteUrl(r.href),
    lastModified: evergreen.has(r.href) ? undefined : site.lastUpdated,
    changeFrequency: r.changeFrequency ?? "weekly",
    priority:
      r.href === "/" ? 1 : r.href === "/release-date" || r.href === "/news" || r.href === "/ps5" ? 0.9 : 0.7,
    ...(r.href === "/trailers" && {
      videos: trailers.map((t) => ({
        title: `Grand Theft Auto VI — ${t.name}`,
        thumbnail_loc: `https://i.ytimg.com/vi/${t.id}/maxresdefault.jpg`,
        description: t.blurb,
        player_loc: `https://www.youtube-nocookie.com/embed/${t.id}`,
        publication_date: t.date,
      })),
    }),
  }));

  const articles: MetadataRoute.Sitemap = news.map((n) => ({
    url: absoluteUrl(`/news/${n.slug}`),
    lastModified: n.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
