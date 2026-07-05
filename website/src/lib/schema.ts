import { site, isConfigured } from "@/config/site";
import { faqs } from "@/data/faq";
import { latestTrailer } from "@/data/trailers";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.domain,
  description:
    "GTA 6 countdown, news, trailers, characters, map, and FAQ — everything Grand Theft Auto VI in one place.",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.domain,
  logo: `${site.domain}/icon.svg`,
  // Placeholder URLs would read as invalid structured data — only ship real ones.
  sameAs: [site.youtube, site.twitter].filter(isConfigured),
};

export const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Grand Theft Auto VI",
  alternateName: ["GTA 6", "GTA VI"],
  description:
    "Jason and Lucia's story across the state of Leonida — the next entry in the Grand Theft Auto series.",
  gamePlatform: ["PlayStation 5", "Xbox Series X|S"],
  genre: ["Action", "Adventure", "Open World"],
  publisher: {
    "@type": "Organization",
    name: "Rockstar Games",
  },
  releaseDate: "2026-11-19",
  trailer: {
    "@type": "VideoObject",
    name: `Grand Theft Auto VI ${latestTrailer.name}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${latestTrailer.id}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${latestTrailer.id}/maxresdefault.jpg`,
    uploadDate: latestTrailer.date,
    description: latestTrailer.blurb,
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
