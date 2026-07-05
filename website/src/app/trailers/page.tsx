import type { Metadata } from "next";
import TrailerEmbed from "@/components/TrailerEmbed";
import { site } from "@/config/site";
import { trailers } from "@/data/trailers";

export const metadata: Metadata = {
  title: "GTA VI Trailers",
  description:
    "Watch every official Grand Theft Auto VI trailer — Trailer 1 (Vice City reveal) and Trailer 2 (Jason & Lucia). Trailer 3 the moment it drops.",
  alternates: { canonical: "/trailers" },
};

export default function TrailersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Trailers</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Watch them <span className="sunset-text">again</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Every official Rockstar trailer, in order. Trailer 3 is expected
        alongside pre-orders — it&apos;ll be here (and on the channel) the
        moment it drops.
      </p>

      <div className="mt-12 flex flex-col gap-14">
        {trailers.map((t) => (
          <section key={t.id}>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="display text-2xl sm:text-3xl">{t.name}</h2>
              <span className="font-mono text-xs text-muted">
                {t.dateLabel}
              </span>
            </div>
            <TrailerEmbed
              videoId={t.id}
              title={`Grand Theft Auto VI — ${t.name}`}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted">{t.blurb}</p>
          </section>
        ))}

        <section className="neon-card rounded-md p-8 text-center">
          <h2 className="display text-2xl">Trailer 3</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Not out yet. Expected with the pre-order push. Subscribe on YouTube
            for the breakdown the day it lands.
          </p>
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-vice mt-6"
          >
            Get notified
          </a>
        </section>
      </div>
    </div>
  );
}
