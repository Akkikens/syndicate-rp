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

// Payment links are not configured yet, so the page is a waitlist.
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
      "Vote on what we cover next",
      "Name on the site's Supporters Wall",
    ],
  },
  {
    name: "Founders Club",
    price: "$9.99",
    period: "/month",
    tagline: "Everything in Insider, plus the community perks.",
    highlight: true,
    paymentLink: site.premium.founderLink,
    perks: [
      "Everything in Insider",
      "Monthly members-only Q&A / hangout",
      "Priority queue on the Syndicate RP server",
    ],
  },
];

export const freeTier = {
  name: "Free",
  perks: [
    "All news, trailers, characters, map & FAQ",
    "Public Discord access",
  ],
};

export const premiumFaq = [
  {
    q: "What am I actually paying for?",
    a: "Community and access, not game content — we're a fan network, not Rockstar. Members get content early, a private wing of the Discord, and perks on our GTA V server. GTA VI itself you buy from Rockstar like everyone else.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — subscriptions are handled by Stripe and you can cancel in one click from your receipt email. No lock-in, no questions.",
  },
];
