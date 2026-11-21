import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import LaunchStatus from "@/components/LaunchStatus";
import JsonLd from "@/components/JsonLd";
import { videoGameSchema } from "@/lib/schema";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Everything We Know About GTA 6 (November 2026)",
  description:
    "GTA 6 facts only: out now on PS5 and Xbox, $79.99 price, no disc, 30fps, single-player, Jason & Lucia, Leonida and Vice City — and what's still unconfirmed.",
  path: "/game",
});

const facts = [
  {
    q: "Is GTA VI out?",
    a: `Yes. It launched ${site.releaseDateLabel} on PlayStation 5 and Xbox Series X|S. Take-Two said it made about $3.79 billion in day-one retail sales — a company estimate of retail spend, not revenue.`,
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
    a: "Not announced. Rockstar has only released it on PS5 and Xbox Series X|S. A GamesBeat report points to Q1 2027 but is unconfirmed; see our PC page.",
  },
  {
    q: "How much does it cost, and is there a disc?",
    a: "$79.99 for Standard and $99.99 for Ultimate on the US PlayStation Store. The Vintage Vice City Pack, the pre-order bonus, is now a separate $4.99 add-on. There's no disc — boxed copies contain a download code.",
  },
  {
    q: "How does it run?",
    a: "Rockstar is targeting 30fps on current consoles. On PS5 Pro, the PlayStation Store lists PSSR and ray-traced shadows. We haven't found an announced 60fps mode.",
  },
  {
    q: "What about GTA Online?",
    a: "GTA VI is a single-player experience; the PlayStation Store listing says so, and Take-Two CEO Strauss Zelnick said the same in September 2026. A GTA VI online mode hasn't been detailed; GTA Online on GTA V is still the multiplayer option.",
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
        <p className="eyebrow">Launch status</p>
        <div className="mt-6">
          <LaunchStatus compact />
        </div>
      </div>
    </div>
  );
}
