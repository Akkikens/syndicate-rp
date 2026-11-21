"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export type SearchEntry = {
  href: string;
  title: string;
  summary: string;
  tag: string; // "Page" or a news tag
};

// Every term must appear somewhere; title hits outrank tag and summary hits.
function search(index: SearchEntry[], query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return index
    .map((e) => {
      const title = e.title.toLowerCase();
      const tag = e.tag.toLowerCase();
      const summary = e.summary.toLowerCase();
      let score = 0;
      for (const t of terms) {
        const s =
          (title.includes(t) ? 3 : 0) +
          (tag.includes(t) ? 2 : 0) +
          (summary.includes(t) ? 1 : 0);
        if (s === 0) return { e, score: 0 };
        score += s;
      }
      return { e, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.e);
}

// Runs entirely in the browser over an index built at build time. The query
// lives in the URL (?q=) so results can be linked, but is never sent anywhere.
export default function SearchBox({
  index,
  autoFocus = false,
}: {
  index: SearchEntry[];
  autoFocus?: boolean;
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const results = useMemo(() => search(index, query), [index, query]);
  const trimmed = query.trim();

  function onChange(value: string) {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }

  return (
    <div>
      <form role="search" action="/search" onSubmit={(e) => e.preventDefault()}>
        <label
          htmlFor="site-search"
          className="font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          Search GTA 6 Network
        </label>
        <input
          id="site-search"
          name="q"
          type="search"
          value={query}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder="Try PS5, price, trailer…"
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-md border border-line bg-panel px-4 py-3 text-cream placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        />
      </form>

      <p role="status" className="mt-4 font-mono text-xs text-muted">
        {!trimmed
          ? "Type to search pages and news."
          : results.length === 0
            ? `No results for “${trimmed}”.`
            : `${results.length} result${results.length === 1 ? "" : "s"} for “${trimmed}”.`}
      </p>

      {trimmed && results.length === 0 && (
        <p className="mt-4 text-muted">
          Try a shorter word, or browse{" "}
          <Link href="/news" className="text-teal hover:text-cream">
            all news
          </Link>{" "}
          or the{" "}
          <Link href="/faq" className="text-teal hover:text-cream">
            FAQ
          </Link>
          .
        </p>
      )}

      <ul className="mt-6 flex flex-col gap-4">
        {results.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="neon-card block rounded-md p-5">
              <span className="eyebrow">{r.tag}</span>
              <span className="display mt-2 block text-xl leading-tight">
                {r.title}
              </span>
              <span className="mt-2 block text-sm text-muted">{r.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
