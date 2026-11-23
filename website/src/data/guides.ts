import type { InfoPageData } from "@/data/page-types";

// Guides for /guides/[slug]. Slugs become URLs: never change once published.
// Only topics we could source are here. Dropped for lack of a source: redeeming
// the Vintage Vice City Pack (no redemption page found).
// Sources opened 2026-11-21:
//  [VGC] https://www.videogameschronicle.com/guide/gta-6-psa-heres-how-gta-6-autosave-works/ (Nov 19)
//  [MG]  https://www.method.gg/gta-6/gta-6-how-to-save-your-game-is-there-autosave
//  [IBT] https://www.ibtimes.com.au/gta-6-how-save-game-manual-autosave-1878933
//        No Rockstar save page found. Slot counts differ: VGC says 15 slots with autosave
//        inside them; MG and IBT say 15 manual plus a separate autosave. Prologue
//        restriction is secondhand (IBT cites Game Rant). Don't pick a side — show the gap.
//  [PSS] https://www.playstation.com/en-us/support/hardware/ps5-manage-storage-space/ (PS5 delete steps,
//        Customize, USB extended storage can't run PS5 games)
//  [PSF] https://www.playstation.com/en-us/GTAVIfeatures/ (212GB)
//  [XWS] https://news.xbox.com/en-us/2020/09/24/xbox-series-x-and-xbox-series-s-custom-storage-solution-primer/
//  [NB]  Notebookcheck Xbox size report
//  [PST] https://playstation.com/support/games/gta-vi-offer-terms/ (redeem steps)
//  [XW]  Xbox Wire Nov 10; [MS] Microsoft Store listing ($20 upgrade etc.)
//  [P1]  https://www.player.one/gta-6s-free-month-gta-has-two-deadlines-ps5-players-should-watch-auto-renewal-164537
//        (Xbox menu path: profile icon > Offers & credits; reported, not official)
export type Guide = InfoPageData & {
  slug: string;
  tagline: string; // one line for the /guides hub
  // Present when the content is a procedure: becomes HowTo JSON-LD.
  howTo?: { name: string; steps: { name: string; text: string }[] };
};

const ms = {
  label: "Microsoft Store: Grand Theft Auto VI (US)",
  url: "https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn",
};
const xw = {
  label: "Xbox Wire: GTA VI on Xbox Cloud Gaming",
  url: "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
};
const pst = {
  label: "PlayStation: GTA VI GTA+ offer terms",
  url: "https://playstation.com/support/games/gta-vi-offer-terms/",
};
const psf = {
  label: "PlayStation: GTA VI features",
  url: "https://www.playstation.com/en-us/GTAVIfeatures/",
};

const saveSteps = [
  "Open the pause menu. On PS5 that is the Options button, on Xbox the Menu button.",
  "Go to the Game tab and choose Save Game.",
  "Pick an empty slot, or overwrite an old one if you do not need it.",
  "Wait for the save to finish before you close the menu or quit.",
];

const freeSteps = [
  "From the PS5 home screen, open Settings, then Storage, to see how much space is free.",
  "Go to Console Storage, then Games and Apps.",
  "Select a game you can spare and choose Delete. You can re-download purchases from your library later.",
  "If a game shows Customize beside its name, you can delete only parts of it, such as finished sections or add-ons, and keep the rest.",
  "Repeat until the free space is above 212GB, then start the download.",
];

const psRedeem = [
  "Buy the digital Standard or Ultimate Edition on PlayStation Store. Eligible purchases were made on or before November 19, 2026.",
  "Look for the confirmation email with redemption instructions.",
  "Open the GTA+ product page on PlayStation Store.",
  "Follow the on-screen steps. The month costs nothing extra, and the screens show the date billing would start.",
  "Redeem by March 31, 2027. To avoid the paid renewal, cancel in Subscriptions Management in your account settings before the next payment date.",
];

const xboxRedeem = [
  "Buy GTA VI on the Microsoft Store. Pre-orders made before 23:59:59 on November 19, 2026 included the GTA+ month, per Xbox Wire.",
  "Open the Microsoft Store, select your profile icon at the top left, and choose Offers & credits. Player.One reports this path; Microsoft's own page we opened does not spell it out.",
  "Claim the month within 180 days of your purchase.",
];

