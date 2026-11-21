import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchBox from "@/components/SearchBox";
import { buildSearchIndex } from "@/lib/search-index";

// Search results are thin by nature: keep them out of the index but let
// crawlers follow the links.
export const metadata: Metadata = {
  title: { absolute: "Search GTA 6 Network — Pages and News" },
  description:
    "Search every GTA 6 Network page and news story: price, PS5, PC, trailers, characters, the map and more. Runs in your browser, nothing is sent anywhere.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Breadcrumbs items={[{ href: "/search", label: "Search" }]} />
      <h1 className="display text-4xl sm:text-5xl">
        Search <span className="sunset-text">the network</span>
      </h1>
      <div className="mt-8 min-h-[70vh]">
        <Suspense fallback={null}>
          <SearchBox index={buildSearchIndex()} autoFocus />
        </Suspense>
      </div>
    </div>
  );
}
