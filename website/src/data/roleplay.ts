import type { InfoPageData } from "@/data/page-types";

// Facts for /roleplay. Sources opened 2026-11-21:
//  [FV]  fivem.net — FiveM is multiplayer modification frameworks for GTA V on PC (Legacy and
//        Enhanced); consoles "not feasible" (needs PC-only interoperability); no GTA VI mention
//        https://fivem.net/
//  [GD]  Game Developer, Sept 22, 2026 — Rockstar shared mod guidelines Sept 10, 2026; multiplayer
//        mods limited to Rockstar's licensed Creator Platform unless Rockstar says otherwise;
//        apply ahead of GTA VI and to GTA V / RDR2; monetization only via approved storefronts;
//        no combining content across Rockstar games, no extending official storylines
//        https://www.gamedeveloper.com/production/-do-not-rockstar-outlines-modding-rules-before-gta-vi-touches-down
//  [IG]  Inven Global — published Sept 10 in Community Resources; guidelines don't name GTA VI;
//        unofficial ports to unsupported consoles/platforms prohibited; Creator Platform only place mods can be sold
//        https://www.invenglobal.com/articles/26384/no-exception-for-gta-6-rockstar-releases-mod-guidelines-across-all-titles
//        (Rockstar's own guidelines page did not render for us, so these are as reported.)
//  [PG]  PC Gamer, Aug 11, 2023 — Rockstar acquired Cfx.re (FiveM/RedM)
//        https://www.pcgamer.com/rockstar-buys-the-makers-of-the-gta-online-fivem-mod-it-banned-8-years-ago
//  [MS]  Microsoft Store listing — single-player experience
//  Syndicate's plan (move to GTA VI when a PC version and an official multiplayer platform exist)
//  is the site's own stated policy, from src/data/news.ts and /pc.
export const roleplayPage: InfoPageData = {
  path: "/roleplay",
  title: "GTA 6 RP & FiveM: Are There Roleplay Servers Yet?",
  description:
    "There are no GTA 6 RP servers yet. Why FiveM is GTA V only, what Rockstar's mod guidelines say, what must happen first, and where to roleplay today.",
  crumb: "GTA 6 Roleplay",
  h1: ["GTA 6", "roleplay"],
  lede: "There are no GTA 6 roleplay servers, and any server claiming to be one should be treated with suspicion. GTA VI is a single-player console game today, and FiveM, the tool most RP servers use, runs on GTA V for Windows PC. This page explains what is blocking GTA VI RP and what would have to change.",
  blocks: [
    {
      eyebrow: "Confirmed",
      title: "Why GTA VI RP does not exist yet",
      cards: [
        {
          title: "FiveM is for GTA V on PC",
          badge: "Confirmed",
          body: "FiveM's own site describes it as a multiplayer modification for GTA V on PC, in a Legacy and an Enhanced version. Its FAQ says consoles are not feasible because it depends on mechanisms only the PC platform has. The site does not mention GTA VI.",
        },
        {
          title: "GTA VI is single-player on consoles",
          badge: "Confirmed",
          body: "GTA VI launched on PS5 and Xbox Series X|S, and the Microsoft Store describes it as a single-player experience. There is no PC version and no online mode to build a server on.",
        },
        {
          title: "Rockstar owns Cfx.re",
          badge: "Confirmed",
          body: "PC Gamer reported on August 11, 2023 that Rockstar acquired Cfx.re, the team behind FiveM and RedM. The article does not say what that means for future games.",
        },
        {
          title: "Rockstar's mod guidelines",
          badge: "Reported",
          body: "Game Developer and Inven Global report that Rockstar published mod guidelines on September 10, 2026. Multiplayer modding is limited to Rockstar's licensed Creator Platform unless Rockstar says otherwise, and unofficial ports to unsupported platforms are barred. The guidelines do not name GTA VI, per Inven. We could not load Rockstar's own page, so this is as reported.",
        },
      ],
    },
    {
      eyebrow: "Not confirmed",
      title: "What has not been announced",
      cards: [
        {
          title: "A GTA VI PC version",
          badge: "Not confirmed",
          body: "Not announced. See our PC page for the unconfirmed report.",
        },
        {
          title: "Multiplayer in GTA VI",
          badge: "Not confirmed",
          body: "No online mode or date has been detailed. See our GTA 6 online page.",
        },
        {
          title: "FiveM or a Creator Platform for GTA VI",
          badge: "Not confirmed",
          body: "We found no announcement that FiveM or any multiplayer-mod platform will support GTA VI.",
        },
      ],
    },
    {
      eyebrow: "Our read",
      title: "What would have to happen first",
      intro: "This is our reading of the facts above, not an announcement.",
      steps: [
        "A PC version of GTA VI would need to exist, since FiveM-style tools are a PC technology.",
        "A multiplayer foundation would need to exist, since there is no online mode today.",
        "Rockstar would need to open a licensed route for community servers on GTA VI, since its guidelines send multiplayer mods through the Creator Platform.",
      ],
      note: "Syndicate RP's stated plan: stay on GTA V for PC, and move to GTA VI when a PC version and an official multiplayer platform both exist.",
    },
    {
      eyebrow: "Roleplay today",
      title: "Where to roleplay right now",
      bullets: [
        "On PC: GTA V with FiveM. That is where Syndicate RP runs; see the server page for its current status.",
        "On PS5 or Xbox: GTA Online on GTA V. It is not FiveM, but it is multiplayer. We are forming a console crew for it.",
        "Avoid anyone selling GTA VI RP access now. Nothing in the sources above makes it possible.",
      ],
    },
  ],
  faq: [
    {
      q: "Are there GTA 6 RP servers?",
      a: "No. GTA VI is single-player on PS5 and Xbox Series X|S, has no PC version, and has no announced online mode. FiveM supports GTA V on PC only.",
    },
    {
      q: "Is there FiveM for GTA 6?",
      a: "Not announced. FiveM's site describes it as a modification for GTA V on PC and does not mention GTA VI.",
    },
    {
      q: "Can I play GTA RP on PS5 or Xbox?",
      a: "Not on FiveM: FiveM's FAQ says offering it on consoles is not feasible. You can play GTA Online on GTA V on console, but that is not a custom roleplay server.",
    },
    {
      q: "When will GTA 6 RP servers launch?",
      a: "No date exists. A PC version, a multiplayer foundation and a licensed route for community servers would all be needed, and none has been announced.",
    },
    {
      q: "What do Rockstar's mod guidelines say about multiplayer?",
      a: "As reported by Game Developer and Inven Global, Rockstar's September 10, 2026 guidelines limit multiplayer modding to its licensed Creator Platform unless Rockstar says otherwise. They do not name GTA VI. We could not read Rockstar's page directly.",
    },
    {
      q: "Does Rockstar own FiveM?",
      a: "Rockstar acquired Cfx.re, the developer of FiveM and RedM, as PC Gamer reported on August 11, 2023.",
    },
    {
      q: "Where can I roleplay in GTA right now?",
      a: "On PC, GTA V with FiveM, such as Syndicate RP. On console, GTA Online on GTA V.",
    },
  ],
  sources: [
    { label: "FiveM", url: "https://fivem.net/", note: "platform and console FAQ" },
    { label: "Game Developer: Rockstar outlines modding rules", url: "https://www.gamedeveloper.com/production/-do-not-rockstar-outlines-modding-rules-before-gta-vi-touches-down", note: "reports the Sept 10 guidelines" },
    { label: "Inven Global: Rockstar releases mod guidelines", url: "https://www.invenglobal.com/articles/26384/no-exception-for-gta-6-rockstar-releases-mod-guidelines-across-all-titles", note: "reports the Sept 10 guidelines" },
    { label: "PC Gamer: Rockstar buys the makers of FiveM", url: "https://www.pcgamer.com/rockstar-buys-the-makers-of-the-gta-online-fivem-mod-it-banned-8-years-ago", note: "Aug 11, 2023" },
    { label: "Microsoft Store: Grand Theft Auto VI (US)", url: "https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn", note: "single-player wording" },
  ],
  links: [
    { href: "/gta-v", label: "Syndicate RP on GTA V" },
    { href: "/crew", label: "Console crew" },
    { href: "/pc", label: "GTA 6 on PC" },
    { href: "/mods", label: "GTA 6 mods" },
    { href: "/online", label: "GTA 6 online" },
    { href: "/system-requirements", label: "PC requirements" },
  ],
};