const cloudSteps = [
  "Buy GTA VI on the Microsoft Store. Xbox Wire says the game must be purchased separately.",
  "Get cloud playtime. Xbox Wire says that from November 11 players in supported markets can buy cloud playtime without a Game Pass subscription.",
  "Open the game on Xbox Cloud Gaming from your Xbox One or Xbox Series X|S and choose Stream.",
];

export const guides: Guide[] = [
  {
    slug: "how-to-save-in-gta-6",
    tagline: "Manual saves, autosave and what launch-week guides disagree on.",
    path: "/guides/how-to-save-in-gta-6",
    title: "How to Save in GTA 6: Manual Saves & Autosave",
    description:
      "How to save in GTA 6: pause menu steps, autosave, when saving is blocked, and where launch-week guides disagree. No official Rockstar page found.",
    crumb: "How to save",
    h1: ["How to save in", "GTA 6"],
    lede: "Open the pause menu, go to the Game tab and choose Save Game. Autosave exists but players report it is inconsistent, so save by hand. We found no Rockstar page on saving, so this guide rests on launch-week guides, and we flag where they disagree.",
    howTo: {
      name: "How to save manually in GTA 6",
      steps: [
        { name: "Open the pause menu", text: saveSteps[0] },
        { name: "Choose Save Game", text: saveSteps[1] },
        { name: "Pick a slot", text: saveSteps[2] },
        { name: "Wait for it to finish", text: saveSteps[3] },
      ],
    },
    blocks: [
      {
        eyebrow: "Steps",
        title: "Save by hand",
        steps: saveSteps,
        note: "Menu names are from Video Games Chronicle and IBTimes, published at launch.",
      },
      {
        eyebrow: "Reported",
        title: "What launch-week guides say",
        cards: [
          {
            title: "Autosave is unreliable",
            badge: "Reported",
            body: "Video Games Chronicle (November 19) says autosave triggers infrequently, after major missions and some side missions, and that some players report it is not working as intended. It does not trigger mid-mission, per the same guide, which says Rockstar gave a reason: it stops players saving at an in-game choice and then checking the other options. On November 23 Rockstar's first patch (01.002.002) listed an autosave fix, per Push Square; we have not tested whether it resolved the problem, so keep saving by hand.",
          },
          {
            title: "No manual saves during missions",
            badge: "Reported",
            body: "Method.gg says you cannot save during an active mission; finish or cancel it from the pause menu and saving returns.",
          },
          {
            title: "The prologue",
            badge: "Reported",
            body: "Method.gg and IBTimes say manual saving is off during the opening prologue and unlocks around Jason's house at the marina, after the first job for Brian. IBTimes credits Game Rant for this, so treat it as secondhand.",
          },
          {
            title: "How many slots?",
            badge: "Not confirmed",
            body: "The guides disagree. VGC says there are 15 slots and autosave takes one of them. IBTimes and Method.gg say 15 manual slots plus a separate autosave. We found no official figure.",
          },
        ],
      },
      {
        eyebrow: "Cloud saves",
        title: "Cloud backup",
        intro: "The Microsoft Store listing shows Xbox cloud saves, and Method.gg recommends enabling cloud saves so you can load an earlier one if a file is damaged. Players have reported lost progress; see our day-3 report for what had and had not been confirmed.",
      },
    ],
    faq: [
      {
        q: "Does GTA 6 have autosave?",
        a: "Yes, but Video Games Chronicle reports it triggers infrequently and inconsistently, and some players say it is not working as intended. Rockstar's first patch on November 23 lists an autosave fix, per Push Square. Save manually as well.",
      },
      {
        q: "How do you save in GTA 6?",
        a: "Open the pause menu, go to the Game tab, choose Save Game and pick a slot. On PS5 the pause button is Options, on Xbox it is Menu.",
      },
      {
        q: "How many save slots does GTA 6 have?",
        a: "Guides disagree: 15 slots including autosave per Video Games Chronicle, or 15 manual slots plus a separate autosave per IBTimes and Method.gg. No official number found.",
      },
      {
        q: "Can I save during a mission?",
        a: "Not according to launch guides: finish or cancel the mission first. Autosave also does not fire mid-mission.",
      },
      {
        q: "Why can't I save at the start of the game?",
        a: "Guides report manual saving is disabled during the prologue and unlocks after the first job for Brian, around Jason's marina house. One of them credits Game Rant, so it is secondhand.",
      },
      {
        q: "Are there cloud saves?",
        a: "The Microsoft Store listing shows Xbox cloud saves, and Method.gg recommends enabling cloud saves as a backup.",
      },
    ],
    sources: [
      { label: "Video Games Chronicle: how GTA 6 autosave works", url: "https://www.videogameschronicle.com/guide/gta-6-psa-heres-how-gta-6-autosave-works/", note: "Nov 19" },
      { label: "Method.gg: how to save your game", url: "https://www.method.gg/gta-6/gta-6-how-to-save-your-game-is-there-autosave" },
      { label: "IBTimes: how to save in GTA 6", url: "https://www.ibtimes.com.au/gta-6-how-save-game-manual-autosave-1878933", note: "cites Game Rant and GamesRadar" },
      ms,
    ],
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/news/gta-6-day-3-confirmed-vs-unconfirmed", label: "Day 3: save problems report" },
      { href: "/60fps", label: "GTA 6 60fps" },
      { href: "/ps5", label: "GTA 6 on PS5" },
    ],
  },
  {
    slug: "gta-6-install-size-and-storage",
    tagline: "How much space GTA 6 needs, and how to free it on PS5.",
    path: "/guides/gta-6-install-size-and-storage",
    title: "GTA 6 Install Size & Storage: 212GB Free Space Guide",
    description:
      "How much space GTA 6 needs: 212GB on PS5 per PlayStation, an unconfirmed Xbox size, plus steps to free space on PS5 and where Xbox games can run from.",
    crumb: "Install size & storage",
    h1: ["GTA 6 install size", "& storage"],
    lede: "PlayStation says to clear at least 212GB on PS5. Xbox's listing shows no size, so the Xbox figure is unconfirmed. Below are the numbers and the PS5 steps for making room.",
    howTo: {
      name: "How to free up space on PS5 for GTA 6",
      steps: freeSteps.map((t, i) => ({ name: `Step ${i + 1}`, text: t })),
    },
    blocks: [
      {
        eyebrow: "The numbers",
        title: "How much space you need",
        cards: [
          {
            title: "PS5",
            badge: "Confirmed",
            body: "PlayStation's GTA VI page says to clear a minimum of 212GB of storage space on PS5. It gives no separate figure for installed play.",
          },
          {
            title: "Xbox Series X|S",
            badge: "Not confirmed",
            body: "The Microsoft Store listing we opened shows no size. Notebookcheck reported about 209.86GB on November 7 from the Xbox Store, plus a larger 225.34GB figure in leaked data, and called neither confirmed. Do not apply the 212GB number to Xbox.",
          },
          {
            title: "PC",
            badge: "Not confirmed",
            body: "No PC version is announced, so there is no PC size.",
          },
        ],
      },
      {
        eyebrow: "PS5 steps",
        title: "Free up space on PS5",
        steps: freeSteps,
        note: "From PlayStation's own support page on managing PS5 storage. PS5 games cannot be played directly from USB extended storage; PlayStation says to move them back to console storage or an M.2 SSD first.",
      },
      {
        eyebrow: "Xbox",
        title: "Where Xbox games can run from",
        intro: "Xbox's 2020 storage guide says Series X|S-optimized games should run from the internal SSD or the Seagate Storage Expansion Card, and describes USB drives for Xbox One, Xbox 360 and original Xbox games. That is an old article, so check Xbox's current support pages for your console. We could not load current Xbox uninstall steps, so we do not give any.",
      },
    ],
    faq: [
      {
        q: "How much space does GTA 6 need on PS5?",
        a: "PlayStation's GTA VI page says to clear a minimum of 212GB of storage space on PS5.",
      },
      {
        q: "How big is GTA 6 on Xbox Series S and X?",
        a: "Not confirmed. The Microsoft Store listing shows no size. Notebookcheck reported about 209.86GB on the Xbox Store, with a larger 225.34GB in leaked data.",
      },
      {
        q: "Can I run GTA 6 from an external drive?",
        a: "On PS5, no: PlayStation says PS5 games cannot be played directly from USB extended storage; move them to console storage or an M.2 SSD. Xbox's 2020 guide lists the internal SSD or the Expansion Card for Series X|S-optimized games.",
      },
      {
        q: "Can I delete part of a PS5 game?",
        a: "If the game shows Customize in Games and Apps, yes: you can delete parts such as add-ons or finished sections and keep the rest.",
      },
      {
        q: "If I delete a game, do I lose it?",
        a: "On PS5 you can re-download purchases from your game library, per PlayStation's support page.",
      },
    ],
    sources: [
      { ...psf, note: "212GB" },
      { label: "PlayStation Support: manage PS5 console storage", url: "https://www.playstation.com/en-us/support/hardware/ps5-manage-storage-space/", note: "delete steps, USB limits" },
      { label: "Xbox Wire: Series X|S storage primer (2020)", url: "https://news.xbox.com/en-us/2020/09/24/xbox-series-x-and-xbox-series-s-custom-storage-solution-primer/", note: "where optimized games run" },
      { label: "Notebookcheck: Xbox file size report", url: "https://www.notebookcheck.net/GTA-6-Xbox-file-size-leak-differs-from-PS5-with-release-day-patch-possible.1444302.0.html", note: "reported, not confirmed" },
      ms,
    ],
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/ps5", label: "GTA 6 on PS5" },
      { href: "/xbox", label: "GTA 6 on Xbox" },
      { href: "/system-requirements", label: "PC requirements" },
    ],
  },
  {
    slug: "which-gta-6-edition-to-buy",
    tagline: "Standard, Ultimate or the $20 upgrade: what each gets you.",
    path: "/guides/which-gta-6-edition-to-buy",
    title: "Which GTA 6 Edition to Buy: Standard vs Ultimate",
    description:
      "Standard ($79.99) or Ultimate ($99.99)? What the extra $20 buys, the Ultimate upgrade add-on on Xbox, the Vintage Vice City Pack and GTA+ month rules.",
    crumb: "Which edition",
    h1: ["Which GTA 6 edition", "to buy"],
    lede: "Standard is the full game. Ultimate adds in-game items for $20 more on the US stores. Here is what is actually in each, how the upgrade add-on works, and which offers an upgrade does not qualify for.",
    blocks: [
      {
        eyebrow: "Side by side",
        title: "Standard vs Ultimate",
        table: {
          head: ["What you get", "Standard", "Ultimate"],
          rows: [
            ["US price", "$79.99", "$99.99"],
            ["The full game", "Yes", "Yes"],
            ["Extra vehicles, weapons, outfits, hairstyles, tattoos", "No", "Yes"],
            ["Classic car collection and five special destinations", "No", "Yes"],
          ],
        },
        note: "US PlayStation Store and Microsoft Store listings, checked November 21, 2026. UK PlayStation prices are in our price page.",
      },
      {
        eyebrow: "Details",
        title: "What changes the choice",
        cards: [
          {
            title: "Ultimate Edition Upgrade (Xbox)",
            badge: "Confirmed",
            body: "The US Microsoft Store lists an Ultimate Edition Upgrade add-on at $20.00, separate from the Ultimate Edition at $99.99. We did not check whether PlayStation sells the same upgrade.",
          },
          {
            title: "Vintage Vice City Pack",
            badge: "Confirmed",
            body: "The former pre-order bonus is a separate $4.99 add-on on the US Microsoft Store. It is not part of either edition's price. We did not re-check the PlayStation price today.",
          },
          {
            title: "GTA+ free month",
            badge: "Confirmed",
            body: "Digital buyers of either edition by November 19 can claim a free month. PlayStation says upgrading to Ultimate does not qualify, so an upgrade bought later earns no extra month.",
          },
          {
            title: "Single-player only",
            badge: "Confirmed",
            body: "Neither edition includes an online mode, because the game has none. The store listing calls it a single-player experience.",
          },
        ],
      },
      {
        eyebrow: "A way to decide",
        title: "Two questions",
        steps: [
          "Do you want the Ultimate-only items, such as extra vehicles, weapons, Vice City-style outfits, hairstyles and tattoos? If not, Standard is the full game.",
          "Is $20 more fine for them? If yes, Ultimate. On Xbox you can also add the upgrade later, per the store listing.",
        ],
        note: "We do not earn anything from either edition. Our price page has an interactive picker.",
      },
    ],
    faq: [
      {
        q: "What is the difference between GTA 6 Standard and Ultimate?",
        a: "Both include the full game. Per the US PlayStation Store, Ultimate adds extra vehicles such as the '95 Grotti Cheetah, extra weapons, Vice City-style outfits, hairstyles and tattoos, a classic car collection and five special destinations, for $20 more.",
      },
      {
        q: "Can I upgrade from Standard to Ultimate later?",
        a: "The US Microsoft Store lists an Ultimate Edition Upgrade add-on at $20.00. We did not confirm the equivalent on PlayStation.",
      },
      {
        q: "Does the Ultimate upgrade get the free GTA+ month?",
        a: "No. PlayStation's offer terms say upgrading to Ultimate does not qualify. The offer is for the digital Standard or Ultimate Edition bought by November 19.",
      },
      {
        q: "Is the Vintage Vice City Pack in Ultimate?",
        a: "No. The US Microsoft Store sells it separately at $4.99, and Xbox Wire says pre-orders used to include it.",
      },
      {
        q: "Is the Ultimate Edition worth it?",
        a: "Only if you want the extra items; the story is in Standard. The difference is $20 on the US stores.",
      },
      {
        q: "Is there a physical edition?",
        a: "Rockstar's GTA VI page lists a Vice City Collection collector's box. We did not verify what it contains or its price; our price page covers the disc question.",
      },
    ],
    sources: [
      ms,
      { label: "PlayStation Store: GTA VI Ultimate Edition (US)", url: "https://store.playstation.com/en-us/concept/10000730", note: "Ultimate contents and prices" },
      { label: "Rockstar: Grand Theft Auto VI", url: "https://www.rockstargames.com/VI", note: "editions, add-on, collector's box listed" },
      pst,
      xw,
    ],
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/pre-order", label: "Price & editions" },
      { href: "/gta-plus", label: "GTA+ in GTA 6" },
      { href: "/xbox", label: "GTA 6 on Xbox" },
    ],
  },
  {
    slug: "redeem-gta-plus-month-gta-6",
    tagline: "Claim the free GTA+ month on PS5 or Xbox, with the deadlines.",
    path: "/guides/redeem-gta-plus-month-gta-6",
    title: "How to Redeem the Free GTA+ Month in GTA 6 (PS5 & Xbox)",
    description:
      "Steps to redeem the free GTA+ month from a GTA 6 digital purchase on PS5 and Xbox, the March 31, 2027 and 180-day deadlines, and the renewal catch.",
    crumb: "Redeem GTA+ month",
    h1: ["Redeem the free", "GTA+ month"],
    lede: "If you bought the digital game by the end of November 19, you can claim one free month of GTA+. PlayStation's steps come from its own terms page; the Xbox menu path is reported by a third party. The offer cannot be earned by buying now.",
    howTo: {
      name: "How to redeem the free GTA+ month on PlayStation",
      steps: psRedeem.map((t, i) => ({ name: `Step ${i + 1}`, text: t })),
    },
    blocks: [
      {
        eyebrow: "PlayStation",
        title: "On PS5",
        steps: psRedeem,
        note: "Source: PlayStation's GTA VI offer terms. Offer is available in all PlayStation country stores except Bahrain, China, Kuwait, Lebanon, Oman, Qatar and Russia. It is one redemption per account, cannot be transferred, and must be claimed on the account used to buy the game. New, lapsed and current members can all claim; current members get the month added to their subscription.",
      },
      {
        eyebrow: "Xbox",
        title: "On Xbox",
        steps: xboxRedeem,
        note: "Xbox Wire: one per Platform Account, and not available to child accounts with age-restricted content settings.",
      },
      {
        eyebrow: "Watch out",
        title: "Deadlines and renewal",
        cards: [
          {
            title: "Two different deadlines",
            badge: "Confirmed",
            body: "PlayStation: redeem by March 31, 2027. Xbox: within 180 days of purchase. Do not assume one platform's date applies to the other.",
          },
          {
            title: "It renews",
            badge: "Confirmed",
            body: "After the free month, PlayStation's terms say it becomes a paid monthly subscription at the regular price unless you cancel first.",
          },
          {
            title: "Too late to qualify by buying now",
            badge: "Confirmed",
            body: "PlayStation's terms require a purchase on or before November 19, 2026. Upgrading to the Ultimate Edition does not qualify.",
          },
          {
            title: "Xbox menu path",
            badge: "Reported",
            body: "The Offers & credits path comes from Player.One, which links to Rockstar's support page for the steps. We could not open that Rockstar page, so check it if the menu differs.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "How do I redeem the free GTA+ month on PS5?",
        a: "After buying the digital game by November 19, open the GTA+ product page on the PlayStation Store and follow the on-screen steps. Redeem by March 31, 2027.",
      },
      {
        q: "How do I redeem it on Xbox?",
        a: "Player.One reports the path is the Microsoft Store profile icon, then Offers & credits, within 180 days of purchase. Xbox Wire gives the 180-day limit.",
      },
      {
        q: "Can I still get the free month if I buy GTA 6 now?",
        a: "No. PlayStation's terms require buying the digital Standard or Ultimate Edition on or before November 19, 2026. Xbox Wire gives a cutoff of 23:59:59 that day.",
      },
      {
        q: "Will I be charged after the free month?",
        a: "Yes, unless you cancel before the next payment date. It renews at the regular monthly price, and the redemption screens show when billing starts.",
      },
      {
        q: "Does upgrading to Ultimate give me the free month?",
        a: "No, according to PlayStation's terms. Only the digital Standard or Ultimate Edition purchase qualifies.",
      },
      {
        q: "Can I use it if I already have GTA+?",
        a: "On PlayStation, yes: current members get the month added to their existing subscription.",
      },
    ],
    sources: [
      { ...pst, note: "PlayStation steps, deadline, renewal" },
      { ...xw, note: "Xbox 180-day rule and limits" },
      { label: "Player.One: the two deadlines", url: "https://www.player.one/gta-6s-free-month-gta-has-two-deadlines-ps5-players-should-watch-auto-renewal-164537", note: "Xbox menu path; reported" },
    ],
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/gta-plus", label: "GTA+ in GTA 6" },
      { href: "/pre-order", label: "Price & editions" },
      { href: "/ps5", label: "GTA 6 on PS5" },
      { href: "/xbox", label: "GTA 6 on Xbox" },
    ],
  },
  {
    slug: "play-gta-6-on-xbox-one-cloud",
    tagline: "GTA 6 does not install on Xbox One; here is how streaming works.",
    path: "/guides/play-gta-6-on-xbox-one-cloud",
    title: "Play GTA 6 on Xbox One With Cloud Gaming",
    description:
      "GTA 6 cannot be installed on Xbox One, but you can stream it. What to buy, how cloud playtime works without Game Pass, and what graphics to expect.",
    crumb: "Xbox One cloud",
    h1: ["Play GTA 6 on Xbox One", "via cloud"],
    lede: "GTA VI does not run natively on Xbox One. Xbox Wire says Xbox One and Series X|S owners can stream it with Xbox Cloud Gaming, if the game is bought and cloud playtime is available in their market.",
    howTo: {
      name: "How to play GTA 6 on Xbox One with cloud gaming",
      steps: cloudSteps.map((t, i) => ({ name: `Step ${i + 1}`, text: t })),
    },
    blocks: [
      {
        eyebrow: "Steps",
        title: "Get streaming",
        steps: cloudSteps,
      },
      {
        eyebrow: "Good to know",
        title: "Limits and unknowns",
        cards: [
          {
            title: "Series S graphics settings",
            badge: "Confirmed",
            body: "Xbox Wire says the game uses Series S graphics settings when streamed.",
          },
          {
            title: "Market and device limits",
            badge: "Confirmed",
            body: "Xbox Wire says availability, purchase options, supported devices and account eligibility vary by market and device.",
          },
          {
            title: "Game Pass",
            badge: "Confirmed",
            body: "Game Pass does not include the game, per Xbox's product page. A Game Pass subscription can supply cloud hours once you own it.",
          },
          {
            title: "Session limits and ads",
            badge: "Not confirmed",
            body: "Xbox's product page mentions session limits and ad-supported play as ways to stream, but that page is partly out of date, so check the current terms.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Can I play GTA 6 on Xbox One?",
        a: "Only by streaming. Xbox's product page says it does not run natively on Xbox One. Xbox Wire says Xbox One can play it through Xbox Cloud Gaming.",
      },
      {
        q: "Do I need Game Pass to stream GTA 6?",
        a: "No. From November 11, players in supported markets can buy cloud playtime without a Game Pass subscription, per Xbox Wire. You still must buy the game.",
      },
      {
        q: "What graphics does the cloud version use?",
        a: "Xbox Series S graphics settings, per Xbox Wire.",
      },
      {
        q: "Is GTA 6 free on Game Pass?",
        a: "No. It is not included and must be purchased.",
      },
      {
        q: "Does it work in every country?",
        a: "No. Xbox Wire says availability and eligibility vary by market and device.",
      },
    ],
    sources: [
      { ...xw, note: "cloud details" },
      { label: "Xbox: Grand Theft Auto VI product page", url: "https://www.xbox.com/en-US/games/grand-theft-auto-vi", note: "Xbox One and Game Pass FAQ; partly out of date" },
      ms,
    ],
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/xbox", label: "GTA 6 on Xbox" },
      { href: "/pre-order", label: "Price & editions" },
      { href: "/60fps", label: "GTA 6 60fps" },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
