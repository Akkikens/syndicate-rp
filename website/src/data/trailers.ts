export type Trailer = {
  id: string; // YouTube video ID
  name: string;
  date: string; // ISO date
  dateLabel: string;
  blurb: string;
};

// Newest first. When Trailer 3 drops, add it to the top —
// the trailers page, home embed, and VideoGame schema all update from here.
export const trailers: Trailer[] = [
  {
    id: "VQRLujxTm3c",
    name: "Trailer 2",
    date: "2025-05-06",
    dateLabel: "May 6, 2025",
    blurb:
      "Jason and Lucia have always known the deck is stacked against them. When an easy score goes wrong, they land in the middle of a conspiracy stretching across Leonida. 475M views in 24 hours.",
  },
  {
    id: "QdBZY2fkU-0",
    name: "Trailer 1",
    date: "2023-12-04",
    dateLabel: "December 4, 2023",
    blurb:
      "The reveal that broke the internet: modern-day Vice City, the state of Leonida, and Lucia — 100M YouTube views in under a week.",
  },
];

export const latestTrailer = trailers[0];
