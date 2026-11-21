import RelatedPages from "@/components/RelatedPages";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { site, isConfigured } from "@/config/site";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 PC Release Date: Is GTA 6 Coming to PC?";
const description =
  "GTA 6 launched November 19, 2026 on PS5 and Xbox only. No PC version is announced: what Take-Two said, an unconfirmed Q1 2027 report, and port history.";

export const metadata = pageMetadata({ title, description, path: "/pc" });

const history = [
  { game: "GTA IV", consoles: "Apr 2008", pc: "Dec 2008", gap: "~8 months" },
  { game: "GTA V", consoles: "Sep 2013", pc: "Apr 2015", gap: "~19 months" },
  { game: "Red Dead Redemption 2", consoles: "Oct 2018", pc: "Nov 2019", gap: "~12 months" },
  { game: "GTA VI", consoles: "Nov 2026", pc: "Not announced", gap: "—" },
];

const communityLink = isConfigured(site.discord) ? site.discord : site.youtube;

const qa = [
  {
    q: "Is GTA 6 coming to PC?",
    a: "Not yet. GTA VI launched on November 19, 2026 for PlayStation 5 and Xbox Series X|S only, and no PC version has been announced. Every recent Rockstar game has come to PC eventually, but that is history, not an announcement.",
  },
  {
    q: "When will GTA 6 come out on PC?",
    a: "There's no date. A GamesBeat report citing four anonymous sources points to Q1 2027, but Rockstar and Take-Two haven't confirmed it. Rockstar's last three big games reached PC between about 8 and 19 months after consoles.",
  },
  {
    q: "Can I play GTA 6 on PC through cloud streaming?",
    a: "Nothing official has been announced. Xbox Cloud Gaming and PlayStation Portal-style streaming depend on platform deals Rockstar hasn't detailed.",
  },
  {
    q: "Will GTA 6 have mods?",
    a: "Console versions don't support PC-style mods. The modding scene — vehicles, maps, scripts, roleplay servers — will start in earnest once a PC version exists.",
  },
];

export default function PcPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/pc", title, description)} />
      <JsonLd data={faqSchema(qa)} />
      <Breadcrumbs items={[{ href: "/pc", label: "PC" }]} />
      <p className="eyebrow">Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        GTA 6 on PC: <span className="sunset-text">not yet</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        GTA VI launched {site.releaseDateLabel} on{" "}
        <strong className="text-cream">PS5 and Xbox Series X|S only</strong>.
        Rockstar hasn&apos;t announced a PC version. Here&apos;s what has been
        said since launch, and what its track record suggests.
      </p>

      <section className="mt-12 flex flex-col gap-6">
        <h2 className="display text-2xl sm:text-3xl">What&apos;s been said</h2>
        <div className="neon-card rounded-md p-6 sm:p-8">
          <h3 className="display text-xl">Take-Two: no announcement</h3>
          <p className="mt-3 leading-relaxed text-muted">
            Take-Two&apos;s November 9, 2026 earnings materials listed only PS5
            and Xbox Series X|S for GTA VI. Asked about PC, CEO Strauss Zelnick
            told Variety that &quot;information always comes from our
            labels&quot; — meaning Rockstar. He did not confirm a PC version.
          </p>
        </div>
        <div className="neon-card rounded-md p-6 sm:p-8">
          <h3 className="display text-xl">
            GamesBeat: Q1 2027{" "}
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-grape-text">
              Unconfirmed
            </span>
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            GamesBeat reported on October 13, 2026 (updated November 18) that
            Rockstar is targeting the first quarter of 2027 for a PC version,
            citing four anonymous sources. Rockstar and Take-Two have not
            confirmed it. Treat it as a rumor.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="display text-2xl sm:text-3xl">
          How long Rockstar PC ports have taken
        </h2>
        <div className="neon-card mt-6 overflow-x-auto rounded-md">
          <table className="w-full text-left text-sm">
            <thead className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-teal">
              <tr>
                <th className="p-4">Game</th>
                <th className="p-4">Consoles</th>
                <th className="p-4">PC</th>
                <th className="p-4">Gap</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              {history.map((h) => (
                <tr key={h.game} className="border-t border-line">
                  <td className="p-4 text-cream">{h.game}</td>
                  <td className="p-4">{h.consoles}</td>
                  <td className="p-4">{h.pc}</td>
                  <td className="p-4">{h.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 neon-card rounded-md p-6 sm:p-8">
        <h2 className="display text-2xl sm:text-3xl">
          What we&apos;ll do when PC lands
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          Syndicate RP plans to move to GTA VI when a PC version{" "}
          <strong className="text-cream">and</strong> an official multiplayer
          platform both exist. Neither does today: FiveM is for GTA V, and no
          multiplayer or FiveM-style support for GTA VI has been announced.
          Until then our roleplay server runs on GTA V for PC.
        </p>
        <div className="mt-5 flex flex-wrap gap-6">
          <Link href="/gta-v" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
            The GTA V server →
          </Link>
          <a
            href={communityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream"
          >
            {isConfigured(site.discord) ? "Join the Discord ↗" : "Follow on YouTube ↗"}
          </a>
        </div>
      </section>

      <section className="mt-14 flex flex-col gap-6">
        {qa.map((f) => (
          <div key={f.q} className="neon-card rounded-md p-6 sm:p-8">
            <h2 className="display text-xl sm:text-2xl">{f.q}</h2>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 flex flex-wrap gap-6">
        <Link href="/gta-v" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          On PC now? Play GTA V roleplay with us →
        </Link>
        <Link href="/release-date" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          Console release date →
        </Link>
        <Link href="/mods" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          GTA 6 mods →
        </Link>
      </div>
      <RelatedPages current="/pc" />
    </div>
  );
}
