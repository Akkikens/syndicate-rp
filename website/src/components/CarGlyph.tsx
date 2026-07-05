import type { CarCategory } from "@/data/server";

const categoryColor: Record<CarCategory, string> = {
  Sports: "text-vice",
  Super: "text-grape",
  Classic: "text-sunset",
  Luxury: "text-cream",
};

// A single reusable side-profile silhouette, tinted per category via currentColor —
// no external assets, nothing to break when a mod site changes its URLs.
export default function CarGlyph({
  category,
  exclusive = false,
  className = "",
}: {
  category: CarCategory;
  exclusive?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 60"
      aria-hidden="true"
      className={`${exclusive ? "text-teal" : categoryColor[category]} ${className}`}
    >
      <path
        fill="currentColor"
        opacity={exclusive ? 1 : 0.9}
        d="M10,42 C10,34 14,30 22,28 L34,16 C38,12 46,10 54,10 L78,10 C86,10 92,14 96,20 L104,26 C112,28 116,34 116,40 L116,42 L108,42 C108,48 103,52 97,52 C91,52 86,48 86,42 L40,42 C40,48 35,52 29,52 C23,52 18,48 18,42 Z"
      />
      <circle cx="29" cy="42" r="8" fill="var(--night)" />
      <circle cx="97" cy="42" r="8" fill="var(--night)" />
      <circle cx="29" cy="42" r="3.2" fill="currentColor" />
      <circle cx="97" cy="42" r="3.2" fill="currentColor" />
    </svg>
  );
}
