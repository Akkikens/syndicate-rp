// Single source of truth for site routes — drives the header nav,
// footer links, and sitemap. Add a page here and it shows up everywhere.
export type Route = {
  href: string;
  label: string;
  nav?: boolean; // show in the header
  accent?: boolean; // teal highlight in the header
  changeFrequency?: "daily" | "weekly";
};

export const routes: Route[] = [
  { href: "/", label: "GTA VI", nav: true },
  { href: "/news", label: "News", nav: true, changeFrequency: "daily" },
  { href: "/ps5", label: "PS5", nav: true },
  { href: "/trailers", label: "Trailers", nav: true },
  { href: "/characters", label: "Characters", nav: true },
  { href: "/map", label: "Map", nav: true },
  { href: "/mods", label: "Mods", nav: true },
  { href: "/release-date", label: "Release Date" },
  { href: "/pre-order", label: "Price & Editions" },
  { href: "/pc", label: "GTA 6 on PC" },
  { href: "/game", label: "The Game" },
  { href: "/faq", label: "FAQ" },
  { href: "/xbox", label: "GTA 6 on Xbox" },
  { href: "/online", label: "GTA 6 Online" },
  { href: "/60fps", label: "GTA 6 60fps" },
  { href: "/system-requirements", label: "PC Requirements" },
  { href: "/roleplay", label: "GTA 6 Roleplay" },
  { href: "/gta-plus", label: "GTA+ in GTA 6" },
  { href: "/guides", label: "Guides" },
  { href: "/crew", label: "Console Crew" },
  { href: "/premium", label: "Premium", nav: true, accent: true },
  { href: "/gta-v", label: "GTA V", nav: true, accent: true },
];

export const navRoutes = routes.filter((r) => r.nav);
