// Everything on this page comes from the actual server config
// (server-data/resources/syndicate-config) — keep the two in sync.

export const stats = [
  { value: "128", label: "player slots" },
  { value: "2", label: "drag strips" },
  { value: "4", label: "meet locations" },
  { value: "30", label: "car clubs" },
];

export const racing = {
  betMin: "$500",
  betMax: "$50,000",
  winnerCut: "90%",
  strips: ["LS International Strip", "East Vinewood Strip"],
  points: [
    "Challenge anyone to a quarter-mile, put $500 to $50,000 on it — winner takes 90% of the pot.",
    "Launch discipline matters: a 500ms perfect-reaction window separates a holeshot from a forfeit.",
    "Live speed, gear, and RPM telemetry in the HUD while you race.",
    "Top-100 leaderboard tracked in the database: wins, best time, career earnings.",
  ],
};

export const meets = {
  schedule: "Every Saturday · 8 PM server time",
  locations: [
    { name: "LS Car Meet", capacity: 32 },
    { name: "Vinewood Hills Lookout", capacity: 20 },
    { name: "East LS Industrial", capacity: 24 },
    { name: "Chumash Pier", capacity: 16 },
  ],
  categories: ["Best Build", "Cleanest Color", "Most Unique", "Best Sound"],
  payouts: [
    { label: "Show up with your car", amount: "$500" },
    { label: "Win a category", amount: "$5,000" },
    { label: "Best in Show", amount: "$25,000 + badge" },
  ],
};

export const clubs = {
  creationCost: "$25,000",
  maxMembers: 20,
  points: [
    "Found your own club for $25,000 — custom 1–4 character tag on every member's plate area.",
    "Up to 20 members with owner/officer/member ranks and real permissions.",
    "Shared 5-slot club garage every member can pull from.",
    "Claim a meet location as home turf — your club's blip and color on everyone's map.",
  ],
};

export type CatalogCar = {
  name: string;
  category: string;
  price: string;
  tier?: string; // minimum VIP tier, if gated
};

export const carCatalog: CatalogCar[] = [
  { name: "Sultan Classic", category: "Sports", price: "$45,000" },
  { name: "Jester Classic", category: "Sports", price: "$85,000" },
  { name: "Banshee", category: "Sports", price: "$90,000" },
  { name: "Comet", category: "Sports", price: "$75,000" },
  { name: "Infernus Classic", category: "Super", price: "$180,000" },
  { name: "Turismo Classic", category: "Super", price: "$165,000" },
  { name: "Coquette Classic", category: "Classic", price: "$120,000", tier: "Crew" },
  { name: "Bullet GT", category: "Super", price: "$155,000", tier: "Crew" },
  { name: "Cheetah Classic", category: "Super", price: "$195,000", tier: "VIP" },
];

export const exclusiveCars = [
  { name: "Syndicate GT", tier: "VIP" },
  { name: "Syndicate RM", tier: "Elite" },
  { name: "Syndicate FS", tier: "Founder" },
];

export type VipTier = {
  name: string;
  price: string;
  highlight?: boolean;
  perks: string[];
};

export const vipTiers: VipTier[] = [
  {
    name: "Crew",
    price: "$5/mo",
    perks: [
      "10 garage slots",
      "SYN plate prefix",
      "Queue priority",
      "Crew-gated cars unlocked",
    ],
  },
  {
    name: "VIP",
    price: "$10/mo",
    highlight: true,
    perks: [
      "20 garage slots",
      "VIP plate prefix",
      "Higher queue priority",
      "Syndicate GT exclusive car",
    ],
  },
  {
    name: "Elite",
    price: "$25/mo",
    perks: [
      "50 garage slots",
      "ELITE plate prefix",
      "Monthly car drop",
      "Syndicate RM exclusive car",
    ],
  },
  {
    name: "Founder",
    price: "$50/mo",
    perks: [
      "100 garage slots",
      "Top queue priority",
      "Monthly car drop",
      "Syndicate FS exclusive car",
      "Loading-screen credit",
    ],
  },
];

export const customMaps = [
  {
    name: "Burger Shot",
    detail: "Fully walkable MLO interior — order at the counter, RP inside.",
  },
  {
    name: "Highfield Mansion",
    detail: "Luxury estate for club HQs, deals, and house parties.",
  },
  {
    name: "Villa Jayway",
    detail: "Modern villa with a driveway made for photoshoots.",
  },
];

export const economy = {
  startingCash: "$5,000",
  startingBank: "$2,500",
  points: [
    "Start with $5,000 cash + $2,500 in the bank.",
    "Earn through race pots, meet payouts, and paychecks every 10 minutes.",
    "Spend it at the dealership — the catalogue runs $38,000 to $195,000.",
  ],
};
