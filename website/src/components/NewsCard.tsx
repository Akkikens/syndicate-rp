import type { NewsItem } from "@/data/news";

const tagColor: Record<NewsItem["tag"], string> = {
  Official: "text-teal border-teal/40",
  Trailer: "text-vice border-vice/40",
  Business: "text-sunset border-sunset/40",
  "Rumor Watch": "text-grape border-grape/40",
};

export default function NewsCard({ item }: { item: NewsItem }) {
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
      <h3 className="display mt-4 text-xl leading-tight sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
      {item.source && (
        <a
          href={item.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
        >
          Source: {item.source.label} ↗
        </a>
      )}
    </article>
  );
}
