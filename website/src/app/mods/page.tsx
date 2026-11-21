import RelatedPages from "@/components/RelatedPages";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site, isConfigured } from "@/config/site";
import { modCategories, modStats } from "@/data/mods";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GTA 6 Mods: Will GTA 6 Have Mods? Directory",
  description:
    "Will GTA 6 have mods? It launched on consoles only, which have no PC-style mods. Our vehicle, map and script directory opens once a PC version exists.",
  path: "/mods",
});

// Discord invite isn't set yet — fall back to YouTube so CTAs never 404.
const communityLink = isConfigured(site.discord) ? site.discord : site.youtube;

export default function ModsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Breadcrumbs items={[{ href: "/mods", label: "Mods" }]} />
      <p className="eyebrow">GTA 6 Mods</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        GTA VI mods start <span className="sunset-text">on PC</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        GTA VI launched November 19 on PS5 and Xbox only. Console versions
        have no PC-style mods, so the directory opens with PC once a PC
        version exists. When mods land, we curate the best
        vehicles, maps, scripts, and graphics packs and send you straight to
        the creators — no clutter, no fake mirrors, just the good stuff,
        ranked.
      </p>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-3 gap-4">
        {modStats.map((s) => (
          <div key={s.label} className="neon-card rounded-md p-4 text-center">
            <div className="display sunset-text text-2xl sm:text-3xl">
              {s.value}
            </div>
            <div className="eyebrow mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <section className="mt-16">
        <p className="eyebrow">What&apos;s coming</p>
        <h2 className="display mt-3 text-3xl">The categories</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modCategories.map((cat) => (
            <div key={cat.name} className="neon-card relative rounded-md p-6">
              <span className="absolute right-4 top-4 rounded-full border border-line px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                Soon
              </span>
              <h3 className="display text-lg text-teal">{cat.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {cat.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="mt-16 rounded-md border border-grape/30 bg-panel p-8">
        <h2 className="display text-2xl">Built the right way</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Every mod stays with its creator. We link straight to the original
          upload, credit the author, and drive traffic their way — we never
          re-host files behind a paywall or a mirror. That&apos;s how a mod hub
          earns trust from the people who actually make the mods.
        </p>
      </section>

      {/* CTAs */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="neon-card rounded-md p-8">
          <h2 className="display text-2xl">Get in early</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Be first through the door when the database opens. We&apos;ll ping
            the community the day it&apos;s live.
          </p>
          <a
            href={communityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-vice mt-6"
          >
            {isConfigured(site.discord) ? "Join the Discord" : "Get notified"}
          </a>
        </div>
        <div className="neon-card rounded-md p-8">
          <h2 className="display text-2xl">Are you a creator?</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Making GTA VI mods? Get your work featured in the directory from day
            one. Reach out and we&apos;ll set you up.
          </p>
          <a
            href={communityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-6"
          >
            List your mod
          </a>
        </div>
      </section>

      {/* Bridge to GTA V */}
      <section className="mt-16 text-center">
        <p className="text-muted">
          Modding GTA V right now?{" "}
          <Link href="/gta-v" className="text-teal hover:text-cream">
            See the custom cars &amp; maps on our server →
          </Link>
        </p>
        <p className="mt-3 text-muted">
          Wondering where GTA 6 mods and RP stand?{" "}
          <Link href="/roleplay" className="text-teal hover:text-cream">
            GTA 6 roleplay and FiveM →
          </Link>{" "}
          <Link href="/system-requirements" className="text-teal hover:text-cream">
            PC requirements →
          </Link>
        </p>
      </section>
      <RelatedPages current="/mods" />
    </div>
  );
}
