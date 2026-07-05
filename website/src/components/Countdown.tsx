"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/config/site";

const target = new Date(site.releaseDateISO).getTime();

function secondsLeft(): number {
  return Math.max(0, Math.ceil((target - Date.now()) / 1000));
}

function subscribe(onTick: () => void) {
  const id = setInterval(() => {
    onTick();
    if (secondsLeft() === 0) clearInterval(id);
  }, 1000);
  return () => clearInterval(id);
}

// null on the server render → placeholder digits until hydration.
const getServerSnapshot = () => null;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const seconds = useSyncExternalStore<number | null>(
    subscribe,
    secondsLeft,
    getServerSnapshot,
  );

  if (seconds === 0) {
    return (
      <p className="display sunset-text text-5xl sm:text-7xl md:text-8xl">
        Out now
      </p>
    );
  }

  const s = seconds;
  const cells: [string, string][] = [
    [s !== null ? String(Math.floor(s / 86_400)) : "···", "days"],
    [s !== null ? pad(Math.floor(s / 3_600) % 24) : "··", "hours"],
    [s !== null ? pad(Math.floor(s / 60) % 60) : "··", "min"],
    [s !== null ? pad(s % 60) : "··", "sec"],
  ];

  return (
    <div
      className={`flex items-baseline justify-center gap-4 sm:gap-8 ${
        compact ? "" : "md:gap-12"
      }`}
      role="timer"
      aria-label={`Countdown to GTA VI release, ${site.releaseDateLabel}`}
    >
      {cells.map(([value, label]) => (
        <div key={label} className="text-center">
          <div
            className={`display sunset-text tabular-nums ${
              compact
                ? "text-4xl sm:text-5xl"
                : "text-6xl sm:text-8xl md:text-[9rem]"
            }`}
          >
            {value}
          </div>
          <div className="eyebrow mt-2 sm:mt-3">{label}</div>
        </div>
      ))}
    </div>
  );
}
