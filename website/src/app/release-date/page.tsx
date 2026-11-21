import RelatedPages from "@/components/RelatedPages";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import LaunchStatus from "@/components/LaunchStatus";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 Release Date: Out Now (November 19, 2026)";
const description =
  "GTA 6 launched Thursday, November 19, 2026 on PS5 and Xbox Series X|S. Platforms, first-day sales, PC status, online mode, and the full delay history.";

export const metadata = pageMetadata({ title, description, path: "/release-date" });

const timeline = [
  { date: "Dec 4, 2023", event: "Trailer 1 reveals GTA VI with a 2025 window" },
  { date: "May 2, 2025", event: "First delay: Fall 2025 → May 26, 2026" },
  { date: "Nov 6, 2025", event: "Second delay: May 26 → November 19, 2026" },
  { date: "Jun 25, 2026", event: "Pre-orders opened ($79.99 / $99.99)" },
  { date: "Aug 7, 2026", event: "Take-Two reaffirmed Nov 19 on its earnings call" },
  { date: "Nov 19, 2026", event: "GTA VI launched on PS5 and Xbox Series X|S", done: true },
  { date: "Nov 20, 2026", event: "Take-Two reported about $3.79B in day-one retail sales", done: true },
];

const qa = [
  {
    q: "Is GTA 6 out?",
    a: "Yes. GTA VI launched on Thursday, November 19, 2026. Rockstar's launch announcement says it is available worldwide for PlayStation 5 and Xbox Series X|S. Take-Two had confirmed the date in November 2025 and reaffirmed it on its August 7, 2026 earnings call.",
  },
  {
    q: "Which platforms is GTA 6 on?",
    a: "PS5 (including PS5 Pro) and Xbox Series X|S. The PlayStation Store listing says it is not available on PS4. No PC version has been announced.",
  },
  {
    q: "How did the GTA 6 launch go?",
    a: "Take-Two said GTA VI made about $3.79 billion in day-one retail sales, a company estimate of what shoppers spent through the end of November 19 — retail spend, not Take-Two's revenue. It did not say whether that figure includes pre-orders. It also said 32.5 million units sold before release. Separately, Sensor Tower, a third-party tracker, estimated about 24.58 million copies and roughly $2.36 billion through launch day (per TweakTown); Take-Two hasn't confirmed that estimate, and it is a different measure from Take-Two's retail figure.",
  },
  {
    q: "When does GTA 6 come out on PC?",
    a: "No PC version has been announced; Take-Two's November 9 earnings materials listed only PS5 and Xbox Series X|S. A GamesBeat report from October 13 (updated November 18) cites four anonymous sources for a Q1 2027 PC release — unconfirmed by Rockstar and Take-Two. For context, GTA V reached PC about 19 months after consoles.",
  },
  {
    q: "Is there an online mode yet?",
    a: "Not in GTA VI. The PlayStation Store listing calls it a single-player experience, and Take-Two CEO Strauss Zelnick said in September 2026 that it would launch single-player. No GTA VI online mode has been detailed; GTA Online on GTA V is still the multiplayer option.",
  },
];

export default function ReleaseDatePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/release-date", title, description)} />
      <JsonLd data={faqSchema(qa)} />
      <Breadcrumbs items={[{ href: "/release-date", label: "Release Date" }]} />
      <p className="eyebrow">Updated {site.lastUpdatedLabel}</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        GTA 6 release date:{" "}
        <span className="sunset-text">{site.releaseDateLabel}</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Grand Theft Auto VI launched on <strong className="text-cream">Thursday,
        November 19, 2026</strong> for PlayStation 5 and Xbox Series X|S.
        There&apos;s no PC version announced.
      </p>

      <div className="neon-card mt-10 rounded-md p-8 text-center">
        <p className="eyebrow">Launch status</p>
        <div className="mt-6">
          <LaunchStatus compact />
        </div>
      </div>

      <section className="mt-14">
        <h2 className="display text-2xl sm:text-3xl">Key dates</h2>
        <ol className="mt-6 flex flex-col">
          {timeline.map((t) => (
            <li
              key={t.date}
              className="flex gap-6 border-b border-line py-4 text-sm last:border-0"
            >
              <time className="w-28 shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-teal">
                {t.date}
              </time>
              <span className={t.done ? "text-cream" : "text-muted"}>{t.event}</span>
            </li>
          ))}
        </ol>
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
        <Link href="/ps5" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          GTA 6 on PS5 →
        </Link>
        <Link href="/pre-order" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          Price & editions →
        </Link>
        <Link href="/news" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          Latest news →
        </Link>
        <Link href="/faq" className="font-mono text-xs uppercase tracking-[0.18em] text-teal hover:text-cream">
          Full FAQ →
        </Link>
      </div>
      <RelatedPages current="/release-date" />
    </div>
  );
}
