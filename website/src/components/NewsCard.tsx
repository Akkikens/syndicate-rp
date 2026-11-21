import Link from "next/link";
import type { NewsItem } from "@/data/news";

const tagColor: Record<NewsItem["tag"], string> = {
  Official: "text-teal border-teal/40",
  Trailer: "text-vice border-vice/40",
  Business: "text-sunset border-sunset/40",
  "Rumor Watch": "text-grape-text border-grape/40",
};

// `as` lets list pages directly under the h1 use h2 so heading levels don't skip.
export default function NewsCard({
  item,
  as: Heading = "h3",
}: {
  item: NewsItem;
  as?: "h2" | "h3";
}) {
  return (
    <article className="neon-card rounded-md p-6">
      <div className="flex items-center justify-between gap-4">
        <span
          className={`rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] ${tagColor[item.tag]}`}
        >
          {item.tag}
        </span>
        <time dateTime={item.date} className="font-mono text-xs text-muted">
          {item.dateLabel}
        </time>
      </div>
      <Heading className="display mt-4 text-xl leading-tight sm:text-2xl">
        <Link href={`/news/${item.slug}`} className="hover:text-vice">
          {item.title}
        </Link>
      </Heading>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
      <Link
        href={`/news/${item.slug}`}
        className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
      >
        Read the story →
      </Link>
    </article>
  );
}
