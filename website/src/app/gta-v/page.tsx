import RelatedPages from "@/components/RelatedPages";
import Link from "next/link";
import CopyConnect from "@/components/CopyConnect";
import CarGarage from "@/components/CarGarage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import {
  stats,
  racing,
  meets,
  clubs,
  carCatalog,
  featuredImports,
  vipTiers,
  customMaps,
  economy,
} from "@/data/server";

export const metadata = pageMetadata({
  title: `${site.server.name}: GTA V FiveM Car Culture RP Server`,
  description: `${site.server.shortPitch} $50k drag racing pots, Saturday car meets, clubs, custom maps and up to ${site.server.slots} players.`,
  path: "/gta-v",
});

const sections = [
  { id: "racing", label: "Racing" },
  { id: "meets", label: "Car Meets" },
  { id: "clubs", label: "Clubs" },
  { id: "garage", label: "The Garage" },
  { id: "vip", label: "VIP" },
  { id: "join", label: "How to Join" },
];

const steps = [
  {
    step: "Own GTA V on PC",
    detail: "Any PC copy works (Steam, Epic, or Rockstar Launcher).",
  },
  {
    step: "Install FiveM",
    detail:
      "Free mod client from fivem.net — it doesn't touch your GTA Online install.",
  },
  {
    step: "Join the server",
    detail:
      "Click connect below, or paste the command into the FiveM F8 console.",
  },
  {
    step: "Hop in Discord",
    detail: "Whitelisting, rules, meet schedules, and LFG all live there.",
  },
];

