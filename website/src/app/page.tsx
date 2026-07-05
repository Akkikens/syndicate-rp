import Link from "next/link";
import Countdown from "@/components/Countdown";
import PalmHorizon from "@/components/PalmHorizon";
import TrailerEmbed from "@/components/TrailerEmbed";
import NewsCard from "@/components/NewsCard";
import { site } from "@/config/site";
import { news } from "@/data/news";
import { latestTrailer } from "@/data/trailers";

const tickerItems = [
  "November 19, 2026",
  "Vice City returns",
  "Jason & Lucia",
  "State of Leonida",
  "PS5 · Xbox Series X|S",
  "Trailer 3 watch is on",
];

export default function Home() {
  return (
    <>
      {/* ── Hero: the countdown is the thesis ── */}
      <section className="horizon relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-20 text-center sm:px-6 sm:pt-28">
          <p className="eyebrow">Grand Theft Auto VI · {site.releaseDateLabel}</p>
          <h1 className="display mx-auto mt-6 max-w-4xl text-4xl sm:text-6xl md:text-7xl">
            Vice City is <span className="sunset-text">almost here</span>
          </h1>
          <div className="mt-12 sm:mt-16">
            <Countdown />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/trailers"
              className="btn btn-vice"
            >
              Watch the trailers
            </Link>
            <Link
              href="/game"
              className="btn btn-ghost"
            >
              Everything we know
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
              An easy score goes wrong, and the two of them end up on the
              darkest side of the sunniest place in America. 475 million views
              in 24 hours — the biggest video launch ever.
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
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
              href: "/faq",
              title: "FAQ",
              blurb: "Release date, price, PC version, pre-orders. Answered.",
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
            <p className="eyebrow">While we wait · GTA V</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Play with us on{" "}
              <span className="text-teal">{site.server.name}</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              {site.server.shortPitch} Our own FiveM server with a custom HUD,
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

      {/* ── YouTube CTA ── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="eyebrow">From the channel</p>
          <h2 className="display mx-auto mt-3 max-w-2xl text-3xl sm:text-4xl">
            Every drop, breakdown, and theory — on YouTube first
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Subscribe so you don&apos;t miss Trailer 3, pre-order alerts, and
            our launch-week coverage.
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
