import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.domain}${r.href === "/" ? "" : r.href}`,
    changeFrequency: r.changeFrequency ?? "weekly",
    priority: r.href === "/" ? 1 : 0.8,
  }));
}
