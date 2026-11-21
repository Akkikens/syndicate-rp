import { site, isConfigured } from "@/config/site";
import { faqs } from "@/data/faq";
import { latestTrailer, type Trailer } from "@/data/trailers";
import type { NewsItem } from "@/data/news";
import { absoluteUrl } from "@/lib/seo";
import { modifiedDate } from "@/lib/news";

const organizationRef = { "@id": `${site.domain}/#organization` };

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.domain}/#website`,
  name: site.name,
  alternateName: ["GTA6Network", "gta6network.org"],
  url: site.domain,
  inLanguage: "en-US",
  publisher: organizationRef,
  description:
    "GTA 6 news, PS5 guide, trailers, characters, map, and FAQ — everything Grand Theft Auto VI in one place.",
  // Sitelinks search box; /search reads ?q= and filters in the browser.
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.domain}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.domain}/#organization`,
  name: site.name,
  url: site.domain,
  publishingPrinciples: `${site.domain}/editorial-policy`,
  // Google wants a raster logo of at least 112px — served by app/apple-icon.tsx.
  logo: {
    "@type": "ImageObject",
    url: `${site.domain}/apple-icon`,
    width: 180,
    height: 180,
  },
  // Placeholder URLs would read as invalid structured data — only ship real ones.
  sameAs: [site.youtube, site.twitter, site.discord].filter(isConfigured),
};

export function videoObjectSchema(t: Trailer) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `Grand Theft Auto VI — ${t.name}`,
    description: t.blurb,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${t.id}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`,
    ],
    uploadDate: `${t.date}T00:00:00-04:00`,
    duration: t.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${t.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${t.id}`,
    publisher: { "@type": "Organization", name: "Rockstar Games" },
  };
}

export const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Grand Theft Auto VI",
  alternateName: ["GTA 6", "GTA VI"],
  url: absoluteUrl("/game"),
  image: `https://i.ytimg.com/vi/${latestTrailer.id}/maxresdefault.jpg`,
  description:
    "Jason and Lucia's story across the state of Leonida — the next entry in the Grand Theft Auto series, set in a modern-day Vice City.",
  gamePlatform: ["PlayStation 5", "Xbox Series X|S"],
  operatingSystem: ["PlayStation 5", "Xbox Series X|S"],
  applicationCategory: "Game",
  genre: ["Action", "Adventure", "Open World"],
  playMode: "SinglePlayer",
  author: { "@type": "Organization", name: "Rockstar Games" },
  publisher: { "@type": "Organization", name: "Rockstar Games" },
  datePublished: "2026-11-19",
  offers: [
    {
      "@type": "Offer",
      name: "Standard Edition",
      price: "79.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.rockstargames.com/VI",
    },
    {
      "@type": "Offer",
      name: "Ultimate Edition",
      price: "99.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.rockstargames.com/VI",
    },
  ],
  trailer: videoObjectSchema(latestTrailer),
};

export function faqSchema(items = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { href: string; label: string }[]) {
  const trail = [{ href: "/", label: "Home" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function newsArticleSchema(item: NewsItem) {
  const url = absoluteUrl(`/news/${item.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary,
    url,
    mainEntityOfPage: url,
    image: [`${url}/opengraph-image`],
    datePublished: item.date,
    dateModified: modifiedDate(item),
    author: { "@type": "Organization", name: site.name, url: site.domain },
    publisher: organizationRef,
    about: { "@type": "VideoGame", name: "Grand Theft Auto VI" },
    ...(item.source && { isBasedOn: item.source.url }),
  };
}

// For evergreen guide pages: tells crawlers when the facts were last checked.
export function webPageSchema(
  path: string,
  name: string,
  description: string,
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" = "WebPage",
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${site.domain}/#website` },
    dateModified: site.lastUpdated,
    inLanguage: "en-US",
  };
}

// Ordered list of stories, for the news index and tag pages.
export function newsListSchema(items: NewsItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/news/${n.slug}`),
      name: n.title,
    })),
  };
}
