import type { InfoPageData } from "@/data/page-types";

// Facts for /system-requirements. Sources opened 2026-11-21:
//  [RS]  rockstargames.com/VI — store buttons list PlayStation 5 and Xbox Series X|S only
//        https://www.rockstargames.com/VI
//  [PS]  PlayStation GTA VI features page — "a minimum of 212GB" to clear on PS5
//        https://www.playstation.com/en-us/GTAVIfeatures/
//  [NB]  Notebookcheck Nov 7 — Xbox size ~209.86GB reported, unconfirmed
//  [ST1] Steam RDR2 listing via Steam appdetails API (app 1174180): Steam date 5 Dec 2019;
//        min Win10 64-bit, i5-2500K / FX-6300, 8GB RAM, GTX 770 2GB / R9 280 3GB, 150GB;
//        rec i7-4770K / Ryzen 5 1500X, 12GB RAM, GTX 1060 6GB / RX 480 4GB, 150GB
//        https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/
//  [ST2] Steam GTA V Legacy listing (app 271590): Steam date 13 Apr 2015; min Core 2 Quad Q6600,
//        4GB RAM, 9800 GT 1GB, 125GB; rec i5-3470 / FX-8350, 8GB RAM, GTX 660 2GB, 125GB
//        https://store.steampowered.com/app/271590/Grand_Theft_Auto_V_Legacy/
//  PC status itself (no announcement) is the site's existing /pc page; we only link it.
export const requirementsPage: InfoPageData = {
  path: "/system-requirements",
  title: "GTA 6 PC System Requirements: None Official Yet",
  description:
    "There are no official GTA 6 PC system requirements because no PC version is announced. The only hard number is console storage, plus past Rockstar specs.",
  crumb: "System requirements",
  h1: ["GTA 6 PC", "requirements"],
  lede: "There are no official GTA 6 PC system requirements, because Rockstar has not announced a PC version. Anyone quoting a GTA 6 minimum or recommended spec is guessing. Here is the one real number there is, and clearly labelled context from Rockstar's earlier PC releases.",
  blocks: [
    {
      eyebrow: "Confirmed",
      title: "What is actually known",
      cards: [
        {
          title: "Platforms",
          badge: "Confirmed",
          body: "Rockstar's GTA VI page offers PlayStation 5 and Xbox Series X|S. No PC version has been announced. Our PC page tracks the unconfirmed reports.",
        },
        {
          title: "Console storage: PS5",
          badge: "Confirmed",
          body: "PlayStation's GTA VI page says to clear a minimum of 212GB of storage on PS5. That is the only first-party size figure we found.",
        },
        {
          title: "Console storage: Xbox",
          badge: "Not confirmed",
          body: "The Microsoft Store listing we opened shows no size. Notebookcheck reported about 209.86GB on November 7 and called it unconfirmed.",
        },
        {
          title: "Specs for CPU, GPU, RAM",
          badge: "Not confirmed",
          body: "None published for any platform. Console storage does not translate into PC requirements either.",
        },
      ],
    },
    {
      eyebrow: "Precedent, not a forecast",
      title: "What Rockstar's earlier PC listings asked for",
      intro: "These are the current Steam listings for two earlier Rockstar games. They show how the studio has written requirements before. They are not GTA VI numbers, and a new engine can ask for much more or less.",
      table: {
        head: ["Game (Steam date)", "Minimum", "Recommended", "Storage"],
        rows: [
          ["Grand Theft Auto V (Apr 13, 2015)", "4GB RAM, Core 2 Quad Q6600, GeForce 9800 GT 1GB", "8GB RAM, Core i5-3470, GTX 660 2GB", "125GB"],
          ["Red Dead Redemption 2 (Dec 5, 2019)", "8GB RAM, Core i5-2500K, GTX 770 2GB", "12GB RAM, Core i7-4770K, GTX 1060 6GB", "150GB"],
        ],
      },
      note: "Both rows are as listed on Steam today, which can differ from the day each game launched. The Steam dates are Steam release dates, not each game's first PC release.",
    },
    {
      eyebrow: "Can my PC run it?",
      title: "What you can and cannot know today",
      bullets: [
        "Nobody can tell you yet whether a given PC will run GTA 6, because no PC build or spec sheet exists publicly.",
        "Do not trust spec lists on sites that cite no Rockstar page. We found none from Rockstar.",
        "Watch Rockstar's own GTA VI page and newswire for a PC announcement; official requirements would appear there or on a store listing.",
        "If you want to play with a community while you wait, GTA V roleplay on PC is running today.",
      ],
    },
  ],
  faq: [
    {
      q: "What are the GTA 6 PC system requirements?",
      a: "There are none official. GTA VI launched on PS5 and Xbox Series X|S, and no PC version has been announced, so Rockstar has published no PC minimum or recommended spec.",
    },
    {
      q: "Can my PC run GTA 6?",
      a: "Nobody can say yet. There is no PC build and no official spec. Rockstar's past PC listings are context only.",
    },
    {
      q: "How much storage does GTA 6 need?",
      a: "On PS5, PlayStation says to clear a minimum of 212GB. The Xbox listing shows no size; Notebookcheck reported about 209.86GB, unconfirmed. There is no PC figure.",
    },
    {
      q: "Will GTA 6 need an SSD on PC?",
      a: "Not announced. Rockstar has published no PC requirements at all.",
    },
    {
      q: "What did Red Dead Redemption 2 need on PC?",
      a: "Its Steam listing today shows a minimum of 8GB RAM, a Core i5-2500K and GTX 770 2GB, and a recommended 12GB RAM, Core i7-4770K and GTX 1060 6GB, with 150GB of storage. That is precedent, not GTA VI.",
    },
    {
      q: "Is GTA 6 coming to PC?",
      a: "Not announced. See our GTA 6 PC page for what has been said and the unconfirmed Q1 2027 report.",
    },
  ],
  sources: [
    { label: "Rockstar: Grand Theft Auto VI", url: "https://www.rockstargames.com/VI", note: "platforms offered" },
    { label: "PlayStation: GTA VI features", url: "https://www.playstation.com/en-us/GTAVIfeatures/", note: "212GB figure" },
    { label: "Notebookcheck: Xbox file size report", url: "https://www.notebookcheck.net/GTA-6-Xbox-file-size-leak-differs-from-PS5-with-release-day-patch-possible.1444302.0.html", note: "reported, not confirmed" },
    { label: "Steam: Red Dead Redemption 2", url: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/", note: "requirements via Steam's public store data" },
    { label: "Steam: Grand Theft Auto V Legacy", url: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V_Legacy/", note: "requirements via Steam's public store data" },
  ],
  links: [
    { href: "/pc", label: "GTA 6 on PC" },
    { href: "/roleplay", label: "GTA 6 roleplay" },
    { href: "/mods", label: "GTA 6 mods" },
    { href: "/60fps", label: "GTA 6 60fps" },
    { href: "/guides/gta-6-install-size-and-storage", label: "Install size guide" },
  ],
};
