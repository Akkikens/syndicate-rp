import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 Price & Editions: $79.99 / $99.99 Explained";
const description =
  "GTA 6 costs $79.99 (Standard) or $99.99 (Ultimate). What the Ultimate Edition adds, the Vintage Vice City Pack pre-order bonus, why there's no disc, and where to pre-order.";

export const metadata = pageMetadata({ title, description, path: "/pre-order" });

const editions = [
  {
    name: "Standard Edition",
    usd: "$79.99",
    intl: "£69.99 · €79.99",
    perks: ["Grand Theft Auto VI", "Pre-order bonus: Vintage Vice City Pack", "1 month of GTA+"],
  },
  {
    name: "Ultimate Edition",
    usd: "$99.99",
    intl: "£89.99 · €99.99",
    perks: [
      "Grand Theft Auto VI",
      "Extra clothing, hairstyles, and tattoos",
      "Extra vehicles and weapons",
      "Additional locations and side missions",
      "Pre-order bonus: Vintage Vice City Pack",
      "1 month of GTA+",
    ],
  },
];

const qa = [
  {
    q: "How much does GTA 6 cost?",
    a: "$79.99 for the Standard Edition and $99.99 for the Ultimate Edition in the US (£69.99 / £89.99 in the UK, €79.99 / €99.99 in Europe).",
  },
  {
    q: "What's the GTA 6 pre-order bonus?",
    a: "The Vintage Vice City Pack — items inspired by 2002's GTA: Vice City — plus one month of GTA+. It's included with either edition if you pre-order or buy before November 20, 2026.",
  },
  {
    q: "Does GTA 6 come on a disc?",
    a: "No. Rockstar confirmed that physical copies contain a download code, not a disc. Boxed copies go on sale November 12, 2026, the same day preloading opens.",
  },
  {
    q: "Where can I pre-order GTA 6?",
    a: "On the PlayStation Store, Microsoft Store (Xbox), Rockstar's official site, and major retailers. Pre-ordering digitally lets you preload from November 12.",
  },
  {
    q: "Is the Ultimate Edition worth it?",
    a: "If you'll play for months, the $20 gets you extra vehicles, weapons, clothing, locations, and side missions on day one. If you only want the story, Standard has the full game and the same pre-order bonus.",
  },
];

export default function PreOrderPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/pre-order", title, description)} />
      <JsonLd data={faqSchema(qa)} />
      <Breadcrumbs items={[{ href: "/pre-order", label: "Price & Pre-Order" }]} />
      <p className="eyebrow">Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        GTA 6 price & <span className="sunset-text">editions</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Pre-orders opened June 25, 2026. Two editions, one pre-order bonus,
        and no disc. Here&apos;s exactly what you get.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {editions.map((e) => (
          <section key={e.name} className="neon-card rounded-md p-8">
            <h2 className="display text-2xl">{e.name}</h2>
            <p className="mt-2">
              <span className="display sunset-text text-4xl">{e.usd}</span>
              <span className="ml-3 font-mono text-xs text-muted">{e.intl}</span>
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {e.perks.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-muted">
                  <span className="text-teal" aria-hidden="true">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-muted">
        Prices per Rockstar&apos;s June 2026 pre-order announcement. We don&apos;t
        sell the game and earn nothing from these links.
      </p>
      <a
        href="https://www.rockstargames.com/VI"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-vice mt-6 inline-block"
      >
        Pre-order at Rockstar ↗
      </a>

      <section className="mt-16 flex flex-col gap-6">
        {qa.map((f) => (
          <div key={f.q} className="neon-card rounded-md p-6 sm:p-8">
            <h2 className="display text-xl sm:text-2xl">{f.q}</h2>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 flex flex-wrap gap-6">
        <Link href="/release-date" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          Release date & preload →
        </Link>
        <Link href="/news/preorders-open-price-editions" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          The pre-order announcement →
        </Link>
      </div>
    </div>
  );
}
