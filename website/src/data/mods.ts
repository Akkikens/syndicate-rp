// The GTA 6 mod hub. GTA VI launches 2026-11-19, so no mods exist yet —
// this page captures demand now and becomes a live directory at launch.
// Model: we curate and link out to creators' pages. We never re-host their
// files. That keeps it legal and keeps creators on our side.

export type ModCategory = {
  name: string;
  blurb: string;
};

export const modCategories: ModCategory[] = [
  {
    name: "Vehicles",
    blurb: "Real-world cars, bikes, and Vice City customs — the biggest category, every time.",
  },
  {
    name: "Maps & MLOs",
    blurb: "New interiors, custom builds, and reworked corners of Leonida.",
  },
  {
    name: "Scripts",
    blurb: "Gameplay overhauls, trainers, and quality-of-life tweaks.",
  },
  {
    name: "Graphics & ENB",
    blurb: "Reshade presets and visual packs that push the Vice City sunset further.",
  },
  {
    name: "Player & Skins",
    blurb: "Character models, outfits, and texture packs for Jason and Lucia.",
  },
  {
    name: "Weapons & Sound",
    blurb: "New arsenals, reworked audio, and engine-sound packs.",
  },
];

export const modStats = [
  { value: "PC", label: "mods arrive with" },
  { value: "6", label: "categories" },
  { value: "Day 1", label: "of the PC release" },
];
