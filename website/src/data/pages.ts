import { routes } from "@/config/routes";

// Short blurbs per page, used by site search and the "Related pages" block.
// Routes without an entry here still work: they fall back to their label.
export const pageSummaries: Record<string, string> = {
  "/": "GTA 6 news, PS5 guide, trailers, characters, map and FAQ in one place.",
  "/news": "Every sourced GTA VI update, with rumors labeled as rumors.",
  "/ps5": "Price, performance, PS5 Pro, storage and online for PS5 players.",
  "/trailers": "Every GTA VI trailer, with release dates and what each shows.",
  "/characters": "Jason, Lucia and the rest of the confirmed cast.",
  "/map": "The state of Leonida and its confirmed regions.",
  "/mods": "Will GTA 6 have mods? A directory and what is known so far.",
  "/release-date": "Launch date, what happened at launch, and what comes next.",
  "/pre-order": "Standard and Ultimate edition prices and what each includes.",
  "/pc": "Whether GTA VI is coming to PC, and what has been reported.",
  "/game": "Everything confirmed about the game, with no clickbait.",
  "/faq": "Quick answers to the questions players ask most.",
  "/premium": "The membership waitlist: early videos and a private Discord wing.",
  "/gta-v": "Syndicate RP, a car culture roleplay server for GTA V on PC.",
  "/about": "What this site is, who it is not affiliated with, and Syndicate RP.",
  "/editorial-policy": "How stories are sourced, how rumors and corrections are handled.",
  "/contact": "How to reach the site through its official channels.",
  "/privacy": "What the site does and does not collect.",
};

// Hand-picked neighbours per page. Pages not listed (or listed hrefs that no
// longer exist) fall back to other routes in the same footer group.
export const relatedMap: Record<string, string[]> = {
  "/ps5": ["/pre-order", "/pc", "/faq", "/news"],
  "/release-date": ["/news", "/game", "/pre-order", "/faq"],
  "/pre-order": ["/ps5", "/release-date", "/game", "/faq"],
  "/pc": ["/mods", "/ps5", "/news", "/faq"],
  "/game": ["/characters", "/map", "/trailers", "/faq"],
  "/faq": ["/ps5", "/pre-order", "/release-date", "/news"],
  "/trailers": ["/game", "/characters", "/map", "/news"],
  "/characters": ["/game", "/trailers", "/map", "/faq"],
  "/map": ["/game", "/characters", "/trailers", "/faq"],
  "/mods": ["/pc", "/gta-v", "/news", "/faq"],
  "/premium": ["/gta-v", "/news", "/about", "/faq"],
  "/gta-v": ["/premium", "/mods", "/ps5", "/about"],
  "/about": ["/editorial-policy", "/contact", "/privacy", "/news"],
  "/editorial-policy": ["/about", "/contact", "/news", "/privacy"],
  "/contact": ["/about", "/editorial-policy", "/privacy", "/news"],
  "/privacy": ["/about", "/editorial-policy", "/contact", "/news"],
};

export const summaryFor = (href: string) =>
  pageSummaries[href] ?? routes.find((r) => r.href === href)?.label ?? "";
