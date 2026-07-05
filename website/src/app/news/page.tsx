import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "GTA VI News",
  description:
    "Every confirmed GTA VI update in one place — release date changes, trailer drops, and what to watch next. No clickbait, sources on everything.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="eyebrow">News</p>
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
