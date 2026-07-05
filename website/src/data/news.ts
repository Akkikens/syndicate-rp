export type NewsItem = {
  slug: string;
  date: string; // ISO date
  dateLabel: string;
  title: string;
  summary: string;
  tag: "Official" | "Trailer" | "Business" | "Rumor Watch";
  source?: { label: string; url: string };
};

// Newest first. Add new items to the top as the story develops.
export const news: NewsItem[] = [
  {
    slug: "preorders-window-summer-2026",
    date: "2026-06-25",
    dateLabel: "June 25, 2026",
    title: "Pre-orders and Trailer 3 expected imminently",
    summary:
      "With the November 19 date locked, industry reporting points to late June or early July 2026 for the next marketing wave — pre-orders opening alongside a third trailer. Nothing official yet; we'll cover it the moment Rockstar moves.",
    tag: "Rumor Watch",
    source: {
      label: "TechTimes",
      url: "https://www.techtimes.com/articles/317156/20260525/gta-6-release-date-locked-pre-orders-trailer-3-expected-late-june.htm",
    },
  },
  {
    slug: "take-two-reaffirms-date-q4-earnings",
    date: "2026-05-21",
    dateLabel: "May 21, 2026",
    title: "Take-Two reaffirms November 19 — no more delays",
    summary:
      "On its Q4 FY2026 earnings call, Take-Two CEO Strauss Zelnick reconfirmed the November 19, 2026 release, backed by $8B+ in FY2027 revenue guidance tied directly to the launch. The date is locked.",
    tag: "Business",
    source: {
      label: "Forbes",
      url: "https://www.forbes.com/sites/paultassi/2026/05/23/the-gta-6-release-date-is-confirmed-and-everything-weve-learned-recently/",
    },
  },
  {
    slug: "delay-to-november-2026",
    date: "2025-11-06",
    dateLabel: "November 6, 2025",
    title: "GTA VI delayed to November 19, 2026",
    summary:
      "Take-Two announced the launch would move from May 26, 2026 to November 19, 2026 — the second shift after the original Fall 2025 window. Rockstar said the extra time is to finish the game at the level of polish players expect.",
    tag: "Official",
    source: {
      label: "Rockstar Newswire",
      url: "https://www.rockstargames.com/newswire",
    },
  },
  {
    slug: "trailer-2-jason-lucia",
    date: "2025-05-06",
    dateLabel: "May 6, 2025",
    title: "Trailer 2 introduces Jason & Lucia's story",
    summary:
      "Rockstar dropped Trailer 2 with a screenshot and info blowout: Jason and Lucia caught in a criminal conspiracy stretching across the state of Leonida. It pulled 475M+ views across platforms in 24 hours.",
    tag: "Trailer",
    source: {
      label: "Rockstar Games",
      url: "https://www.rockstargames.com/newswire/article/3928aaa9471o3a/grand-theft-auto-vi-watch-trailer-2-now",
    },
  },
  {
    slug: "trailer-1-vice-city-reveal",
    date: "2023-12-04",
    dateLabel: "December 4, 2023",
    title: "Trailer 1 reveals Vice City and Lucia",
    summary:
      "The first official look at GTA VI: modern-day Vice City, the state of Leonida, and Lucia — the series' first female protagonist since the 2D era. It broke YouTube records with 100M views in under a week.",
    tag: "Trailer",
    source: {
      label: "GameSpot",
      url: "https://www.gamespot.com/articles/gta-6-trailer-passes-100-million-views-on-youtube-in-less-than-a-week/1100-6531463/",
    },
  },
];
