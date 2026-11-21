import RelatedPages from "@/components/RelatedPages";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";
import { editions, vintagePack } from "@/data/editions";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 Price & Editions: $79.99 Standard, $99.99 Ultimate";
const description =
  "GTA 6 costs $79.99 (Standard) or $99.99 (Ultimate). What Ultimate adds, the Vintage Vice City Pack, why there's no disc, and where to buy.";

export const metadata = pageMetadata({ title, description, path: "/pre-order" });

const qa = [
  {
    q: "How much does GTA 6 cost?",
    a: "$79.99 for the Standard Edition and $99.99 for the Ultimate Edition on the US PlayStation Store; £69.99 and £89.99 on the UK PlayStation Store (listings checked November 20, 2026). Prices in other regions vary.",
  },
  {
    q: "What was the GTA 6 pre-order bonus?",
    a: "The Vintage Vice City Pack, a digital add-on. The PlayStation Store now lists it as a separate purchase at $4.99 (US) and £4.49 (UK). Whether the pre-order bonuses can still be claimed is unconfirmed — check the store listing before you buy. ComputerBase reports (November 21) that digital Standard or Ultimate buyers who purchased before November 20 can redeem one free month of GTA+, whose GTA VI single-player perks cost EUR 7.99 a month; on PS5 the redeem-by date it gives is March 31, 2027.",
  },
  {
    q: "Does GTA 6 come on a disc?",
    a: "No. Rockstar confirmed in June 2026 that boxed copies contain a download code, not a disc. Any disc release later is unconfirmed.",
  },
  {
    q: "Where can I buy GTA 6?",
    a: "Rockstar's launch announcement lists the PlayStation Store, Microsoft Store, Rockstar Games Store, and retailers worldwide, digital and boxed.",
  },
  {
    q: "Is the Ultimate Edition worth it?",
    a: "It costs $20 more. Per the PlayStation Store, it adds extra vehicles, weapons, outfits, hairstyles, tattoos, special commissions, and some Ultimate-only services. If you only want the story, Standard is the full game.",
  },
];

export default function PreOrderPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/pre-order", title, description)} />
      <JsonLd data={faqSchema(qa)} />
      <Breadcrumbs items={[{ href: "/pre-order", label: "Price & Editions" }]} />
      <p className="eyebrow">Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        GTA 6 price & <span className="sunset-text">editions</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        GTA VI is out now. Two editions, a download code in the box instead of
        a disc, and the Vintage Vice City Pack as a separate add-on. Here&apos;s
        exactly what you get.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {editions.map((e) => (
          <section key={e.name} className="neon-card rounded-md p-8">
            <h2 className="display text-2xl">{e.name}</h2>
            <p className="mt-2">
              <span className="display sunset-text text-4xl">{e.usd}</span>
              <span className="ml-3 font-mono text-xs text-muted">{e.gbp} UK</span>
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
        Prices and contents per the US and UK PlayStation Store listings,
        checked {site.lastUpdatedLabel}. Vintage Vice City Pack:{" "}
        {vintagePack.usd} / {vintagePack.gbp} as an add-on. We don&apos;t sell
        the game and earn nothing from these links.
      </p>
      <a
        href="https://www.rockstargames.com/VI"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-vice mt-6 inline-block"
      >
        Buy at Rockstar ↗
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
        <Link href="/ps5" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          GTA 6 on PS5 →
        </Link>
        <Link href="/release-date" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          Release date →
        </Link>
        <Link href="/news/preorders-open-price-editions" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          The original pre-order announcement →
        </Link>
      </div>
      <RelatedPages current="/pre-order" />
    </div>
  );
}
