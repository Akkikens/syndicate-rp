import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found — GTA 6 Network" },
  robots: { index: false, follow: true },
};

const top = [
  { href: "/news", label: "Latest GTA 6 news" },
  { href: "/ps5", label: "GTA 6 on PS5" },
  { href: "/release-date", label: "Release date & launch" },
  { href: "/pre-order", label: "Price & editions" },
  { href: "/faq", label: "FAQ" },
  { href: "/trailers", label: "Trailers" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        Page <span className="sunset-text">not found</span>
      </h1>
      <p className="mt-4 text-lg text-muted">
        That page doesn&apos;t exist or has moved. Search the site, or jump to
        one of the main pages.
      </p>

      {/* Plain GET form: works without JavaScript and lands on /search?q= */}
      <form role="search" action="/search" method="get" className="mt-8 flex gap-3">
        <label htmlFor="nf-search" className="sr-only">
          Search GTA 6 Network
        </label>
        <input
          id="nf-search"
          name="q"
          type="search"
          placeholder="Search the site…"
          className="min-w-0 flex-1 rounded-md border border-line bg-panel px-4 py-3 text-cream placeholder:text-muted"
        />
        <button type="submit" className="btn btn-vice">
          Search
        </button>
      </form>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {top.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="neon-card block rounded-md p-4">
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
