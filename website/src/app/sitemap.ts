import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { guides } from "@/data/guides";
import { news } from "@/data/news";
import { trailers } from "@/data/trailers";
import { newsByTag, newsTags, modifiedDate, tagPath } from "@/lib/news";
import { absoluteUrl } from "@/lib/seo";

// Pages whose facts move with the news cycle get the site-wide lastUpdated;
// the rest only change on redesigns.
const evergreen = new Set([
  "/premium",
  "/gta-v",
  "/mods",
  "/about",
  "/editorial-policy",
  "/contact",
  "/privacy",
]);

// New search-demand landing pages.
const landing = new Set([
  "/xbox",
  "/online",
  "/60fps",
  "/system-requirements",
  "/roleplay",
  "/gta-plus",
  "/guides",
  "/crew",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: absoluteUrl(r.href),
    lastModified: evergreen.has(r.href) ? undefined : site.lastUpdated,
    changeFrequency: r.changeFrequency ?? "weekly",
    priority:
      r.href === "/" ? 1 : r.href === "/release-date" || r.href === "/news" || r.href === "/ps5" ? 0.9 : landing.has(r.href) ? 0.8 : 0.7,
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
    lastModified: modifiedDate(n),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Tag pages with no stories are noindex, so they stay out of the sitemap.
  const tagPages: MetadataRoute.Sitemap = newsTags
    .filter((t) => newsByTag(t).length > 0)
    .map((t) => ({
      url: absoluteUrl(tagPath(t)),
      lastModified: newsByTag(t).map(modifiedDate).sort().at(-1),
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: absoluteUrl(g.path),
    lastModified: site.lastUpdated,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...pages, ...guidePages, ...tagPages, ...articles];
}
