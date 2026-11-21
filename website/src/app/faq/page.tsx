import RelatedPages from "@/components/RelatedPages";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { faqs } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GTA 6 FAQ: Release Date, Price, Disc, 60fps & More",
  description:
    "Quick answers to the biggest GTA 6 questions: release date (November 19, 2026), price ($79.99), disc vs digital, 30fps, PC, GTA Online and map size.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={faqSchema()} />
      <Breadcrumbs items={[{ href: "/faq", label: "FAQ" }]} />
      <p className="eyebrow">FAQ</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        GTA 6 FAQ: quick <span className="sunset-text">answers</span>
      </h1>
      <p className="mt-4 text-muted">
        The questions everyone asks, answered straight — updated whenever the
        facts change.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((f) => (
          <details key={f.q} className="neon-card group rounded-md">
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-vice transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
              {f.a}
            </p>
          </details>
        ))}
      </div>
      <RelatedPages current="/faq" />
    </div>
  );
}
