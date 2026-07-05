"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CarGlyph from "@/components/CarGlyph";
import type { CatalogCar } from "@/data/server";

function AccessLabel({ car }: { car: CatalogCar }) {
  if (car.exclusive) return <>{car.tier} exclusive</>;
  if (car.tier) return <>{car.tier}+</>;
  return <>Everyone</>;
}

function CarThumb({ car, className = "" }: { car: CatalogCar; className?: string }) {
  if (car.image) {
    return (
      <Image
        src={car.image}
        alt={car.name}
        fill
        className={`object-cover ${className}`}
        sizes="(min-width: 1024px) 25vw, 50vw"
      />
    );
  }
  return (
    <CarGlyph category={car.category} exclusive={car.exclusive} className={className} />
  );
}

function CarModal({ car, onClose }: { car: CatalogCar; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/85 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="neon-card w-full max-w-lg overflow-hidden rounded-md"
        role="dialog"
        aria-modal="true"
        aria-label={car.name}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video bg-panel">
          <CarThumb car={car} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-night/70 font-mono text-cream hover:text-vice"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <p className="eyebrow">{car.category}</p>
          <h3 className="display mt-2 text-2xl">{car.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{car.blurb}</p>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Price
              </p>
              <p className="display mt-1 text-lg text-teal">
                {car.price ?? "Not for sale"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Access
              </p>
              <p className="display mt-1 text-lg">
                <AccessLabel car={car} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarGarage({ cars }: { cars: CatalogCar[] }) {
  const [selected, setSelected] = useState<CatalogCar | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <button
            key={car.slug}
            type="button"
            onClick={() => setSelected(car)}
            className="neon-card group overflow-hidden rounded-md text-left"
          >
            <div className="relative aspect-[16/10] bg-panel">
              <CarThumb
                car={car}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              {car.exclusive && (
                <span className="absolute left-3 top-3 rounded-full bg-teal px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-night">
                  Exclusive
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-base leading-tight">{car.name}</h3>
                <span className="shrink-0 font-mono text-xs text-teal">
                  {car.price ?? "—"}
                </span>
              </div>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                <AccessLabel car={car} />
              </p>
            </div>
          </button>
        ))}
      </div>

      {selected && <CarModal car={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
