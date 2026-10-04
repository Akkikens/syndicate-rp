import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Countdown from "@/components/Countdown";
import JsonLd from "@/components/JsonLd";
import { site } from "@/config/site";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 Release Date: November 19, 2026 + Countdown";
const description =
  "GTA 6 releases Thursday, November 19, 2026 on PS5 and Xbox Series X|S. Preload starts November 12. Live countdown, unlock time, PC status, and the full delay history.";

export const metadata = pageMetadata({ title, description, path: "/release-date" });

const timeline = [
  { date: "Dec 4, 2023", event: "Trailer 1 reveals GTA VI with a 2025 window" },
  { date: "May 2, 2025", event: "First delay: Fall 2025 → May 26, 2026" },
  { date: "Nov 6, 2025", event: "Second delay: May 26 → November 19, 2026" },
  { date: "Jun 25, 2026", event: "Pre-orders open ($79.99 / $99.99)" },
  { date: "Aug 7, 2026", event: "Take-Two reaffirms Nov 19 on earnings call" },
  { date: "Nov 12, 2026", event: "Preload begins; boxed copies on shelves" },
  { date: "Nov 19, 2026", event: "Launch on PS5 and Xbox Series X|S" },
];

const qa = [
  {
    q: "What is the GTA 6 release date?",
    a: "Thursday, November 19, 2026, on PlayStation 5 and Xbox Series X|S. Take-Two confirmed the date in November 2025 and has reaffirmed it on every earnings call since, most recently on August 7, 2026.",
  },
  {
    q: "What time does GTA 6 unlock?",
    a: "Rockstar hasn't published exact unlock times. Console digital launches usually unlock at midnight local time on release day, and our countdown targets midnight Eastern Time on November 19. We'll update this the moment Rockstar confirms.",
  },
  {
    q: "When can I preload GTA 6?",
    a: "Preloading starts November 12, 2026 — one week before launch. Boxed copies, which contain a download code rather than a disc, go on sale the same day.",
  },
  {
    q: "Will GTA 6 be delayed again?",
    a: "Very unlikely. Take-Two's fiscal 2027 guidance of $8.0–8.2 billion in net bookings depends on a November launch, pre-orders are open, and boxed copies ship November 12.",
  },
  {
    q: "When does GTA 6 come out on PC?",
    a: "No PC version has been announced. GTA V reached PC about 19 months after consoles and Red Dead Redemption 2 about a year after. Treat any GTA 6 PC date you see as speculation.",
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
        Grand Theft Auto VI launches on <strong className="text-cream">Thursday,
        November 19, 2026</strong> for PlayStation 5 and Xbox Series X|S.
        Preloading opens <strong className="text-cream">November 12</strong>.
        There&apos;s no PC version at launch.
      </p>

      <div className="neon-card mt-10 rounded-md p-8 text-center">
        <p className="eyebrow">Time until launch</p>
        <div className="mt-6">
          <Countdown compact />
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
              <span className="text-muted">{t.event}</span>
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
    </div>
  );
}
