// Single source of truth for site routes — drives the header nav,
// footer links, and sitemap. Add a page here and it shows up everywhere.
export type Route = {
  href: string;
  label: string;
  navLabel?: string; // shorter label for the header
  nav?: boolean; // show in the header
  accent?: boolean; // teal highlight in the header
  changeFrequency?: "daily" | "weekly";
  group?: RouteGroup; // footer column; see groupOf() for routes without one
};

export const routeGroups = [
  "Game",
  "Platforms",
  "News",
  "Community",
  "About",
] as const;
export type RouteGroup = (typeof routeGroups)[number];

export const routes: Route[] = [
  { href: "/", label: "GTA VI" },
  { href: "/news", label: "News", nav: true, changeFrequency: "daily", group: "News" },
  { href: "/guides", label: "Guides", nav: true, group: "Game" },
  { href: "/ps5", label: "PS5", nav: true, group: "Platforms" },
  { href: "/xbox", label: "GTA 6 on Xbox", navLabel: "Xbox", nav: true, group: "Platforms" },
  { href: "/pc", label: "GTA 6 on PC", navLabel: "PC", nav: true, group: "Platforms" },
  { href: "/roleplay", label: "GTA 6 Roleplay", navLabel: "Roleplay", nav: true, group: "Community" },
  { href: "/trailers", label: "Trailers", nav: true, group: "Game" },
  { href: "/map", label: "Map", nav: true, group: "Game" },
  { href: "/characters", label: "Characters", group: "Game" },
  { href: "/mods", label: "Mods", group: "Platforms" },
  { href: "/release-date", label: "Release Date", group: "Game" },
  { href: "/pre-order", label: "Price & Editions", group: "Game" },
  { href: "/game", label: "The Game", group: "Game" },
  { href: "/faq", label: "FAQ", group: "Game" },
  { href: "/online", label: "GTA 6 Online", group: "Game" },
  { href: "/60fps", label: "GTA 6 60fps", group: "Platforms" },
  { href: "/system-requirements", label: "PC Requirements", group: "Platforms" },
  { href: "/gta-plus", label: "GTA+ in GTA 6", group: "Game" },
  { href: "/crew", label: "Console Crew", group: "Community" },
  { href: "/premium", label: "Premium", nav: true, accent: true, group: "Community" },
  { href: "/gta-v", label: "GTA V", nav: true, accent: true, group: "Community" },
  { href: "/about", label: "About", group: "About" },
  { href: "/editorial-policy", label: "Editorial Policy", group: "About" },
  { href: "/contact", label: "Contact", group: "About" },
  { href: "/privacy", label: "Privacy", group: "About" },
];

export const navRoutes = routes.filter((r) => r.nav);

// Footer group for routes that carry no `group` of their own (the /faq and
// /premium lines above, and pages added on other branches). Anything unlisted
// falls back to "Game", so a new route always shows up somewhere sensible.
const fallbackGroups: Record<string, RouteGroup> = {
  "/faq": "Game",
  "/premium": "Community",
  "/xbox": "Platforms",
  "/60fps": "Platforms",
  "/system-requirements": "Platforms",
  "/online": "Game",
  "/gta-plus": "Game",
  "/guides": "Game",
  "/roleplay": "Community",
  "/crew": "Community",
};

export const groupOf = (r: Route): RouteGroup =>
  r.group ?? fallbackGroups[r.href] ?? "Game";
