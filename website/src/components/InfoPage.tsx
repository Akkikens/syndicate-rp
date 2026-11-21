import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CommunityCta from "@/components/CommunityCta";
import JsonLd from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { site } from "@/config/site";
import type { Badge, InfoPageData } from "@/data/page-types";
import { faqSchema, webPageSchema } from "@/lib/schema";

const linkClass =
  "font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream";

const badgeClass: Record<Badge, string> = {
  Confirmed: "text-teal",
  "Not confirmed": "text-grape",
  Reported: "text-sunset",
  Precedent: "text-vice",
};

// Template for the sourced evergreen landing pages. Mirrors /ps5: breadcrumbs,
// updated stamp, blocks of confirmed vs not-confirmed facts, a FAQ with
// FAQPage JSON-LD, a source list, and onward links.
export default function InfoPage({
  data,
  cta,
  extra,
  crumbs,
}: {
  data: InfoPageData;
  cta?: { eyebrow: string; title: string; body: string };
  extra?: React.ReactNode; // rendered after the blocks (e.g. guide JSON-LD)
  crumbs?: { href: string; label: string }[];
}) {
  const [plain, accent] = data.h1;
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema(data.path, data.title, data.description)} />
      <JsonLd data={faqSchema(data.faq)} />
      <Breadcrumbs
        items={crumbs ?? [{ href: data.path, label: data.crumb }]}
      />
      <p className="eyebrow">Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        {plain} <span className="sunset-text">{accent}</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {data.lede}
      </p>

      {data.blocks.map((b) => (
        <section key={b.title} className="mt-14">
          {b.eyebrow && <p className="eyebrow">{b.eyebrow}</p>}
          <h2 className="display mt-3 text-3xl">{b.title}</h2>
          {b.intro && (
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              {b.intro}
            </p>
          )}
          {b.steps && (
            <ol className="mt-6 flex max-w-2xl list-decimal flex-col gap-3 pl-5 leading-relaxed text-muted marker:font-mono marker:text-teal">
              {b.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          )}
          {b.cards && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {b.cards.map((c) => (
                <div key={c.title} className="neon-card rounded-md p-6">
                  <h3 className="display text-lg text-cream">
                    {c.title}
                    {c.badge && (
                      <span
                        className={`ml-3 font-mono text-xs uppercase tracking-[0.14em] ${badgeClass[c.badge]}`}
                      >
                        {c.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          )}
          {b.bullets && (
            <ul className="mt-6 flex max-w-2xl flex-col gap-3">
              {b.bullets.map((line) => (
                <li
                  key={line}
                  className="flex gap-2 leading-relaxed text-muted"
                >
                  <span className="text-teal" aria-hidden="true">
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          )}
          {b.table && (
            <div className="neon-card mt-6 overflow-x-auto rounded-md">
              <table className="w-full text-left text-sm">
                <thead className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-teal">
                  <tr>
                    {b.table.head.map((h) => (
                      <th key={h} scope="col" className="p-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {b.table.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-line">
                      {r.map((cell, i) =>
                        i === 0 ? (
                          <th
                            key={cell}
                            scope="row"
                            className="p-4 text-left font-normal text-cream"
                          >
                            {cell}
                          </th>
                        ) : (
                          <td key={cell} className="p-4">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {b.note && (
            <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-muted">
              {b.note}
            </p>
          )}
        </section>
      ))}

      {extra}
      {cta && <CommunityCta {...cta} />}

      <section className="mt-16">
        <p className="eyebrow">FAQ</p>
        <h2 className="display mt-3 text-3xl">Quick answers</h2>
        <div className="mt-8 flex flex-col gap-3">
          {data.faq.map((f) => (
            <details key={f.q} className="neon-card group rounded-md">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-vice transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Sources</p>
        <h2 className="display mt-3 text-2xl">Pages we read for this</h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
          {data.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-cream"
              >
                {s.label} ↗
              </a>
              {s.note && <span> — {s.note}</span>}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs text-muted">
          Checked {site.lastUpdatedLabel}. Pages change; check the store or
          Rockstar page before you pay.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap gap-6">
        {data.links.map((l) => (
          <Link key={l.href} href={l.href} className={linkClass}>
            {l.label} →
          </Link>
        ))}
      </div>
      <RelatedPages current={data.path} />
    </div>
  );
}
