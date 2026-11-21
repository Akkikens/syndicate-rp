import RelatedPages from "@/components/RelatedPages";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { site, isConfigured } from "@/config/site";
import { editions, vintagePack } from "@/data/editions";
import { ps5Facts, ps5Faq } from "@/data/ps5";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 on PS5: Price, 30fps, PS5 Pro, Storage & Online";
const description =
  "Everything PS5 players need for GTA 6: price and editions, the 30fps target, PS5 Pro features, the 212GB install, and online and roleplay status.";

export const metadata = pageMetadata({ title, description, path: "/ps5" });

// Discord invite isn't set yet — fall back to YouTube so CTAs never 404.
const discordReady = isConfigured(site.discord);
const communityLink = discordReady ? site.discord : site.youtube;

const linkClass =
  "font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream";

export default function Ps5Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/ps5", title, description)} />
      <JsonLd data={faqSchema(ps5Faq)} />
      <Breadcrumbs items={[{ href: "/ps5", label: "GTA 6 on PS5" }]} />
      <p className="eyebrow">Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        GTA 6 on <span className="sunset-text">PS5</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        GTA VI is out now on PS5 and PS5 Pro. Here&apos;s what console players
        need to know: what it costs, how it runs, how much space it takes, and
        what you can and can&apos;t do online. We only list what we could
        source, and say so when something is unconfirmed.
      </p>

      {/* Buying */}
      <section className="mt-14">
        <p className="eyebrow">Buying it</p>
        <h2 className="display mt-3 text-3xl">Editions &amp; prices</h2>
        <p className="mt-4 max-w-2xl text-muted">{ps5Facts.buying.intro}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {editions.map((e) => (
            <div key={e.name} className="neon-card rounded-md p-7">
              <h3 className="display text-2xl">{e.name}</h3>
              <p className="mt-2">
                <span className="display sunset-text text-4xl">{e.usd}</span>
                <span className="ml-3 font-mono text-xs text-muted">
                  {e.gbp} UK
                </span>
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {e.perks.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-muted">
                    <span className="text-teal" aria-hidden="true">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          US and UK PlayStation Store listings, checked {site.lastUpdatedLabel}.
          The Vintage Vice City Pack is a separate add-on ({vintagePack.usd} /{" "}
          {vintagePack.gbp}).
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {ps5Facts.buying.formats.map((f) => (
            <div key={f.title} className="neon-card rounded-md p-6">
              <h3 className="display text-lg text-teal">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6">
          <Link href="/pre-order" className={linkClass}>
            Full price &amp; editions breakdown →
          </Link>
        </p>
      </section>

      {/* Performance */}
      <section className="mt-16">
        <p className="eyebrow">Performance</p>
        <h2 className="display mt-3 text-3xl">30fps, and PS5 vs PS5 Pro</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {ps5Facts.performance.map((group) => (
            <div key={group.title} className="neon-card rounded-md p-6">
              <h3 className="display text-lg text-teal">{group.title}</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Storage */}
      <section className="mt-16">
        <p className="eyebrow">Storage / install</p>
        <h2 className="display mt-3 text-3xl">Clear 212GB first</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {ps5Facts.storage}
        </p>
      </section>

      {/* Online & RP */}
      <section className="mt-16">
        <p className="eyebrow">Online &amp; roleplay on PS5</p>
        <h2 className="display mt-3 text-3xl">What you can play with others</h2>
        <ul className="mt-6 flex max-w-2xl flex-col gap-3">
          {ps5Facts.online.map((line) => (
            <li key={line} className="flex gap-2 leading-relaxed text-muted">
              <span className="text-teal" aria-hidden="true">
                ✓
              </span>
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/gta-v" className={linkClass}>
            Our PC roleplay server on GTA V →
          </Link>
        </p>
      </section>

      {/* Crew */}
      <section className="mt-16 rounded-md border border-teal/30 bg-panel p-8 sm:p-12">
        <p className="eyebrow">Play with Syndicate on PS5</p>
        <h2 className="display mt-3 text-3xl">A console crew is forming</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          We&apos;re starting a PS5 crew for GTA VI and GTA Online. It&apos;s
          just getting going, so there&apos;s nothing to count yet: Discord is
          the hub, and that&apos;s where plans for the crew will be posted.
        </p>
        {discordReady ? (
          <a
            href={communityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-vice mt-8"
          >
            Join the Discord
          </a>
        ) : (
          <div className="neon-card mt-8 flex flex-col gap-3 rounded-md p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sunset" />
              </span>
              <span className="font-mono text-sm text-cream">
                Discord launching soon
              </span>
            </div>
            <a
              href={communityLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-vice shrink-0 px-4 py-2"
            >
              Get the go-live alert
            </a>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <p className="eyebrow">PS5 FAQ</p>
        <h2 className="display mt-3 text-3xl">Quick answers</h2>
        <div className="mt-8 flex flex-col gap-3">
          {ps5Faq.map((f) => (
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

      <div className="mt-12 flex flex-wrap gap-6">
        <Link href="/release-date" className={linkClass}>
          Release date →
        </Link>
        <Link href="/xbox" className={linkClass}>
          GTA 6 on Xbox →
        </Link>
        <Link href="/60fps" className={linkClass}>
          GTA 6 60fps →
        </Link>
        <Link href="/pc" className={linkClass}>
          GTA 6 on PC →
        </Link>
        <Link href="/faq" className={linkClass}>
          Full FAQ →
        </Link>
      </div>
      <RelatedPages current="/ps5" />
    </div>
  );
}
