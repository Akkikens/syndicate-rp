import RelatedPages from "@/components/RelatedPages";
import Breadcrumbs from "@/components/Breadcrumbs";
import { characters } from "@/data/characters";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GTA 6 Characters: Jason, Lucia & the Full Cast",
  description:
    "Every confirmed GTA 6 character: Jason Duval, Lucia Caminos, Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista and Brian Heder.",
  path: "/characters",
});

export default function CharactersPage() {
  const protagonists = characters.filter((c) => c.protagonist);
  const cast = characters.filter((c) => !c.protagonist);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Breadcrumbs items={[{ href: "/characters", label: "Characters" }]} />
      <p className="eyebrow">Characters</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Meet the cast of <span className="sunset-text">Leonida</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Everyone Rockstar has officially revealed so far. New characters get
        added here the day they&apos;re announced.
      </p>

      {/* Protagonists */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {protagonists.map((c) => (
          <article
            key={c.name}
            className="neon-card rounded-md border-vice/30 p-8"
          >
            <p className="eyebrow text-vice">Playable protagonist</p>
            <h2 className="display mt-3 text-3xl">{c.name}</h2>
            <p className="mt-4 leading-relaxed text-muted">{c.bio}</p>
          </article>
        ))}
      </div>

      {/* Supporting cast */}
      <h2 className="display mt-16 text-2xl">The supporting cast</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cast.map((c) => (
          <article key={c.name} className="neon-card rounded-md p-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-teal">
              {c.role}
            </p>
            <h3 className="display mt-2 text-xl">{c.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.bio}</p>
            {c.voicedBy && (
              <p className="mt-3 font-mono text-xs text-muted">
                Voiced by <span className="text-cream">{c.voicedBy}</span>
              </p>
            )}
          </article>
        ))}
      </div>
      <RelatedPages current="/characters" />
    </div>
  );
}
