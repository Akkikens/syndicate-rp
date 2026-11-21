import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import {
  newsByTag,
  newsTags,
  tagFromSlug,
  tagPath,
  tagSlug,
  type NewsTag,
} from "@/lib/news";
import { newsListSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return newsTags.map((t) => ({ tag: tagSlug(t) }));
}

// Page copy per tag. Describes the label, makes no claims about the game.
const copy: Record<NewsTag, { title: string; description: string; intro: string }> = {
  Official: {
    title: "Official GTA 6 News: Rockstar & Take-Two Updates",
    description:
      "Every GTA 6 story based on an official Rockstar Games or Take-Two announcement, each linked to its source. Newest first, and no rumors in this list.",
    intro:
      "Stories built on what Rockstar Games or Take-Two have said themselves.",
  },
  Trailer: {
    title: "GTA 6 Trailer News: Every Trailer Story",
    description:
      "GTA 6 stories about trailers and video drops, newest first, each linked to its source. See also our trailers page for every video in one place.",
    intro: "Stories about trailers and other video releases.",
  },
  Business: {
    title: "GTA 6 Business News: Sales, Pricing & Earnings",
    description:
      "GTA 6 stories about sales, pricing and the business around the launch, newest first, with the source linked on each one and estimates labeled as estimates.",
    intro: "Stories about sales, pricing and the business side of the launch.",
  },
  "Rumor Watch": {
    title: "GTA 6 Rumors: What's Confirmed and What Isn't",
    description:
      "GTA 6 rumors and unconfirmed claims, labeled as such and checked against what Rockstar has said. Newest first, with the source linked on every story.",
    intro:
      "Claims that are not confirmed by Rockstar. Each story says what is and isn't verified.",
  },
};

export async function generateMetadata({ params }: Props) {
  const tag = tagFromSlug((await params).tag);
  if (!tag) return {};
  const meta = pageMetadata({
    title: copy[tag].title,
    description: copy[tag].description,
    path: tagPath(tag),
  });
  // A tag with no stories is a thin page: keep it out of the index.
  return newsByTag(tag).length === 0
    ? { ...meta, robots: { index: false, follow: true } }
    : meta;
}

export default async function NewsTagPage({ params }: Props) {
  const tag = tagFromSlug((await params).tag);
  if (!tag) notFound();
  const items = newsByTag(tag);
  const path = tagPath(tag);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <JsonLd
        data={webPageSchema(path, copy[tag].title, copy[tag].description, "CollectionPage")}
      />
      <JsonLd data={newsListSchema(items)} />
      <Breadcrumbs
        items={[
          { href: "/news", label: "News" },
          { href: path, label: tag },
        ]}
      />
      <p className="eyebrow">GTA 6 News · {tag}</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">{copy[tag].title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{copy[tag].intro}</p>

      <nav aria-label="News topics" className="mt-6 flex flex-wrap gap-2">
        {newsTags.map((t) => (
          <Link
            key={t}
            href={tagPath(t)}
            aria-current={t === tag ? "page" : undefined}
            className={`rounded-full border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] hover:text-cream ${
              t === tag ? "border-teal text-cream" : "border-line text-muted"
            }`}
          >
            {t}
          </Link>
        ))}
      </nav>

      {items.length === 0 ? (
        <p className="mt-10 text-muted">
          No stories with this tag yet. See{" "}
          <Link href="/news" className="text-teal hover:text-cream">
            all GTA 6 news
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 flex flex-col gap-6">
          {items.map((item) => (
            <NewsCard key={item.slug} item={item} as="h2" />
          ))}
        </div>
      )}

      <p className="mt-12">
        <Link
          href="/news"
          className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
        >
          ← All GTA 6 news
        </Link>
      </p>
    </div>
  );
}
