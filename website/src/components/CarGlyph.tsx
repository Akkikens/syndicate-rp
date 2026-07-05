import type { CarCategory } from "@/data/server";

const categoryStyle: Record<CarCategory, { from: string; to: string; text: string }> = {
  Sports: { from: "var(--vice)", to: "var(--night)", text: "text-vice" },
  Super: { from: "var(--grape)", to: "var(--night)", text: "text-grape" },
  Classic: { from: "var(--sunset)", to: "var(--night)", text: "text-sunset" },
  Luxury: { from: "var(--cream)", to: "var(--night)", text: "text-cream" },
};

// No photo exists for this car — instead of a weak car-shaped icon, the card
// face becomes a typographic spec plate: category watermark + gradient,
// consistent with the site's display-type brand rather than fake photography.
export default function CarGlyph({
  category,
  exclusive = false,
  className = "",
}: {
  category: CarCategory;
  exclusive?: boolean;
  className?: string;
}) {
  const style = categoryStyle[category];
  const accent = exclusive ? "var(--teal)" : style.from;

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 20%, transparent) 0%, var(--panel) 60%)`,
      }}
    >
      {/* Abstract rim motif — a tinted brand mark, not an attempt at a car photo */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="pointer-events-none absolute h-28 w-28 opacity-25 sm:h-36 sm:w-36"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke={accent} strokeWidth="2.5" />
        <circle cx="50" cy="50" r="28" fill="none" stroke={accent} strokeWidth="2.5" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={50 + 28 * Math.cos((i * Math.PI) / 4)}
            y1={50 + 28 * Math.sin((i * Math.PI) / 4)}
            x2={50 + 46 * Math.cos((i * Math.PI) / 4)}
            y2={50 + 46 * Math.sin((i * Math.PI) / 4)}
            stroke={accent}
            strokeWidth="2.5"
          />
        ))}
      </svg>

      <p
        className={`relative font-mono text-[0.65rem] uppercase tracking-[0.24em] ${style.text}`}
      >
        {category}
      </p>
    </div>
  );
}
