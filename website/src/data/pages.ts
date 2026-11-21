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
  "/xbox": "Price, Series X|S, storage, Game Pass status and online for Xbox players.",
  "/online": "What has been said about GTA Online for GTA 6, and what is not dated.",
  "/60fps": "The 30fps target, what PS5 Pro adds, and what Rockstar has not confirmed.",
  "/system-requirements": "No official PC requirements exist; what is known and what is not.",
  "/roleplay": "Why there are no GTA 6 RP servers yet, and what has to happen first.",
  "/gta-plus": "What GTA+ includes for GTA 6 and how the free month works.",
  "/guides": "Sourced how-tos: saving, storage, editions, GTA+ and Xbox One cloud.",
  "/crew": "The forming PS5 and Xbox crew for GTA Online today and GTA VI later.",
  "/newsletter": "Occasional, sourced GTA VI news by email. Unsubscribe any time.",
  "/about": "What this site is, who it is not affiliated with, and Syndicate RP.",
  "/editorial-policy": "How stories are sourced, how rumors and corrections are handled.",
  "/contact": "How to reach the site through its official channels.",
  "/privacy": "What the site does and does not collect.",
};

// Hand-picked neighbours per page. Pages not listed (or listed hrefs that no
// longer exist) fall back to other routes in the same footer group.
export const relatedMap: Record<string, string[]> = {
  "/ps5": ["/xbox", "/60fps", "/pre-order", "/guides"],
  "/release-date": ["/online", "/news", "/pre-order", "/guides"],
  "/pre-order": ["/guides", "/ps5", "/xbox", "/release-date"],
  "/pc": ["/system-requirements", "/roleplay", "/mods", "/ps5"],
  "/game": ["/characters", "/map", "/online", "/guides"],
  "/faq": ["/guides", "/xbox", "/60fps", "/online"],
  "/trailers": ["/game", "/characters", "/map", "/news"],
  "/characters": ["/game", "/trailers", "/map", "/faq"],
  "/map": ["/game", "/characters", "/trailers", "/faq"],
  "/mods": ["/pc", "/system-requirements", "/roleplay", "/gta-v"],
  "/premium": ["/gta-v", "/news", "/about", "/faq"],
  "/gta-v": ["/roleplay", "/crew", "/premium", "/mods"],
  "/xbox": ["/ps5", "/60fps", "/online", "/guides"],
  "/online": ["/ps5", "/xbox", "/roleplay", "/gta-plus"],
  "/60fps": ["/ps5", "/xbox", "/faq", "/game"],
  "/system-requirements": ["/pc", "/mods", "/roleplay", "/faq"],
  "/roleplay": ["/gta-v", "/crew", "/pc", "/mods"],
  "/gta-plus": ["/guides", "/pre-order", "/online", "/ps5"],
  "/guides": ["/ps5", "/xbox", "/pre-order", "/gta-plus"],
  "/crew": ["/roleplay", "/online", "/gta-v", "/ps5"],
  "/about": ["/editorial-policy", "/contact", "/privacy", "/news"],
  "/editorial-policy": ["/about", "/contact", "/news", "/privacy"],
  "/contact": ["/about", "/editorial-policy", "/privacy", "/news"],
  "/privacy": ["/about", "/editorial-policy", "/contact", "/news"],
};

// Guide pages (/guides/<slug>) are not routes; they share one neighbour list.
export const guideRelated = ["/guides", "/pre-order", "/ps5", "/xbox"];

export const summaryFor = (href: string) =>
  pageSummaries[href] ?? routes.find((r) => r.href === href)?.label ?? "";
