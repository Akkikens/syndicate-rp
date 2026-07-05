export type Region = {
  name: string;
  vibe: string;
  detail: string;
};

// The six regions Rockstar has officially confirmed for the state of Leonida.
export const regions: Region[] = [
  {
    name: "Vice City",
    vibe: "Neon metropolis",
    detail:
      "The heart of the game — a modern-day take on the series' most iconic city. Beaches, clubs, muscle, money, and social media chaos on every corner.",
  },
  {
    name: "Leonida Keys",
    vibe: "Island paradise",
    detail:
      "A tropical archipelago strung together by one long highway. Boats, bars, and smuggling routes — this is where Jason calls home.",
  },
  {
    name: "Grassrivers",
    vibe: "The swamp",
    detail:
      "Wetlands teeming with gators and airboats — Leonida's answer to the Everglades. Easy to disappear into, hard to leave.",
  },
  {
    name: "Port Gellhorn",
    vibe: "Faded glory",
    detail:
      "A decaying coastal city with a proud past and a thriving underground economy. Pawn shops, dive bars, and second chances.",
  },
  {
    name: "Ambrosia",
    vibe: "Industry & bikers",
    detail:
      "Smokestacks, sugar refineries, and biker gangs. The working backbone of Leonida — and some of its roughest company.",
  },
  {
    name: "Mount Kalaga National Park",
    vibe: "The wild north",
    detail:
      "Forested hills, hiking trails, and off-road country. The furthest thing from Vice City neon the state has to offer.",
  },
];

export const mapFacts = [
  "Leonida is Rockstar's take on the entire state of Florida — not just Vice City.",
  "Community reconstructions from trailer footage suggest a map roughly twice the size of GTA V's.",
  "At least three counties are named: Vice-Dale, Leonard, and Kelly County.",
  "Expect the most vertical and dense map Rockstar has built — 700+ visible buildings in Vice City alone in trailer frames.",
];
