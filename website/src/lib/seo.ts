import type { Metadata } from "next";
import { site } from "@/config/site";

// Per-page metadata with matching Open Graph / Twitter tags. Without this,
// child pages inherit the home page's og:title and og:url from the root
// layout, so every shared link previews as the home page.
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "GTA 6 Network — Everything Grand Theft Auto VI",
};

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
  // Keyword-first titles already run long; only append the brand when the
  // result still fits in a search snippet (~60 chars).
  const branded = `${title} — ${site.name}`;
  const fullTitle = branded.length <= 60 ? branded : title;
  return {
    title: { absolute: fullTitle },
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
      // Overriding openGraph drops the inherited file-based image, so point
      // back at the site card. Routes with their own opengraph-image
      // (news articles) still take precedence.
      ...(type === "website" && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(type === "website" && { images: [ogImage.url] }),
    },
  };
}

export const absoluteUrl = (path: string) =>
  `${site.domain}${path === "/" ? "" : path}`;
