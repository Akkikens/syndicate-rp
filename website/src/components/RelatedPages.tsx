import Link from "next/link";
import { groupOf, routes } from "@/config/routes";
import { relatedMap, summaryFor } from "@/data/pages";

// Foot-of-page links so no evergreen page is a dead end. Uses the curated
// list when there is one, otherwise siblings in the same footer group, then
// the main hubs.
export default function RelatedPages({ current }: { current: string }) {
  const known = new Set(routes.map((r) => r.href));
  const me = routes.find((r) => r.href === current);
  const picks = (relatedMap[current] ?? []).filter((h) => known.has(h));
  const siblings = me
    ? routes
        .filter((r) => r.href !== current && groupOf(r) === groupOf(me))
        .map((r) => r.href)
    : [];
  const hubs = ["/news", "/ps5", "/faq", "/release-date"];
  const hrefs = [...new Set([...picks, ...siblings, ...hubs])]
    .filter((h) => h !== current && known.has(h))
    .slice(0, 4);

  return (
    <nav aria-labelledby="related-pages-heading" className="mt-20">
      <h2
        id="related-pages-heading"
        className="eyebrow border-t border-line pt-8"
      >
        Related pages
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {hrefs.map((href) => {
          const label = routes.find((r) => r.href === href)?.label ?? href;
          return (
            <li key={href}>
              <Link href={href} className="neon-card block rounded-md p-5">
                <span className="display text-lg">{label} →</span>
                <span className="mt-1 block text-sm text-muted">
                  {summaryFor(href)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
