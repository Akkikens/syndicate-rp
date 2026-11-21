import type { Faq } from "@/data/faq";

// Shared shape for the sourced landing pages (/xbox, /online, /60fps, ...).
// Rendered by components/InfoPage.tsx. Badges label how solid a claim is, so
// confirmed facts, unconfirmed reports and precedent never read the same.
export type Badge = "Confirmed" | "Not confirmed" | "Reported" | "Precedent";

export type Card = { title: string; body: string; badge?: Badge };

export type Block = {
  eyebrow?: string;
  title: string;
  intro?: string;
  cards?: Card[];
  bullets?: string[];
  steps?: string[]; // ordered list (procedures)
  table?: { head: string[]; rows: string[][] };
  note?: string;
};

export type Source = { label: string; url: string; note?: string };

export type InfoPageData = {
  path: string;
  title: string; // <= 60 chars, keyword first
  description: string; // 120-155 chars
  crumb: string;
  h1: [string, string]; // [plain, highlighted]
  lede: string;
  blocks: Block[];
  faq: Faq[];
  sources: Source[];
  links: { href: string; label: string }[]; // >= 3 internal links
};
