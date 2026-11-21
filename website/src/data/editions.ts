// Editions and prices shared by /pre-order and /ps5. Prices and Ultimate
// contents are from the PlayStation Store listings (US and UK), checked
// 2026-11-20. Other regions differ — we don't publish prices we haven't seen.
export type Edition = {
  name: string;
  usd: string;
  gbp: string;
  perks: string[];
};

export const editions: Edition[] = [
  {
    name: "Standard Edition",
    usd: "$79.99",
    gbp: "£69.99",
    perks: ["The full game: Grand Theft Auto VI"],
  },
  {
    name: "Ultimate Edition",
    usd: "$99.99",
    gbp: "£89.99",
    perks: [
      "The full game: Grand Theft Auto VI",
      "Extra vehicles, including a '95 Grotti Cheetah",
      "Extra weapons and personalized pistols",
      "Vice City Style outfits, hairstyles, and tattoos",
      "Special commissions and a classic car collection",
      "Ultimate-only services, such as Rideout Customs and Sara's Unisex Salon",
    ],
  },
];

// The pre-order bonus, now sold on the PlayStation Store as a separate add-on.
export const vintagePack = { usd: "$4.99", gbp: "£4.49" };
