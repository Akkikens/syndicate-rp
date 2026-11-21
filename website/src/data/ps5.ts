import type { Faq } from "@/data/faq";

// Facts for /ps5. Every claim here was read on the PlayStation Store listing
// (US, checked 2026-11-20), the PlayStation Store GTA V page, fivem.net, or
// Rockstar's launch announcement. Where we couldn't confirm something, the
// copy says so — don't "fill in" details without a source.
export const ps5Facts = {
  buying: {
    intro:
      "GTA VI is on the PlayStation Store for PS5 and PS5 Pro. It is not available on PS4. Rockstar's launch announcement also lists the Microsoft Store, Rockstar Games Store, and retailers worldwide.",
    formats: [
      {
        title: "Digital",
        body: "Buy on the PlayStation Store and download. The store listing is the quickest way to see your local price.",
      },
      {
        title: "Boxed",
        body: "Rockstar confirmed in June 2026 that boxed copies contain a download code, not a disc. You redeem the code and still download the game.",
      },
    ],
  },
  performance: [
    {
      title: "Confirmed",
      items: [
        "Rockstar is targeting 30fps on current consoles.",
        "PS5 Pro is listed as PS5 Pro Enhanced, with PSSR (PlayStation Spectral Super Resolution) and ray-traced shadows. A compatible display is required.",
      ],
    },
    {
      title: "Not confirmed",
      items: [
        "A 60fps or other performance mode: none has been announced.",
        "PS5 Pro resolution and other PS5 vs PS5 Pro differences beyond the two features above.",
      ],
    },
  ],
  storage:
    "The PlayStation Store listing says you need at least 212GB of free space on your PS5 to download GTA VI. Check the listing for your region before you start.",
  online: [
    "GTA VI is a single-player experience, per the PlayStation Store listing. No GTA VI online mode has been detailed.",
    "FiveM-style roleplay servers are PC-only. FiveM's own FAQ says offering it on consoles is not feasible, so there is no FiveM on PS5.",
    "GTA Online, the multiplayer mode of GTA V, is available on PS5 today. The PlayStation Store lists PS Plus as required for online play.",
  ],
};

export const ps5Faq: Faq[] = [
  {
    q: "Does GTA 6 run at 60fps on PS5?",
    a: "No 60fps mode has been announced. Rockstar is targeting 30fps on current consoles.",
  },
  {
    q: "Is there a PS5 Pro version of GTA 6?",
    a: "It runs on PS5 Pro and the PlayStation Store lists it as PS5 Pro Enhanced, with PSSR and ray-traced shadows. A compatible display is required. We haven't found official details beyond that.",
  },
  {
    q: "Is there a GTA 6 disc for PS5?",
    a: "No. Boxed copies contain a download code, not a disc, per Rockstar's June 2026 confirmation. Any disc release later is unconfirmed.",
  },
  {
    q: "Is GTA 6 on PS4?",
    a: "No. The PlayStation Store listing says it will not be available for PS4 consoles.",
  },
  {
    q: "Do I need PlayStation Plus to play GTA 6?",
    a: "The PlayStation Store listing doesn't list PS Plus as a requirement for GTA VI, which is single-player. PS Plus is required for online play in GTA Online on GTA V. Check the store listing for the latest terms.",
  },
  {
    q: "Is there cross-play between PS5 and Xbox or PC?",
    a: "GTA VI is single-player, so there is no multiplayer to cross-play, and no GTA VI online mode has been detailed. A PC version hasn't been announced either.",
  },
  {
    q: "Can I move my GTA 6 save to PC later?",
    a: "Not announced. There is no PC version yet, and we haven't seen any statement about transferring saves.",
  },
  {
    q: "Can I play GTA RP on PS5?",
    a: "Not on a FiveM server: FiveM is PC-only. On PS5 you can play GTA Online (GTA V), which needs PS Plus. Join our Discord crew for the PS5 community we're forming.",
  },
];
