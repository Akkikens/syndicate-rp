import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "GTA 6 FAQ — Release Date, Price, Platforms & More",
  description:
    "Quick answers to the biggest GTA 6 questions: release date (November 19, 2026), platforms, PC version, price, pre-orders, map size, characters, and trailers.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={faqSchema} />
      <p className="eyebrow">FAQ</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Quick <span className="sunset-text">answers</span>
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
    </div>
  );
}
