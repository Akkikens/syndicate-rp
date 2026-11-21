import { routes } from "@/config/routes";
import { summaryFor } from "@/data/pages";
import { guides } from "@/data/guides";
import { news } from "@/data/news";
import type { SearchEntry } from "@/components/SearchBox";

// Built at render time on the server and handed to the client as plain data.
export function buildSearchIndex(): SearchEntry[] {
  const pages = routes.map((r) => ({
    href: r.href,
    title: r.href === "/" ? "GTA 6 Network home" : r.label,
    summary: summaryFor(r.href),
    tag: "Page",
  }));
  const stories = news.map((n) => ({
    href: `/news/${n.slug}`,
    title: n.title,
    summary: n.summary,
    tag: n.tag,
  }));
  const guidePages = guides.map((g) => ({
    href: g.path,
    title: g.title,
    summary: g.description,
    tag: "Guide",
  }));
  return [...pages, ...guidePages, ...stories];
}
