import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";
import { guides } from "@/data/guides";
import { guidesListSchema } from "@/lib/schema-guides";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 Guides: Saving, Storage, Editions & GTA+";
const description =
  "Sourced GTA 6 guides: how to save, install size and storage, which edition to buy, redeeming the GTA+ month, and Xbox One cloud play. No guesses.";

export const metadata = pageMetadata({ title, description, path: "/guides" });

const linkClass =
  "font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream";

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/guides", title, description)} />
      <JsonLd
        data={guidesListSchema(
          guides.map((g) => ({ path: g.path, name: g.title })),
        )}
      />
      <Breadcrumbs items={[{ href: "/guides", label: "Guides" }]} />
      <p className="eyebrow">Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        GTA 6 <span className="sunset-text">guides</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Practical answers for GTA VI players. Every guide lists its sources and
        says where they disagree, and we only write a guide when we can source
        it.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={g.path}
            className="neon-card group rounded-md p-6"
          >
            <h2 className="display text-xl transition-colors group-hover:text-vice">
              {g.title} →
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {g.tagline}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <p className="eyebrow">By platform and topic</p>
        <h2 className="display mt-3 text-3xl">Go deeper</h2>
        <ul className="mt-6 grid gap-3 text-muted sm:grid-cols-2">
          {[
            { href: "/ps5", label: "GTA 6 on PS5" },
            { href: "/xbox", label: "GTA 6 on Xbox" },
            { href: "/60fps", label: "GTA 6 60fps and PS5 Pro" },
            { href: "/online", label: "GTA 6 online" },
            { href: "/gta-plus", label: "GTA+ in GTA 6" },
            { href: "/pc", label: "GTA 6 on PC" },
            { href: "/system-requirements", label: "PC system requirements" },
            { href: "/roleplay", label: "GTA 6 roleplay and FiveM" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-teal hover:text-cream">
                {l.label} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-6">
        <Link href="/faq" className={linkClass}>
          Full FAQ →
        </Link>
        <Link href="/pre-order" className={linkClass}>
          Price &amp; editions →
        </Link>
        <Link href="/news" className={linkClass}>
          Latest news →
        </Link>
      </div>
    </div>
  );
}
