// Decorative palm-silhouette horizon strip — the Vice City skyline divider.
export default function PalmHorizon() {
  return (
    <div aria-hidden="true" className="relative h-24 overflow-hidden sm:h-32">
      <div className="horizon absolute inset-0" />
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-full w-full fill-night"
      >
        {/* ground */}
        <rect x="0" y="112" width="1200" height="8" />
        {/* palm cluster left */}
        <g transform="translate(120 112)">
          <path d="M-3 0 L0 -58 L3 0 Z" />
          <path d="M0 -58 C-18 -70 -40 -68 -52 -56 C-34 -62 -14 -60 0 -52 Z" />
          <path d="M0 -58 C18 -70 40 -68 52 -56 C34 -62 14 -60 0 -52 Z" />
          <path d="M0 -58 C-10 -78 -28 -84 -44 -80 C-26 -76 -8 -68 0 -54 Z" />
          <path d="M0 -58 C10 -78 28 -84 44 -80 C26 -76 8 -68 0 -54 Z" />
          <path d="M0 -58 C-2 -82 6 -94 18 -98 C8 -88 4 -72 2 -56 Z" />
        </g>
        {/* palm mid, taller */}
        <g transform="translate(430 112) scale(1.25)">
          <path d="M-3 0 L1 -62 L4 0 Z" />
          <path d="M1 -62 C-17 -74 -39 -72 -51 -60 C-33 -66 -13 -64 1 -56 Z" />
          <path d="M1 -62 C19 -74 41 -72 53 -60 C35 -66 15 -64 1 -56 Z" />
          <path d="M1 -62 C-9 -82 -27 -88 -43 -84 C-25 -80 -7 -72 1 -58 Z" />
          <path d="M1 -62 C11 -82 29 -88 45 -84 C27 -80 9 -72 1 -58 Z" />
        </g>
        {/* skyline blocks */}
        <rect x="640" y="52" width="26" height="60" />
        <rect x="672" y="70" width="18" height="42" />
        <rect x="696" y="40" width="30" height="72" />
        <rect x="732" y="62" width="16" height="50" />
        <rect x="754" y="30" width="24" height="82" />
        <rect x="784" y="58" width="20" height="54" />
        {/* palm right */}
        <g transform="translate(1020 112) scale(1.1)">
          <path d="M-3 0 L0 -56 L3 0 Z" />
          <path d="M0 -56 C-18 -68 -40 -66 -52 -54 C-34 -60 -14 -58 0 -50 Z" />
          <path d="M0 -56 C18 -68 40 -66 52 -54 C34 -60 14 -58 0 -50 Z" />
          <path d="M0 -56 C-10 -76 -28 -82 -44 -78 C-26 -74 -8 -66 0 -52 Z" />
          <path d="M0 -56 C10 -76 28 -82 44 -78 C26 -74 8 -66 0 -52 Z" />
        </g>
      </svg>
    </div>
  );
}