export default function GtaVPage() {
  const [lead, ...rest] = site.server.name.split(" ");
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* ── Hero ── */}
      <p className="eyebrow">GTA V · FiveM</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        {lead}
        {rest.length > 0 && (
          <>
            {" "}
            <span className="text-teal">{rest.join(" ")}</span>
          </>
        )}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        {site.server.shortPitch} GTA VI is single-player on console — this is
        where we play together.
      </p>
      <p className="mt-4 rounded-md border border-teal/30 bg-panel px-4 py-3 text-sm text-muted">
        FiveM is PC-only.{" "}
        <Link href="/ps5" className="text-teal hover:text-cream">
          On PS5? →
        </Link>
      </p>

      <div className="mt-8">
        <CopyConnect />
      </div>

      {/* Stats strip */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="neon-card rounded-md p-4 text-center">
            <div className="display sunset-text text-3xl">{s.value}</div>
            <div className="eyebrow mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section nav */}
      <nav
        aria-label="Page sections"
        className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-4"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-teal"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* ── Racing ── */}
      <section id="racing" className="mt-20 scroll-mt-24">
        <p className="eyebrow">Drag racing</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          Put your money where your <span className="sunset-text">mouth is</span>
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_16rem]">
          <ul className="flex flex-col gap-4">
            {racing.points.map((p) => (
              <li key={p} className="flex gap-3 text-muted">
                <span className="text-vice" aria-hidden="true">
                  ◆
                </span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          <div className="neon-card h-fit rounded-md p-6">
            <p className="eyebrow">The strips</p>
            <ul className="mt-3 flex flex-col gap-2">
              {racing.strips.map((strip) => (
                <li key={strip} className="display text-lg">
                  {strip}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-muted">
              Bets {racing.betMin}–{racing.betMax} · winner takes{" "}
              {racing.winnerCut}
            </p>
          </div>
        </div>
      </section>

      {/* ── Meets ── */}
      <section id="meets" className="mt-20 scroll-mt-24">
        <p className="eyebrow">Car meets · {meets.schedule}</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          Saturday night is <span className="text-teal">show night</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Roll up, check in, and the crowd votes: {meets.categories.join(", ")}.
          Getting paid just for pulling up is the warm-up.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="neon-card rounded-md p-6">
            <p className="eyebrow">Payouts</p>
            <ul className="mt-4 flex flex-col gap-3">
              {meets.payouts.map((p) => (
                <li
                  key={p.label}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="text-sm text-muted">{p.label}</span>
                  <span className="display text-lg text-teal">{p.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="neon-card rounded-md p-6">
            <p className="eyebrow">Locations</p>
            <ul className="mt-4 flex flex-col gap-3">
              {meets.locations.map((l) => (
                <li
                  key={l.name}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="display text-lg">{l.name}</span>
                  <span className="font-mono text-xs text-muted">
                    {l.capacity} cars
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Clubs ── */}
      <section id="clubs" className="mt-20 scroll-mt-24">
        <p className="eyebrow">Car clubs</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          Ride with a <span className="sunset-text">crew</span>
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {clubs.points.map((p) => (
            <li key={p} className="neon-card rounded-md p-5 text-sm leading-relaxed text-muted">
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Garage ── */}
      <section id="garage" className="mt-20 scroll-mt-24">
        <p className="eyebrow">The garage</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          From a {carCatalog[0].price} starter to{" "}
          <span className="sunset-text">supercar money</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          A hand-tuned catalogue of GTA IV legends and customs, running
          GTA VI-inspired handling physics — plus three Syndicate originals
          you can&apos;t buy with cash. Click any car for the details.
        </p>
        <div className="mt-8">
          <CarGarage cars={carCatalog} />
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          Vehicle renders © Rockstar Games. Syndicate originals are custom
          builds.
        </p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          {economy.points.join(" ")}
        </p>
      </section>

      {/* ── Featured imports ── */}
      <section className="mt-20">
        <p className="eyebrow">Coming to the dealership</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          Featured <span className="text-teal">imports</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Four real-world builds from the CFX Luxury Pack, headed for the
          dealership on the next update.
        </p>
        <div className="mt-8">
          <CarGarage cars={featuredImports} />
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          Vehicle photography via gta5-mods.com creators.
        </p>
      </section>

      {/* ── Custom maps ── */}
      <section className="mt-20">
        <p className="eyebrow">Custom locations</p>
        <h2 className="display mt-3 text-3xl">
          Places vanilla servers don&apos;t have
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {customMaps.map((m) => (
            <div key={m.name} className="neon-card rounded-md p-6">
              <h3 className="display text-lg text-teal">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIP ── */}
      <section id="vip" className="mt-20 scroll-mt-24">
        <p className="eyebrow">Support the server</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          VIP <span className="sunset-text">tiers</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          The server runs on subscriptions — perks are garage space, queue
          priority, plates, and exclusive rides. Never pay-to-win.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vipTiers.map((tier) => (
            <div
              key={tier.name}
              className={`neon-card rounded-md p-6 ${
                tier.highlight ? "border-vice/50" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="display text-xl">{tier.name}</h3>
                <span className="font-mono text-sm text-vice">
                  {tier.price}
                </span>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2 text-sm text-muted">
                    <span className="text-teal" aria-hidden="true">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a
          href={site.server.store}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-vice mt-8"
        >
          Browse the store
        </a>
      </section>

      {/* ── How to join ── */}
      <section id="join" className="mt-20 scroll-mt-24">
        <p className="eyebrow">How to join</p>
        <h2 className="display mt-3 text-3xl">On the server in 10 minutes</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.step} className="neon-card rounded-md p-6">
              <span className="font-mono text-xs text-vice">Step {i + 1}</span>
              <h3 className="display mt-2 text-lg">{s.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Discord CTA ── */}
      <section className="mt-20 rounded-md border border-teal/30 bg-panel p-8 text-center sm:p-12">
        <h2 className="display text-3xl">
          {site.server.live ? "Ready to pull up?" : "Be there at launch"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {site.server.live
            ? "Join the Discord for whitelisting and the next car meet, then connect in-game."
            : "The server goes live soon. Join the Discord now to get the go-live alert, grab a whitelist spot, and be in the first lobby."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {site.server.live && (
            <a href={site.server.connectUrl} className="btn btn-teal">
              Connect via FiveM
            </a>
          )}
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className={site.server.live ? "btn btn-ghost" : "btn btn-vice"}
          >
            Join Discord
          </a>
        </div>
      </section>
      <RelatedPages current="/gta-v" />
    </div>
  );
}
