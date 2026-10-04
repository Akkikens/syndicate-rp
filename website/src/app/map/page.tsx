import Breadcrumbs from "@/components/Breadcrumbs";
import { regions, mapFacts } from "@/data/locations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GTA 6 Map: Leonida, Vice City & Every Region",
  description:
    "The GTA 6 map explained: all six confirmed regions of Leonida — Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga National Park — plus size estimates.",
  path: "/map",
});

export default function MapPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Breadcrumbs items={[{ href: "/map", label: "Map" }]} />
      <p className="eyebrow">GTA 6 Map</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        The state of <span className="sunset-text">Leonida</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Rockstar&apos;s Florida — six officially confirmed regions, from Vice
        City neon to swamp country. Here&apos;s everything we know about where
        you&apos;ll be playing.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((r, i) => (
          <article key={r.name} className="neon-card rounded-md p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-teal">
                {r.vibe}
              </p>
              <span className="font-mono text-xs text-vice">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="display mt-2 text-xl">{r.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {r.detail}
            </p>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-md border border-grape/30 bg-panel p-8">
        <h2 className="display text-2xl">How big is it?</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {mapFacts.map((fact) => (
            <li key={fact} className="flex gap-3 text-sm text-muted">
              <span className="text-vice" aria-hidden="true">
                ◆
              </span>
              <span className="leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs text-muted">
          Size estimates come from community reconstructions of trailer
          footage, not Rockstar — treat them as informed speculation.
        </p>
      </section>
    </div>
  );
}
