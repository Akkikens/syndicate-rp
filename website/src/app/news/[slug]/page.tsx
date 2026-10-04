import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import { news, getNewsItem } from "@/data/news";
import { newsArticleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const item = getNewsItem((await params).slug);
  if (!item) return {};
  return pageMetadata({
    title: item.title,
    description: item.summary,
    path: `/news/${item.slug}`,
    type: "article",
    publishedTime: item.date,
    modifiedTime: item.date,
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const item = getNewsItem((await params).slug);
  if (!item) notFound();

  const more = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={newsArticleSchema(item)} />
      <Breadcrumbs
        items={[
          { href: "/news", label: "News" },
          { href: `/news/${item.slug}`, label: item.title },
        ]}
      />
      <div className="flex items-center gap-4">
        <span className="eyebrow">{item.tag}</span>
        <time dateTime={item.date} className="font-mono text-xs text-muted">
          {item.dateLabel}
        </time>
      </div>
      <h1 className="display mt-4 text-3xl leading-tight sm:text-5xl">
        {item.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-cream">{item.summary}</p>

      <div className="mt-8 flex flex-col gap-5 leading-relaxed text-muted">
        {item.body.map((para) => (
          <p key={para.slice(0, 40)}>{para}</p>
        ))}
      </div>

      {item.source && (
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Source:{" "}
          <a
            href={item.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:text-cream"
          >
            {item.source.label} ↗
          </a>
        </p>
      )}

      {item.related && item.related.length > 0 && (
        <nav
          aria-label="Related guides"
          className="neon-card mt-10 rounded-md p-6"
        >
          <p className="eyebrow">Keep reading</p>
          <ul className="mt-3 flex flex-col gap-2">
            {item.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-teal hover:text-cream">
                  {r.label} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <section className="mt-16 border-t border-line pt-12">
        <h2 className="display text-2xl">More GTA VI news</h2>
        <div className="mt-6 flex flex-col gap-6">
          {more.map((n) => (
            <NewsCard key={n.slug} item={n} />
          ))}
        </div>
      </section>
    </article>
  );
}
