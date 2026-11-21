import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import { news } from "@/data/news";
import { newsTags, tagPath } from "@/lib/news";
import { newsListSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "GTA 6 News: Latest Grand Theft Auto VI Updates",
    description:
      "Every confirmed GTA 6 update in one place: the launch, first-day sales, PC status, price, the Extended Look, and release date news. Sourced, no clickbait.",
    path: "/news",
  }),
  alternates: {
    canonical: "/news",
    types: { "application/rss+xml": "/news/rss.xml" },
  },
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <JsonLd data={newsListSchema(news)} />
      <Breadcrumbs items={[{ href: "/news", label: "News" }]} />
      <p className="eyebrow">GTA 6 News</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Every update, <span className="sunset-text">sourced</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        The full GTA VI timeline — official announcements, trailer drops, and
        what the industry is reporting. We link a source on everything; rumors
        are labeled as rumors.
      </p>
      <nav aria-label="News topics" className="mt-6 flex flex-wrap gap-2">
        {newsTags.map((t) => (
          <Link
            key={t}
            href={tagPath(t)}
            className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted hover:border-teal hover:text-cream"
          >
            {t}
          </Link>
        ))}
      </nav>
      <div className="mt-10 flex flex-col gap-6">
        {news.map((item) => (
          <NewsCard key={item.slug} item={item} as="h2" />
        ))}
      </div>
    </div>
  );
}
