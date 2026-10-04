import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Countdown from "@/components/Countdown";
import JsonLd from "@/components/JsonLd";
import { videoGameSchema } from "@/lib/schema";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Everything We Know About GTA 6 (October 2026)",
  description:
    "GTA 6 facts only: November 19 release, $79.99 price, no disc, 30fps, single-player at launch, Jason & Lucia, Leonida and Vice City — and what's still unconfirmed.",
  path: "/game",
});

const facts = [
  {
    q: "When does GTA VI come out?",
    a: `${site.releaseDateLabel}, on PlayStation 5 and Xbox Series X|S. Take-Two has reaffirmed the date repeatedly — most recently on its August 2026 earnings call — and has $8.0–8.2B in revenue guidance riding on it. Preloading starts ${site.preloadDateLabel}.`,
  },
  {
    q: "Who are the protagonists?",
    a: "Jason and Lucia — a Bonnie-and-Clyde pair. Lucia is the series' first female protagonist since the 2D era. Trailer 2 sets them up on the run after an easy score goes wrong, caught in a criminal conspiracy that stretches across the state.",
  },
  {
    q: "Where is it set?",
    a: "The state of Leonida — Rockstar's take on Florida — centered on a modern-day Vice City. Trailer footage shows beaches, swamps, strip malls, and social-media-soaked street life, suggesting the biggest and densest map Rockstar has built.",
  },
  {
    q: "Is there a PC version?",
    a: "Unconfirmed. Rockstar has only announced PS5 and Xbox Series X|S. Based on GTA V and RDR2, a PC release typically follows one to two years after consoles — but treat any PC date you see as a rumor.",
  },
  {
    q: "How much does it cost, and is there a disc?",
    a: "Pre-orders opened June 25, 2026: $79.99 for Standard, $99.99 for Ultimate. Pre-orders include the Vintage Vice City Pack and a month of GTA+. There's no disc — boxed copies contain a download code.",
  },
  {
    q: "How does it run?",
    a: "Rockstar says the game is targeting 30fps on all consoles, including PS5 Pro. A 60fps option at launch or later hasn't been ruled out, but hasn't been promised either. The 27-minute Extended Look was captured on a base PS5.",
  },
  {
    q: "What about GTA Online?",
    a: "GTA VI launches as a single-player experience, per Take-Two CEO Strauss Zelnick in September 2026, with no microtransactions at launch. A new online mode hasn't been detailed; the existing GTA Online keeps running.",
  },
];

export default function GamePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <JsonLd data={videoGameSchema} />
      <Breadcrumbs items={[{ href: "/game", label: "The Game" }]} />
      <p className="eyebrow">The game · Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Everything we <span className="sunset-text">actually</span> know
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Facts only — what Rockstar and Take-Two have confirmed, clearly
        separated from what&apos;s still speculation.
      </p>

      <div className="mt-12 flex flex-col gap-6">
        {facts.map((f) => (
          <section key={f.q} className="neon-card rounded-md p-6 sm:p-8">
            <h2 className="display text-xl sm:text-2xl">{f.q}</h2>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/characters"
          className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
        >
          Meet the characters →
        </Link>
        <Link
          href="/map"
          className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
        >
          Explore the map →
        </Link>
        <Link
          href="/faq"
          className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
        >
          Quick FAQ →
        </Link>
      </div>

      <div className="mt-16 border-t border-line pt-12 text-center">
        <p className="eyebrow">Time remaining</p>
        <div className="mt-6">
          <Countdown compact />
        </div>
      </div>
    </div>
  );
}
