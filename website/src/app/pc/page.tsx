import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 PC Release Date: Is GTA 6 Coming to PC?";
const description =
  "GTA 6 launches November 19, 2026 on PS5 and Xbox Series X|S only. No PC version is announced. Here's what Rockstar's history says about when a PC release could land.";

export const metadata = pageMetadata({ title, description, path: "/pc" });

const history = [
  { game: "GTA IV", consoles: "Apr 2008", pc: "Dec 2008", gap: "~8 months" },
  { game: "GTA V", consoles: "Sep 2013", pc: "Apr 2015", gap: "~19 months" },
  { game: "Red Dead Redemption 2", consoles: "Oct 2018", pc: "Nov 2019", gap: "~12 months" },
];

const qa = [
  {
    q: "Is GTA 6 coming to PC?",
    a: "Not at launch. Rockstar and Take-Two have only announced PlayStation 5 and Xbox Series X|S for November 19, 2026. Every recent Rockstar game has come to PC eventually, but no GTA 6 PC version has been announced.",
  },
  {
    q: "When will GTA 6 come out on PC?",
    a: "There's no date. Rockstar's last three big games reached PC between about 8 and 19 months after consoles. If GTA 6 follows that pattern, a PC version would land sometime in 2027 or 2028 — but that's an estimate from history, not an announcement.",
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
        GTA VI launches {site.releaseDateLabel} on{" "}
        <strong className="text-cream">PS5 and Xbox Series X|S only</strong>.
        Rockstar hasn&apos;t announced a PC version — here&apos;s what its track
        record suggests.
      </p>

      <section className="mt-12">
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
    </div>
  );
}
