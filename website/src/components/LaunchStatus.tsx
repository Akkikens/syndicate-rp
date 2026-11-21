"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/config/site";

const launch = new Date(site.releaseDateISO).getTime();
const DAY = 86_400_000;

function daysSinceLaunch(): number {
  return Math.max(0, Math.floor((Date.now() - launch) / DAY));
}

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 60_000);
  return () => clearInterval(id);
}

// null on the server render → fixed-size placeholder until hydration.
const getServerSnapshot = () => null;

function label(days: number | null): string {
  if (days === null) return "·· days since launch";
  if (days === 0) return "Launch day";
  return `${days} ${days === 1 ? "day" : "days"} since launch`;
}

export default function LaunchStatus({ compact = false }: { compact?: boolean }) {
  const days = useSyncExternalStore<number | null>(
    subscribe,
    daysSinceLaunch,
    getServerSnapshot,
  );

  return (
    <div className="text-center">
      <p
        className={`display sunset-text ${
          compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-7xl md:text-8xl"
        }`}
      >
        Out now
      </p>
      <p className="eyebrow mt-3 sm:mt-4">{site.platforms}</p>
      <p
        className={`mt-2 font-mono tabular-nums text-muted ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {label(days)}
      </p>
    </div>
  );
}
