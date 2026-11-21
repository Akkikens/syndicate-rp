import type { InfoPageData } from "@/data/page-types";

// Facts for /gta-plus. Sources opened 2026-11-21:
//  [RS]  rockstargames.com/VI — "Members on console get optional benefits for Jason and Lucia."
//        https://www.rockstargames.com/VI
//  [CB]  ComputerBase, Nov 21 — EUR 7.99/month; Elegy car + one-car Crosstown garage from
//        chapter three; +10% vehicle sale money; 10% discounts; RydeMe/Scooter Bros/metro;
//        keep car+garage after cancelling; PS5 + Xbox Series X|S; Account > GTA+ Boosts toggle
//        https://www.computerbase.de/news/gaming/gta-6-rockstar-verkauft-vorteile-im-singleplayer-per-abo.100440/
//  [PSG] PlayStation Store GTA+ one-month listing (US) — $7.99; "Certain in-game benefits
//        require compatible games on PlayStation 5"
//        https://store.playstation.com/en-us/concept/10008506
//  [PST] PlayStation offer terms — digital Standard/Ultimate bought on or before Nov 19, 2026;
//        redeem by Mar 31, 2027; new/lapsed/current members; auto-renews at regular price;
//        one per account; Ultimate upgrade not eligible
//        https://playstation.com/support/games/gta-vi-offer-terms/
//  [XW]  Xbox Wire — Xbox pre-orders before 23:59:59 Nov 19 include a GTA+ month; 180 days; one
//        per Platform Account; not for child accounts with age restrictions
//        https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/
export const gtaPlusPage: InfoPageData = {
  path: "/gta-plus",
  title: "GTA+ in GTA 6: Price, Perks & Free Month Explained",
  description:
    "What GTA+ adds to GTA 6 single-player: the $7.99 US store price, the perks ComputerBase lists, who gets the free month and how it works on PS5 and Xbox.",
  crumb: "GTA+ in GTA 6",
  h1: ["GTA+ in", "GTA 6"],
  lede: "GTA+ is Rockstar's subscription, and it now reaches GTA VI's single-player story on console. What the perks are, what they cost and how the free month works, with each claim tied to the page it came from.",
  blocks: [
    {
      eyebrow: "Confirmed",
      title: "What Rockstar and the stores say",
      cards: [
        {
          title: "Optional benefits on console",
          badge: "Confirmed",
          body: 'Rockstar\'s GTA VI page says console GTA+ members get "optional benefits for Jason and Lucia". It lists no perks or price there.',
        },
        {
          title: "US price",
          badge: "Confirmed",
          body: "The US PlayStation Store lists a GTA+ one-month subscription at $7.99, and notes that certain in-game benefits need compatible games on PS5.",
        },
        {
          title: "Free month for early digital buyers",
          badge: "Confirmed",
          body: "PlayStation's terms: buy the digital Standard or Ultimate Edition on or before November 19, 2026, then redeem by March 31, 2027. Xbox Wire says Microsoft Store pre-orders made before 23:59:59 on November 19 included a month, redeemable within 180 days. After the free month it renews at the regular price unless cancelled.",
        },
        {
          title: "Not eligible",
          badge: "Confirmed",
          body: "PlayStation says upgrading to the Ultimate Edition does not qualify. Offers are one per account. Xbox Wire adds that child accounts with age-restricted content settings are excluded.",
        },
      ],
    },
    {
      eyebrow: "The perks",
      title: "What ComputerBase lists",
      intro: "The detailed perk list comes from ComputerBase (November 21, German, EUR pricing). We did not find it on a Rockstar page, so treat the details as reported.",
      cards: [
        {
          title: "Car and garage",
          badge: "Reported",
          body: "A widened '90 Annis Venturas BLVD Elegy and a one-vehicle garage in Crosstown, both available from Chapter 3. ComputerBase says you keep them after cancelling.",
        },
        {
          title: "Money and discounts",
          badge: "Reported",
          body: "10% more cash when selling your own vehicles, and 10% off at selected weapon and clothing stores, barbers, tattoo artists and vehicle workshops.",
        },
        {
          title: "Services",
          badge: "Reported",
          body: "RydeMe ride service, Scooter Bros vehicle service, free rental bikes and scooters, and metro discounts in Leonida. These end when the membership ends.",
        },
        {
          title: "Price in Europe",
          badge: "Reported",
          body: "EUR 7.99 a month. Benefits can be toggled in the account settings under GTA+ Boosts, per ComputerBase.",
        },
      ],
    },
    {
      eyebrow: "Not confirmed",
      title: "What we could not confirm",
      cards: [
        {
          title: "Rockstar's own perk list",
          badge: "Not confirmed",
          body: "We could not load a Rockstar page listing the GTA VI perks. Check the in-game and store terms before subscribing.",
        },
        {
          title: "PC",
          badge: "Not confirmed",
          body: "ComputerBase mentions PS5 and Xbox Series X|S only. No PC version is announced.",
        },
        {
          title: "Other regions",
          badge: "Not confirmed",
          body: "Prices beyond the US PlayStation Store and the EUR figure are not something we have seen.",
        },
      ],
    },
    {
      eyebrow: "Is it worth it?",
      title: "How to think about it",
      intro: "We do not sell GTA+ and cannot tell you what you should do, but the sources give you the pieces. Rockstar calls the benefits optional. Per ComputerBase, the car and garage stay with you if you claim both during a membership month after reaching Chapter 3, so a single month can be enough for those two items. The discounts and services run only while you are a member. The first month is free if you bought digitally by the deadline, and it renews at the regular price unless you cancel.",
    },
  ],
  faq: [
    {
      q: "Does GTA+ work in GTA 6?",
      a: "Yes, on console. Rockstar's GTA VI page says console GTA+ members get optional benefits, and ComputerBase lists the single-player perks on PS5 and Xbox Series X|S.",
    },
    {
      q: "How much is GTA+?",
      a: "The US PlayStation Store lists a one-month subscription at $7.99. ComputerBase gives EUR 7.99 a month. Other regions vary.",
    },
    {
      q: "What do you get with GTA+ in GTA 6?",
      a: "Per ComputerBase: a car and a garage from Chapter 3, 10% more money selling vehicles, 10% discounts at selected shops and workshops, ride and vehicle services, rentals and metro discounts.",
    },
    {
      q: "Who gets the free month of GTA+?",
      a: "Buyers of the digital Standard or Ultimate Edition by the end of November 19, 2026, per PlayStation's terms. Ultimate upgrades do not qualify. Xbox Wire describes the same for Microsoft Store pre-orders.",
    },
    {
      q: "When does the free GTA+ month expire?",
      a: "On PlayStation you must redeem by March 31, 2027. On Xbox, within 180 days of purchase, per Xbox Wire.",
    },
    {
      q: "Do I keep the GTA+ car if I cancel?",
      a: "ComputerBase says claimed items, the car and garage, stay with you; discounts and services end with the membership.",
    },
    {
      q: "Will I be charged after the free month?",
      a: "Yes, unless you cancel first. PlayStation's terms say it renews at the regular monthly price, and cancelling is done in Subscriptions Management before the payment date.",
    },
  ],
  sources: [
    { label: "Rockstar: Grand Theft Auto VI", url: "https://www.rockstargames.com/VI", note: "optional console GTA+ benefits" },
    { label: "PlayStation Store: GTA+ one-month subscription", url: "https://store.playstation.com/en-us/concept/10008506", note: "US price" },
    { label: "PlayStation: GTA VI GTA+ offer terms", url: "https://playstation.com/support/games/gta-vi-offer-terms/", note: "free month rules" },
    { label: "Xbox Wire: GTA VI on Xbox Cloud Gaming", url: "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/", note: "Xbox pre-order terms" },
    { label: "ComputerBase: GTA+ perks in GTA VI single-player", url: "https://www.computerbase.de/news/gaming/gta-6-rockstar-verkauft-vorteile-im-singleplayer-per-abo.100440/", note: "perk list, German" },
  ],
  links: [
    { href: "/guides/redeem-gta-plus-month-gta-6", label: "How to redeem the free month" },
    { href: "/pre-order", label: "Price & editions" },
    { href: "/news/gta-plus-single-player-benefits-gta-6", label: "Our GTA+ report" },
    { href: "/online", label: "GTA 6 online" },
    { href: "/ps5", label: "GTA 6 on PS5" },
  ],
};
