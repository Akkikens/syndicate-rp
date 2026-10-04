import Breadcrumbs from "@/components/Breadcrumbs";
import NewsCard from "@/components/NewsCard";
import { news } from "@/data/news";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "GTA 6 News: Latest Grand Theft Auto VI Updates",
    description:
      "Every confirmed GTA 6 update in one place: pre-orders, price, the Extended Look, release date news, and what's next before November 19. Sourced, no clickbait.",
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
      <div className="mt-10 flex flex-col gap-6">
        {news.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
