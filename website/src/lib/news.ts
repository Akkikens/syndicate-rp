import { news, type NewsItem } from "@/data/news";

export type NewsTag = NewsItem["tag"];

// Every tag in the NewsItem union, in the order the tag chips are shown.
export const newsTags: NewsTag[] = [
  "Official",
  "Trailer",
  "Business",
  "Rumor Watch",
];

export const tagSlug = (tag: NewsTag) => tag.toLowerCase().replace(/\s+/g, "-");

export const tagFromSlug = (slug: string) =>
  newsTags.find((t) => tagSlug(t) === slug);

export const tagPath = (tag: NewsTag) => `/news/tag/${tagSlug(tag)}`;

export const newsByTag = (tag: NewsTag) => news.filter((n) => n.tag === tag);

const WORDS_PER_MINUTE = 220;

export function readingMinutes(item: NewsItem) {
  const words = [item.summary, ...item.body].join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export const modifiedDate = (item: NewsItem) => item.updated ?? item.date;

export function formatIsoDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// `news` is newest first, so the previous index is the newer story.
export function neighbours(slug: string) {
  const i = news.findIndex((n) => n.slug === slug);
  return {
    newer: i > 0 ? news[i - 1] : undefined,
    older: i >= 0 && i < news.length - 1 ? news[i + 1] : undefined,
  };
}

// Stories sharing the item's tag first, then the newest of the rest.
export function moreLikeThis(item: NewsItem, count = 3) {
  const others = news.filter((n) => n.slug !== item.slug);
  const same = others.filter((n) => n.tag === item.tag);
  const rest = others.filter((n) => n.tag !== item.tag);
  return [...same, ...rest].slice(0, count);
}
