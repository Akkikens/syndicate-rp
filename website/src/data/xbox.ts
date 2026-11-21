import type { InfoPageData } from "@/data/page-types";

// Facts for /xbox. Every claim maps to a page opened 2026-11-21:
//  [MS]   Microsoft Store listing, US — https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn
//         (edition prices, $20 Ultimate Edition Upgrade add-on, $4.99 Vintage Vice City Pack,
//          "Optimized for Xbox Series X|S", HDR10 / ray tracing / Dolby Atmos, cloud saves,
//          "a single-player experience", no install size shown, not tagged Game Pass)
//  [XW]   Xbox Wire, Nov 10 — https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/
//         (Xbox One cloud only, Series S "most affordable way to play", cloud uses Series S settings,
//          cloud playtime without Game Pass from Nov 11, must be purchased separately,
//          pre-orders before 23:59:59 Nov 19 include Vintage pack + one GTA+ month, 180 days)
//  [XP]   Xbox product page — https://www.xbox.com/en-US/games/grand-theft-auto-vi
//         (Game Pass FAQ: not included, must purchase; "does not run natively on Xbox One").
//         That page is partly stale (ESRB pending) so only its FAQ is used, paired with [XW].
//  [NB]   Notebookcheck, Nov 7 — https://www.notebookcheck.net/GTA-6-Xbox-file-size-leak-differs-from-PS5-with-release-day-patch-possible.1444302.0.html
//         (Xbox size ~209.86 GB reported; 225.34 GB from leaked catalog data; unconfirmed)
//  [PS]   https://www.playstation.com/en-us/GTAVIfeatures/ (212GB is PlayStation wording only)
//  [EN]   Engadget, Nov 18 — https://www.engadget.com/2321134/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision/
export const xboxPage: InfoPageData = {
  path: "/xbox",
  title: "GTA 6 on Xbox: Series X vs S, Price, Game Pass, Cloud",
  description:
    "GTA 6 on Xbox Series X|S: $79.99 Standard, $99.99 Ultimate, not on Game Pass, Xbox One cloud play, single-player only, and what is still unconfirmed.",
  crumb: "GTA 6 on Xbox",
  h1: ["GTA 6 on", "Xbox"],
  lede: "GTA VI is out now on Xbox Series X|S, and Xbox One players can stream it. Here is what the Microsoft Store and Xbox Wire say about price, Game Pass, cloud play and online, plus the things nobody has confirmed yet, like the Xbox install size.",
  blocks: [
    {
      eyebrow: "Confirmed",
      title: "What the Microsoft Store and Xbox Wire say",
      cards: [
        {
          title: "Plays natively on Series X and Series S",
          badge: "Confirmed",
          body: "The US Microsoft Store listing carries the Optimized for Xbox Series X|S badge and lists HDR10, ray tracing and Dolby Atmos support. Xbox Wire calls Series S the most affordable way to play GTA VI natively on Xbox.",
        },
        {
          title: "Price",
          badge: "Confirmed",
          body: "On the US Microsoft Store the Standard Edition starts at $79.99 and the Ultimate Edition at $99.99. The Ultimate Edition Upgrade is also sold as a separate $20.00 add-on, and the Vintage Vice City Pack is $4.99. Prices in other regions differ.",
        },
        {
          title: "Not on Game Pass",
          badge: "Confirmed",
          body: "Xbox's own product page says GTA VI is not included in Game Pass and must be purchased. Xbox Wire says the same: the game is a separate purchase.",
        },
        {
          title: "Single-player",
          badge: "Confirmed",
          body: "The Microsoft Store description calls GTA VI a single-player experience, and no multiplayer mode is listed. Cloud saves and achievements are listed.",
        },
      ],
    },
    {
      eyebrow: "Xbox One and cloud",
      title: "Xbox One can only stream it",
      intro: "GTA VI does not install on Xbox One. Xbox Wire says Xbox One and Series X|S owners can play it through Xbox Cloud Gaming, with day-one cloud play opening at 1am ET on November 19.",
      cards: [
        {
          title: "Cloud playtime",
          badge: "Confirmed",
          body: "Since November 11, players in supported markets can buy cloud playtime without a Game Pass subscription, per Xbox Wire. You still need to buy the game. Availability varies by market and device.",
        },
        {
          title: "Cloud graphics",
          badge: "Confirmed",
          body: "When streamed, GTA VI uses the Series S graphics settings, per Xbox Wire.",
        },
      ],
      note: "Step by step: see our guide to playing GTA 6 on Xbox One with cloud gaming.",
    },
    {
      eyebrow: "Not confirmed",
      title: "What we could not confirm",
      cards: [
        {
          title: "Xbox install size",
          badge: "Not confirmed",
          body: "The Microsoft Store listing we opened shows no install size. Notebookcheck reported on November 7 that the Xbox Store listed about 209.86GB, and that leaked catalog data showed a larger 225.34GB figure; it called neither confirmed. The 212GB figure is PlayStation's wording for PS5 only.",
        },
        {
          title: "Series X vs Series S differences",
          badge: "Not confirmed",
          body: "Microsoft's pages do not state any resolution or performance difference between the two consoles. Rockstar told Kotaku there is no 60fps or 40fps mode on any launch console, per Engadget.",
        },
        {
          title: "Online and roleplay",
          badge: "Not confirmed",
          body: "No GTA VI online mode has been detailed, so there is nothing to cross-play or roleplay in yet. GTA Online, the multiplayer mode of GTA V, is a separate game.",
        },
        {
          title: "Xbox cloud gaming for GTA V",
          badge: "Reported",
          body: "Xbox Wire says Rockstar plans to add GTA V and Red Dead Redemption 2 to Xbox Cloud Gaming in the coming months. No date is given.",
        },
      ],
    },
    {
      eyebrow: "Pre-order content",
      title: "The pre-order bonus on Xbox",
      intro: "Xbox Wire says pre-orders made on the Microsoft Store before 23:59:59 on November 19, 2026 included the Vintage Vice City Pack and one month of GTA+. The GTA+ month must be redeemed within 180 days, is limited to one per Platform Account, and is not available to child accounts with age-restricted content settings.",
    },
  ],
  faq: [
    {
      q: "Is GTA 6 on Xbox Series S?",
      a: "Yes. GTA VI plays natively on Xbox Series X and Series S. Xbox Wire calls the Series S the most affordable way to play it natively. Microsoft has not published a performance comparison between the two.",
    },
    {
      q: "Is GTA 6 on Xbox Game Pass?",
      a: "No. Xbox's product page says it is not included and must be purchased, and Xbox Wire says the game is a separate purchase. Game Pass cloud hours can be used to stream it once you own it.",
    },
    {
      q: "Can I play GTA 6 on Xbox One?",
      a: "Only by streaming. It does not run natively on Xbox One, but Xbox Cloud Gaming supports Xbox One and Series X|S. You need to buy the game and have cloud playtime, which Xbox Wire says can be bought without Game Pass in supported markets.",
    },
    {
      q: "How much does GTA 6 cost on Xbox?",
      a: "The US Microsoft Store lists the Standard Edition from $79.99 and the Ultimate Edition from $99.99. An Ultimate Edition Upgrade add-on is listed at $20.00. Other regions vary.",
    },
    {
      q: "How big is GTA 6 on Xbox?",
      a: "Not confirmed. The listing we opened shows no size. Notebookcheck reported about 209.86GB on the Xbox Store on November 7, with a larger 225.34GB figure in leaked data. Leave at least 212GB free as a safe starting point, since that is the PlayStation figure, and check your own console's store page.",
    },
    {
      q: "Does GTA 6 have online multiplayer on Xbox?",
      a: "The Microsoft Store calls it a single-player experience and lists no multiplayer mode. See our GTA 6 online page for what Take-Two has said.",
    },
    {
      q: "Does GTA 6 run at 60fps on Xbox Series X?",
      a: "No. Rockstar told Kotaku that no 60fps or 40fps mode is coming to any launch console, per Engadget on November 18. See our 60fps page.",
    },
  ],
  sources: [
    { label: "Microsoft Store: Grand Theft Auto VI (US)", url: "https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn", note: "prices, add-ons, badges, single-player wording" },
    { label: "Xbox Wire: GTA VI on Xbox Cloud Gaming", url: "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/", note: "cloud play, Series S, pre-order terms" },
    { label: "Xbox: Grand Theft Auto VI product page", url: "https://www.xbox.com/en-US/games/grand-theft-auto-vi", note: "Game Pass FAQ only; parts of the page are out of date" },
    { label: "Notebookcheck: Xbox file size report", url: "https://www.notebookcheck.net/GTA-6-Xbox-file-size-leak-differs-from-PS5-with-release-day-patch-possible.1444302.0.html", note: "reported, not confirmed" },
    { label: "PlayStation: GTA VI features", url: "https://www.playstation.com/en-us/GTAVIfeatures/", note: "212GB is a PlayStation figure" },
    { label: "Engadget: no 60fps mode", url: "https://www.engadget.com/2321134/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision/", note: "reports Rockstar's statement to Kotaku" },
  ],
  links: [
    { href: "/ps5", label: "GTA 6 on PS5" },
    { href: "/60fps", label: "GTA 6 60fps" },
    { href: "/pre-order", label: "Price & editions" },
    { href: "/online", label: "GTA 6 online" },
    { href: "/guides/play-gta-6-on-xbox-one-cloud", label: "Xbox One cloud guide" },
  ],
};
