import type { InfoPageData } from "@/data/page-types";

// Facts for /online. Sources opened 2026-11-21:
//  [MS]  Microsoft Store listing — "a single-player experience", no multiplayer listed
//        https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn
//  [GB]  GTAboom — Zelnick at Sept 17, 2026 shareholder meeting: single-player at launch,
//        no online mode, "no recurrent consumer spending" at launch, no timeline,
//        GTA V online "continues to be a robust business"
//        https://www.gtaboom.com/take-two-confirms-gta-6-has-no-online-mode-or-recurrent-spending-at-launch-fcad
//  [NC]  Notebookcheck + ARY — "well after single-player" line is a ResetEra transcription;
//        Zelnick quotes were about GTA V Online; "1-2 years" is Paul Tassi's (Forbes) prediction
//        https://www.notebookcheck.net/Take-Two-hints-GTA-6-Online-release-date-is-far-off-with-focus-on-single-player.1402004.0.html
//        https://arynews.tv/gta-6-online-will-launch-well-after-single-player-release-take-two-confirms
//  [WK]  Wikipedia GTA Online — launched Oct 1, 2013, "two weeks after" GTA V; connection
//        problems; patches Oct 5 and Oct 10; $500,000 in-game currency compensation;
//        PS5/Xbox Series X|S version on Mar 15, 2022
//        https://en.wikipedia.org/wiki/Grand_Theft_Auto_Online
//  [PSG] PlayStation Store GTA+ listing — "Online console play may require separate paid
//        platform subscription"  https://store.playstation.com/en-us/concept/10008506
export const onlinePage: InfoPageData = {
  path: "/online",
  title: "GTA 6 Online Release Date: Is There an Online Mode?",
  description:
    "GTA 6 launched single-player only. What Take-Two has said about a GTA 6 online mode, why no date exists, how GTA V's online launch went, and what to watch.",
  crumb: "GTA 6 Online",
  h1: ["GTA 6", "Online"],
  lede: "There is no GTA 6 online mode yet and no release date for one. GTA VI launched as a single-player game. This page separates what Take-Two and the store listings have said from what has only been relayed or predicted.",
  blocks: [
    {
      eyebrow: "Confirmed",
      title: "What has been said",
      cards: [
        {
          title: "Single-player at launch",
          badge: "Confirmed",
          body: "The Microsoft Store listing calls GTA VI a single-player experience and lists no multiplayer mode.",
        },
        {
          title: "No recurring spending at launch",
          badge: "Confirmed",
          body: "At Take-Two's September 17, 2026 shareholder meeting, CEO Strauss Zelnick said GTA VI would launch single-player only on PS5 and Xbox Series X|S, with no online mode and no microtransactions, per GTAboom. He gave no timeline for an online mode.",
        },
        {
          title: "GTA Online (GTA V) continues",
          badge: "Confirmed",
          body: "GTAboom reports that Zelnick called GTA V's online component a robust business and said it is not going away. That is about the existing game, not a GTA VI mode.",
        },
        {
          title: "GTA+ in single-player",
          badge: "Reported",
          body: "GTA+ now has GTA VI single-player perks, per ComputerBase. That is a story-mode subscription benefit, not an online mode. See our GTA+ page.",
        },
      ],
    },
    {
      eyebrow: "Not confirmed",
      title: "What nobody has confirmed",
      cards: [
        {
          title: "A release date",
          badge: "Not confirmed",
          body: "Rockstar and Take-Two have given no date, name or format for an online mode in GTA VI.",
        },
        {
          title: '"Well after" the campaign',
          badge: "Reported",
          body: "Some outlets say Take-Two indicated online would come well after the campaign. That line traces to a forum user's transcription of the shareholder meeting, and Notebookcheck notes the CEO quotes concerned GTA V's online. Treat it as secondhand.",
        },
        {
          title: "Predictions of a 2027 date",
          badge: "Not confirmed",
          body: "Predicted windows, such as 2027, come from commentators, not from Take-Two. We do not repeat them as expectations.",
        },
      ],
    },
    {
      eyebrow: "Precedent, not a promise",
      title: "How GTA V did it",
      intro: "GTA V launched in September 2013 and GTA Online followed on October 1, 2013, about two weeks later, per Wikipedia. The launch was rough: many players could not connect, Rockstar patched on October 5 and 10, and it gave connected players GTA$500,000 as compensation. GTA V is one data point. It says nothing about when, or whether, GTA VI will follow the same pattern.",
    },
    {
      eyebrow: "What to play now",
      title: "Multiplayer today",
      bullets: [
        "GTA Online runs on GTA V, including PS5 and Xbox Series X|S versions that launched on March 15, 2022, per Wikipedia.",
        "The PlayStation Store notes that online console play may require a separate paid platform subscription. Check the store page for your console.",
        "Roleplay servers run on the PC version of GTA V, not GTA VI. See our roleplay page.",
        "On console and want people to play with? We are forming a console crew.",
      ],
    },
    {
      eyebrow: "Watch for",
      title: "Where an announcement would appear",
      bullets: [
        "Rockstar's newswire, where it announced the game's launch details.",
        "Take-Two's earnings releases and calls, where Zelnick has taken questions about GTA Online.",
        "Store listings: the single-player wording would change if multiplayer were added.",
      ],
    },
  ],
  faq: [
    {
      q: "Is there a GTA 6 online mode?",
      a: "Not yet. GTA VI launched as a single-player game on November 19, 2026, and the store listings describe it as a single-player experience. No online mode has been detailed.",
    },
    {
      q: "When is the GTA 6 online release date?",
      a: "No date exists. Zelnick gave no timeline for an online mode at the September 17 shareholder meeting, per GTAboom. Any specific date you see is a prediction.",
    },
    {
      q: "Will there be a GTA Online 2?",
      a: "Rockstar has not announced a successor to GTA Online under any name. Take-Two has only said GTA V's online mode continues to run.",
    },
    {
      q: "Is GTA Online shutting down because of GTA 6?",
      a: "No. Per GTAboom, Zelnick said GTA V's online component is still a strong business and is not going away.",
    },
    {
      q: "How long did GTA Online take after GTA V launched?",
      a: "About two weeks: GTA V came out in September 2013 and GTA Online opened on October 1, 2013, per Wikipedia. That is precedent only and does not predict GTA VI.",
    },
    {
      q: "Can I play with friends in GTA 6?",
      a: "Not in a shared online world. GTA VI is single-player. For multiplayer today you would use GTA Online on GTA V.",
    },
    {
      q: "Will GTA 6 have microtransactions?",
      a: "Zelnick said there is no recurring consumer spending anticipated for this single-player launch, per GTAboom. Separately, the store lists in-game purchases and GTA+ perks exist, so check the listing.",
    },
  ],
  sources: [
    { label: "Microsoft Store: Grand Theft Auto VI (US)", url: "https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn", note: "single-player wording" },
    { label: "GTAboom: Take-Two confirms no online mode at launch", url: "https://www.gtaboom.com/take-two-confirms-gta-6-has-no-online-mode-or-recurrent-spending-at-launch-fcad", note: "shareholder meeting, Sept 17" },
    { label: "Notebookcheck: Take-Two hints online is far off", url: "https://www.notebookcheck.net/Take-Two-hints-GTA-6-Online-release-date-is-far-off-with-focus-on-single-player.1402004.0.html", note: "secondhand transcription, with caveats" },
    { label: "ARY News: online will launch well after single-player", url: "https://arynews.tv/gta-6-online-will-launch-well-after-single-player-release-take-two-confirms", note: "relays a forum post, not official" },
    { label: "Wikipedia: Grand Theft Auto Online", url: "https://en.wikipedia.org/wiki/Grand_Theft_Auto_Online", note: "GTA V precedent and dates" },
    { label: "PlayStation Store: GTA+ one-month listing", url: "https://store.playstation.com/en-us/concept/10008506", note: "platform subscription wording" },
    { label: "ComputerBase: GTA+ in GTA VI single-player", url: "https://www.computerbase.de/news/gaming/gta-6-rockstar-verkauft-vorteile-im-singleplayer-per-abo.100440/", note: "German" },
  ],
  links: [
    { href: "/roleplay", label: "GTA 6 roleplay" },
    { href: "/crew", label: "Console crew" },
    { href: "/gta-plus", label: "GTA+ in GTA 6" },
    { href: "/news/gta-6-single-player-at-launch-no-online", label: "Our launch report" },
    { href: "/faq", label: "Full FAQ" },
  ],
};
