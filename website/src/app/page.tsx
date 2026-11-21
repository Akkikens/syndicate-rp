import Link from "next/link";
import LaunchStatus from "@/components/LaunchStatus";
import PalmHorizon from "@/components/PalmHorizon";
import TrailerEmbed from "@/components/TrailerEmbed";
import NewsCard from "@/components/NewsCard";
import { site } from "@/config/site";
import { news } from "@/data/news";
import { latestTrailer } from "@/data/trailers";

const tickerItems = [
  "Out now",
  "Released November 19, 2026",
  site.platforms,
  "$79.99 Standard · $99.99 Ultimate",
  "PC: not announced",
  "Jason & Lucia",
  "State of Leonida",
];

export default function Home() {
  return (
    <>
      {/* ── Hero: launch status ── */}
      <section className="horizon relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-20 text-center sm:px-6 sm:pt-28">
          <p className="eyebrow">Released {site.releaseDateLabel} · {site.platforms}</p>
          <h1 className="display mx-auto mt-6 max-w-4xl text-4xl sm:text-6xl md:text-7xl">
            GTA 6: welcome to <span className="sunset-text">Leonida</span>
          </h1>
          <div className="mt-12 sm:mt-16">
            <LaunchStatus />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/ps5" className="btn btn-vice">
              GTA 6 on PS5
            </Link>
            <Link href="/pre-order" className="btn btn-ghost">
              Price & editions
            </Link>
          </div>
        </div>
        <PalmHorizon />
      </section>

      {/* ── Ticker ── */}
      <div className="overflow-hidden border-y border-line bg-panel py-3">
        <div className="ticker-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {tickerItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="mx-8 font-mono text-xs uppercase tracking-[0.24em] text-muted"
                >
                  {item} <span className="text-vice">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Latest intel ── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Latest intel</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              The story so far
            </h2>
          </div>
          <Link
            href="/news"
            className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
          >
            All news →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      {/* ── Latest trailer feature ── */}
      <section className="border-y border-line bg-dusk/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{latestTrailer.name}</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Jason & Lucia against <span className="sunset-text">Leonida</span>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              27 minutes of in-game footage, captured on PS5: Jason and
              Lucia&apos;s rise through Leonida&apos;s underworld. It premiered
              on Netflix, hit No. 1, and pulled 31.1 million views in four
              days.
            </p>
            <Link
              href="/trailers"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
            >
              All trailers →
            </Link>
          </div>
          <TrailerEmbed
            videoId={latestTrailer.id}
            title={`Grand Theft Auto VI — ${latestTrailer.name}`}
          />
        </div>
      </section>

      {/* ── Explore the hub ── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow">Go deeper</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          Everything GTA VI, in one place
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/ps5",
              title: "GTA 6 on PS5",
              blurb: "Price, 30fps, PS5 Pro, 212GB of storage, and what PS5 players can do for multiplayer.",
            },
            {
              href: "/characters",
              title: "Characters",
              blurb: "Jason, Lucia, and the full confirmed cast of Leonida.",
            },
            {
              href: "/map",
              title: "The Map",
              blurb: "All six confirmed regions, from Vice City to the Keys.",
            },
            {
              href: "/game",
              title: "The Facts",
              blurb: "Everything Rockstar has confirmed — no clickbait.",
            },
            {
              href: "/pre-order",
              title: "Price & Editions",
              blurb: "$79.99 or $99.99, what Ultimate adds, and why there's no disc.",
            },
            {
              href: "/faq",
              title: "FAQ",
              blurb: "60fps, PC version, GTA Online, PS5 roleplay, map size. Answered.",
            },
            {
              href: "/guides",
              title: "Guides",
              blurb: "How to save, install size, which edition to buy, and the free GTA+ month.",
            },
            {
              href: "/xbox",
              title: "GTA 6 on Xbox",
              blurb: "Series X|S, Game Pass, Xbox One cloud play, and what Microsoft's pages confirm.",
            },
            {
              href: "/online",
              title: "GTA 6 Online",
              blurb: "No online mode at launch: what Take-Two has said, and what hasn't been announced.",
            },
            {
              href: "/roleplay",
              title: "GTA 6 Roleplay",
              blurb: "Why there are no RP servers yet, FiveM's status, and where to play today.",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="neon-card group rounded-md p-6"
            >
              <h3 className="display text-xl transition-colors group-hover:text-vice">
                {card.title} →
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.blurb}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── GTA V server bridge ── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="neon-card rounded-md p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="eyebrow">Multiplayer · GTA V on PC</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Play with us on{" "}
              <span className="text-teal">{site.server.name}</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              GTA VI is single-player on PS5 and Xbox. Our multiplayer RP
              server runs on GTA V for PC. {site.server.shortPitch} Our own
              FiveM server with a custom HUD,
              drag racing with bets and leaderboards, car clubs, and scheduled
              meets — up to {site.server.slots} players.
            </p>
          </div>
          <Link
            href="/gta-v"
            className="btn btn-teal mt-8 shrink-0 lg:mt-0"
          >
            Join the server
          </Link>
        </div>
      </section>

      {/* ── Premium hook ── */}
      <section className="border-t border-line bg-dusk/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="eyebrow">Premium</p>
            <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">
              Get inside the <span className="sunset-text">network</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Early videos, a private Discord wing, and queue priority on our
              GTA V server. Memberships are a waitlist for now.
            </p>
          </div>
          <Link
            href="/premium"
            className="btn btn-vice mt-8 inline-block shrink-0 lg:mt-0"
          >
            See what&apos;s inside
          </Link>
        </div>
      </section>

      {/* ── YouTube CTA ── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="eyebrow">From the channel</p>
          <h2 className="display mx-auto mt-3 max-w-2xl text-3xl sm:text-4xl">
            Every drop, breakdown, and theory — on YouTube first
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Subscribe for our GTA VI breakdowns, theories, and coverage as the
            news develops.
          </p>
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block btn btn-vice px-8"
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </>
  );
}
