import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import TrailerEmbed from "@/components/TrailerEmbed";
import { site } from "@/config/site";
import { trailers } from "@/data/trailers";
import { videoObjectSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GTA 6 Trailers: Extended Look, Trailer 2 & Trailer 1",
  description:
    "Watch every official GTA 6 video: the 27-minute Extended Look (Aug 2026), Trailer 2 (Jason & Lucia), and Trailer 1 (Vice City reveal). Plus: is there a Trailer 3?",
  path: "/trailers",
});

export default function TrailersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {trailers.map((t) => (
        <JsonLd key={t.id} data={videoObjectSchema(t)} />
      ))}
      <Breadcrumbs items={[{ href: "/trailers", label: "Trailers" }]} />
      <p className="eyebrow">GTA 6 Trailers</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Every GTA 6 <span className="sunset-text">trailer</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Every official Rockstar video, newest first — including the 27-minute
        Extended Look that premiered on Netflix. New official videos get added
        here as Rockstar releases them.
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
          <h2 className="display text-2xl">Is there a GTA 6 Trailer 3?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Not by that name. Rockstar released the Extended Look instead of a
            numbered Trailer 3. Subscribe for the breakdown whenever a new
            official video lands.
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
