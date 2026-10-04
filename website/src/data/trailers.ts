export type Trailer = {
  id: string; // YouTube video ID
  name: string;
  date: string; // ISO date
  dateLabel: string;
  duration: string; // ISO 8601, for VideoObject structured data
  blurb: string;
};

// Newest first. When the launch trailer drops, add it to the top —
// the trailers page, home embed, and video structured data all update from here.
export const trailers: Trailer[] = [
  {
    id: "tJbzMqJGH4k",
    name: "An Extended Look",
    date: "2026-08-27",
    dateLabel: "August 27, 2026",
    duration: "PT26M48S",
    blurb:
      "Rockstar's 27-minute in-game showcase, captured on PS5. Premiered on Netflix, then YouTube — Jason and Lucia's rise through Leonida's underworld, with long story scenes and the best look yet at the open world. No. 1 on Netflix, 31.1M views in four days.",
  },
  {
    id: "VQRLujxTm3c",
    name: "Trailer 2",
    date: "2025-05-06",
    dateLabel: "May 6, 2025",
    duration: "PT2M47S",
    blurb:
      "Jason and Lucia have always known the deck is stacked against them. When an easy score goes wrong, they land in the middle of a conspiracy stretching across Leonida. 475M views in 24 hours.",
  },
  {
    id: "QdBZY2fkU-0",
    name: "Trailer 1",
    date: "2023-12-04",
    dateLabel: "December 4, 2023",
    duration: "PT1M30S",
    blurb:
      "The reveal that broke the internet: modern-day Vice City, the state of Leonida, and Lucia — 100M YouTube views in under a week.",
  },
];

export const latestTrailer = trailers[0];
