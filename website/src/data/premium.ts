import { site } from "@/config/site";

export type PremiumTier = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  highlight?: boolean;
  paymentLink: string;
  perks: string[];
};

// Founding-member framing: these prices lock in for life for early subscribers.
export const premiumTiers: PremiumTier[] = [
  {
    name: "Insider",
    price: "$4.99",
    period: "/month",
    tagline: "Inside the network before everyone else.",
    paymentLink: site.premium.insiderLink,
    perks: [
      "Insider role + private channels in Discord",
      "Every video early, before it goes public",
      "Trailer 3 & pre-order alerts the second they drop",
      "Vote on what we cover next",
      "Name on the site's Supporters Wall",
    ],
  },
  {
    name: "Founders Club",
    price: "$9.99",
    period: "/month",
    tagline: "Locked founding price — forever.",
    highlight: true,
    paymentLink: site.premium.founderLink,
    perks: [
      "Everything in Insider",
      "Launch-week war room: live watch-alongs & coverage",
      "Monthly members-only Q&A / hangout",
      "Priority queue on the Syndicate RP server",
      "Founders badge — only ever available before launch",
      "Founding price locked for life",
    ],
  },
];

export const freeTier = {
  name: "Free",
  perks: [
    "All news, trailers, characters, map & FAQ",
    "The live countdown",
    "Public Discord access",
  ],
};

export const premiumFaq = [
  {
    q: "What am I actually paying for?",
    a: "Community and access, not game content — we're a fan network, not Rockstar. Members get content early, a private wing of the Discord, launch-week events, and perks on our GTA V server. GTA VI itself you buy from Rockstar like everyone else.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — subscriptions are handled by Stripe and you can cancel in one click from your receipt email. No lock-in, no questions.",
  },
  {
    q: "What happens after GTA VI launches?",
    a: "The network keeps going — launch is when it gets good. Founders keep their locked price and badge permanently; the Founders Club closes to new members at launch.",
  },
];
