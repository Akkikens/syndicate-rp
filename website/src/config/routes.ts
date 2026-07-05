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
  { href: "/trailers", label: "Trailers", nav: true },
  { href: "/characters", label: "Characters", nav: true },
  { href: "/map", label: "Map", nav: true },
  { href: "/game", label: "The Game" },
  { href: "/faq", label: "FAQ", nav: true },
  { href: "/premium", label: "Premium", nav: true, accent: true },
  { href: "/gta-v", label: "GTA V", nav: true, accent: true },
];

export const navRoutes = routes.filter((r) => r.nav);
