import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import JsonLd from "@/components/JsonLd";
import { videoGameSchema } from "@/lib/schema";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Everything We Know About GTA VI",
  description:
    "GTA VI facts only: release date, platforms, protagonists Jason & Lucia, the state of Leonida, Vice City, and what's still unconfirmed.",
  alternates: { canonical: "/game" },
};

const facts = [
  {
    q: "When does GTA VI come out?",
    a: `${site.releaseDateLabel}, on PlayStation 5 and Xbox Series X|S. Take-Two has reaffirmed the date repeatedly — most recently on its May 2026 earnings call — and has $8B+ in revenue guidance riding on it. A PC version has not been announced at launch, consistent with Rockstar's usual console-first releases.`,
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
    q: "When do pre-orders open?",
    a: "Not open yet as of early July 2026. Industry reporting expects pre-orders alongside Trailer 3 as the marketing campaign ramps toward November. We'll post the moment it happens.",
  },
  {
    q: "What about GTA Online 2?",
    a: "Rockstar hasn't detailed GTA VI's online mode yet. Given GTA Online's scale, a new online component is all but certain — but nothing official has been shown.",
  },
];

export default function GamePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <JsonLd data={videoGameSchema} />
      <p className="eyebrow">The game</p>
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
