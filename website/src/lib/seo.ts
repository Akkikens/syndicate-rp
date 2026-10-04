import type { Metadata } from "next";
import { site } from "@/config/site";

// Per-page metadata with matching Open Graph / Twitter tags. Without this,
// child pages inherit the home page's og:title and og:url from the root
// layout, so every shared link previews as the home page.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type,
      ...(type === "article" && { publishedTime, modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const absoluteUrl = (path: string) =>
  `${site.domain}${path === "/" ? "" : path}`;
