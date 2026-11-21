import type { InfoPageData } from "@/data/page-types";

// /crew is the site's own community policy, not a claim about the game. It
// describes a crew that is FORMING: no member counts, no schedule, no Rockstar
// crew link, and no promise of dates. The only outside fact is that GTA Online
// runs on PS5 and Xbox Series X|S (Wikipedia, GTA Online page, opened 2026-11-21)
// and that GTA VI has no online mode (store listing; see /online).
export const crewPage: InfoPageData = {
  path: "/crew",
  title: "GTA 6 Console Crew: Join the Syndicate PS5 & Xbox Crew",
  description:
    "Syndicate is forming a console crew for PS5 and Xbox players: GTA Online on GTA V now, GTA VI online later. How it will run, plus the code of conduct.",
  crumb: "Console crew",
  h1: ["The Syndicate", "console crew"],
  lede: "We are forming a crew for PS5 and Xbox players who like car culture, racing and roleplay-style play. It is new, so there is nothing to count or schedule yet. This page says what the crew is for, how we plan to run it, and the rules we will hold it to.",
  blocks: [
    {
      eyebrow: "Who it is for",
      title: "Console players, today and later",
      cards: [
        {
          title: "Now: GTA Online on GTA V",
          body: "GTA Online runs on PS5 and Xbox Series X|S, so that is where a console crew can actually play together today. Online console play may need a paid platform subscription; check your console's store.",
        },
        {
          title: "Later: GTA VI online, when it exists",
          body: "GTA VI is single-player and has no announced online mode. If and when one arrives, the crew will move with it. We will not pretend to run GTA VI sessions before then.",
        },
        {
          title: "Not for: FiveM roleplay on console",
          body: "FiveM is a PC tool for GTA V. For the PC server, see the Syndicate RP page.",
        },
        {
          title: "Open to all skill levels",
          body: "You do not need to be good, or to own the Ultimate Edition. You do need to be decent to other people.",
        },
      ],
    },
    {
      eyebrow: "How it will run",
      title: "Our plan",
      intro: "These are intentions for a crew that is just starting, not a schedule.",
      bullets: [
        "Discord is the hub: announcements, finding people to play with, and posting when a session is planned.",
        "Crew sessions: informal GTA Online sessions organised in Discord, with whoever is around.",
        "Car meets: the same car-culture idea as our PC server, adapted to what console GTA Online allows.",
        "We will post the first plans in Discord when there are enough people to make them worthwhile.",
      ],
      note: "No member count, schedule or crew link is published because none exists yet. We will add them here when they do.",
    },
    {
      eyebrow: "Code of conduct",
      title: "The rules we will hold the crew to",
      steps: [
        "Be respectful. No harassment, slurs, hate speech or targeting of other players, in voice or text.",
        "Keep it friendly on the road. Griefing people who did not opt in is out; consensual chaos at organised events is fine.",
        "No cheating, modding or exploit-sharing in the crew, and nothing that breaks the game's terms.",
        "Protect privacy. Do not share anyone's personal information, and do not ask others for yours.",
        "No scams, trading for real money or account selling. We never ask members for payment details.",
        "Keep content suitable for a mixed-age community. Follow Discord's and your console's rules.",
        "Respect the organisers' calls. Mods can remove people who break these rules.",
      ],
    },
    {
      eyebrow: "How to join",
      title: "Joining is one step",
      intro: "Join our Discord and say which console you play on. If the Discord link is not live yet, follow our YouTube for the go-live alert.",
    },
  ],
  faq: [
    {
      q: "What is the Syndicate console crew?",
      a: "A community we are forming for PS5 and Xbox players, based in Discord, for GTA Online on GTA V today and GTA VI online if it exists later.",
    },
    {
      q: "Is the crew live?",
      a: "It is forming. There is no member count or schedule yet, and we will not publish any until they exist.",
    },
    {
      q: "Do I need GTA 6 to join?",
      a: "No. GTA Online runs on GTA V. GTA VI is single-player and has no announced online mode.",
    },
    {
      q: "Is there a Rockstar Social Club crew?",
      a: "Not yet. We have no crew link to share and will not post one until it exists.",
    },
    {
      q: "Does the crew use FiveM?",
      a: "No. FiveM is for GTA V on PC. The console crew plays GTA Online. Our PC server has its own page.",
    },
    {
      q: "Do I need PS Plus or Xbox online access?",
      a: "Possibly. The PlayStation Store notes that online console play may require a separate paid platform subscription. Check your console's store.",
    },
    {
      q: "Does it cost anything?",
      a: "No. Joining the crew is free and we never ask for payment details.",
    },
  ],
  sources: [
    { label: "Wikipedia: Grand Theft Auto Online", url: "https://en.wikipedia.org/wiki/Grand_Theft_Auto_Online", note: "PS5 and Xbox Series X|S versions" },
    { label: "PlayStation Store: GTA+ one-month listing", url: "https://store.playstation.com/en-us/concept/10008506", note: "platform subscription wording" },
    { label: "Microsoft Store: Grand Theft Auto VI (US)", url: "https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn", note: "single-player wording" },
  ],
  links: [
    { href: "/gta-v", label: "Syndicate RP on GTA V" },
    { href: "/ps5", label: "GTA 6 on PS5" },
    { href: "/xbox", label: "GTA 6 on Xbox" },
    { href: "/online", label: "GTA 6 online" },
    { href: "/roleplay", label: "GTA 6 roleplay" },
  ],
};
