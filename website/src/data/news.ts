export type NewsItem = {
  slug: string; // becomes /news/<slug> — never change once published
  date: string; // ISO date
  dateLabel: string;
  // ISO date of the last substantive edit. Set it when a story is corrected or
  // extended: it drives dateModified, og:modified_time and the "Updated" line.
  updated?: string;
  // Optional <title> / meta description when the headline or summary don't fit
  // search snippets (title <= 60 chars, description 120-155).
  seoTitle?: string;
  seoDescription?: string;
  title: string;
  summary: string;
  // Full article paragraphs for the /news/<slug> page. Plain text.
  body: string[];
  tag: "Official" | "Trailer" | "Business" | "Rumor Watch";
  source?: { label: string; url: string };
  // Internal pages this story should push readers (and crawlers) toward.
  related?: { href: string; label: string }[];
};

// Newest first. Add new items to the top as the story develops.
export const news: NewsItem[] = [
  {
    slug: "gta-6-first-patch-01-002-002",
    seoTitle: "GTA 6 first patch 01.002.002: autosave, crash fixes",
    seoDescription: "Rockstar's first GTA VI patch, 01.002.002, fixes crashes and autosave on PS5 and Xbox Series X|S. Roughly 604 MB on PS5, per a dataminer.",
    date: "2026-11-23",
    dateLabel: "November 23, 2026",
    title: "GTA 6 first patch 01.002.002 fixes autosave, crashes and phone calls",
    summary:
      "Rockstar has published notes for GTA VI's first post-launch update on PS5 and Xbox Series X|S. It targets crashes, autosave, stuck weather and a few mission blockers. It does not mention a save-wipe bug.",
    body: [
      "Rockstar's first post-launch update for GTA VI began rolling out on Monday, November 23, 2026. It is version 01.002.002 on PS5 (1.0.2.2 on Xbox), according to Push Square, Vice and PlayStation LifeStyle. Push Square says Rockstar has now published the full notes.",
      "What it fixes, per the notes as reported: several crashes; weather that stopped changing for long stretches; autosave not working correctly; phone calls that failed to trigger, including story calls and calls that unlock missions; players unable to lose their Wanted Level; the Gym deadlift bar being unusable; and partners not handing over bags, which blocked selling them to fences.",
      "Size and rollout: dataminer Tex2 puts the download at about 603.8 MB on PS5 and 1.6 GB on Xbox. Push Square and Vice relay Tex2's account of a phased PS5 rollout, roughly a third of players first, then more after about three hours and everyone after about six. Rockstar hasn't confirmed that schedule, so if you don't see the update yet, check again later.",
      "What it doesn't say: the only save-related item is the autosave fix. Our day-3 story covered player reports of lost progress; the patch notes as reported don't mention a save-wipe bug or recovery of lost saves. PlayStation LifeStyle adds that the money glitch still works for some players, a player observation rather than a Rockstar statement.",
      "Still not announced: a PC version and a GTA VI online mode.",
    ],
    tag: "Official",
    source: {
      label: "Push Square",
      url: "https://www.pushsquare.com/news/2026/11/first-gta-6-ps5-patch-live-now-get-all-the-details-here",
    },
    related: [
      { href: "/guides", label: "GTA 6 guides" },
      { href: "/ps5", label: "GTA 6 on PS5" },
      { href: "/faq", label: "GTA 6 FAQ" },
    ],
  },
  {
    slug: "gta-6-day-3-confirmed-vs-unconfirmed",
    seoTitle: "GTA 6 day 3: what's confirmed and what isn't",
    seoDescription: "Players report lost progress, but Rockstar hasn't confirmed a save-wipe bug or fix as of Saturday. A viral Nov 25 update claim has no Rockstar statement.",
    date: "2026-11-21",
    dateLabel: "November 21, 2026",
    title: "GTA 6 day 3: what's confirmed and what isn't (save bug, Nov 25 update, sales)",
    summary:
      "Players report lost progress, but as of Saturday morning Rockstar hasn't confirmed a save-wipe bug or issued a fix. A viral claim of a big November 25 update has no Rockstar statement behind it.",
    body: [
      "Three days after launch, here is where things stand as of Saturday, November 21, 2026.",
      "Save problems: Some players report losing progress. Video Games Chronicle (November 19) says some players lost the early part of their progress and that autosave doesn't always fire as expected, and recommends saving manually: open the menu, go to Game, and choose save. It lists 15 save slots by default, one reserved for autosave. HappyGamer's day-3 live blog (updated November 21) says some PS5 and Xbox players report losing hours of progress after crashes, and that Rockstar has not confirmed a save-wipe bug or issued a fix as of Saturday morning.",
      "Rumor watch: a viral post claims Rockstar apologized for lag and promised a big update on November 25. HappyGamer found no Rockstar statement, and a community note on the post says the same. Treat it as unconfirmed. HappyGamer also says no patch notes have been published.",
      "Sales, two different numbers: Take-Two says GTA VI made about $3.79 billion in day-one retail sales (a company estimate; see our launch story). Separately, Sensor Tower, a third-party tracker, estimated about 24.58 million copies and roughly $2.36 billion through launch day, split 75% PlayStation and 25% Xbox, per TweakTown. TweakTown notes Take-Two hasn't confirmed Sensor Tower's figures and that they exclude refunds. They are different measures from different sources.",
      "Still not announced: a PC version (HappyGamer says none has been announced) and a GTA VI online mode. Our earlier PC story covers the unconfirmed Q1 2027 report.",
    ],
    tag: "Rumor Watch",
    source: {
      label: "HappyGamer day 3 live updates",
      url: "https://happygamer.com/gta-6-day-3-live-updates-177471/",
    },
    related: [
      { href: "/faq", label: "GTA 6 FAQ" },
      { href: "/release-date", label: "GTA 6 release date & launch" },
      { href: "/pc", label: "GTA 6 on PC" },
    ],
  },
  {
    slug: "gta-plus-single-player-benefits-gta-6",
    seoTitle: "GTA+ adds GTA VI single-player perks, ComputerBase says",
    seoDescription: "Per ComputerBase, GTA+ adds a car, a garage and discounts to GTA VI's story mode for EUR 7.99 a month. Digital buyers before Nov 20 get a free month.",
    date: "2026-11-21",
    dateLabel: "November 21, 2026",
    title: "GTA+ now has GTA VI single-player perks, ComputerBase reports",
    summary:
      "Per ComputerBase, GTA+ adds a car, a garage and discounts in GTA VI's story mode for EUR 7.99 a month. Digital buyers before November 20 can redeem one free month.",
    body: [
      "ComputerBase reports (November 21) that GTA+ benefits now apply to GTA VI's single-player campaign, on PS5 and Xbox Series X|S. The article doesn't mention PC.",
      "The price it gives is EUR 7.99 per month. Benefits it lists: a '90 Annis Venturas BLVD Elegy sports car and a one-vehicle garage in Crosstown (available from Chapter 3), 10% more money when selling your own vehicles, 10% discounts at selected weapon and clothing stores, barbers, tattoo artists and vehicle workshops, RydeMe and Scooter Bros services, and free rental bikes and scooters plus metro discounts.",
      "Free month: ComputerBase says buyers of the digital Standard or Ultimate Edition who purchased before November 20, 2026, including pre-orders, can redeem one free month. On PS5 it must be redeemed by March 31, 2027 in the PlayStation Store; on Xbox, within 180 days of purchase. After that it renews at EUR 7.99 a month unless cancelled.",
      "Cancelling: claimed items, the car and garage, are kept; ongoing discounts and services end with the membership. Benefits can be toggled under Settings, Account, GTA+ Boosts. We have not independently confirmed these terms on a Rockstar page; check the in-game and store terms before subscribing. We haven't seen a US price.",
    ],
    tag: "Business",
    source: {
      label: "ComputerBase (German)",
      url: "https://www.computerbase.de/news/gaming/gta-6-rockstar-verkauft-vorteile-im-singleplayer-per-abo.100440/",
    },
    related: [
      { href: "/pre-order", label: "Price & editions" },
      { href: "/ps5", label: "GTA 6 on PS5" },
    ],
  },
  {
    slug: "gta-6-launches-first-day-sales",
    seoTitle: "GTA VI launches: Take-Two reports ~$3.79B day-one sales",
    seoDescription: "GTA VI launched November 19 on PS5 and Xbox Series X|S. Take-Two says about $3.79 billion in day-one retail sales, a company estimate, not revenue.",
    date: "2026-11-20",
    dateLabel: "November 20, 2026",
    title: "GTA VI is out: Take-Two reports about $3.79 billion in day-one retail sales",
    summary:
      "Grand Theft Auto VI launched November 19 on PS5 and Xbox Series X|S. Take-Two says it made about $3.79 billion in retail sales on day one — a company estimate of what shoppers spent, not revenue.",
    body: [
      "Grand Theft Auto VI launched on Thursday, November 19, 2026. Rockstar's launch announcement says the game is available worldwide for PlayStation 5 and Xbox Series X|S, from the PlayStation Store, Microsoft Store, Rockstar Games Store, and retailers.",
      "On November 20, Take-Two said GTA VI made about $3.79 billion in retail sales on its first day, calling it a record for an entertainment launch. Motley Fool notes it is a company estimate of what shoppers spent at retail through the end of November 19, not Take-Two's revenue, since retailers and console makers take a cut.",
      "Take-Two also said the game sold 32.5 million units before release. CNBC reports the company didn't say whether the day-one figure includes pre-orders, and independent estimates from Sensor Tower, which is not a company figure, differ from Take-Two's numbers.",
      "Still unannounced: a PC version and any GTA VI online mode. Investors are waiting on both, per CNBC.",
    ],
    tag: "Business",
    source: {
      label: "ABC News (Take-Two press release)",
      url: "https://abcnews.com/GMA/Culture/grand-theft-auto-vi-breaks-1st-day-sales-record/story?id=138328412",
    },
    related: [
      { href: "/release-date", label: "GTA 6 release date" },
      { href: "/ps5", label: "GTA 6 on PS5" },
      { href: "/pre-order", label: "Price & editions" },
    ],
  },
  {
    slug: "gta-6-pc-status-after-launch",
    seoTitle: "GTA 6 on PC: not announced, Q1 2027 report unconfirmed",
    seoDescription: "Take-Two's CEO said PC news comes from its labels; a GamesBeat report citing four anonymous sources points to Q1 2027. No PC version is confirmed.",
    date: "2026-11-20",
    dateLabel: "November 20, 2026",
    title: "GTA 6 on PC after launch: no announcement, and an unconfirmed Q1 2027 report",
    summary:
      "Take-Two's CEO said PC news \"always comes from our labels\"; a GamesBeat report citing four anonymous sources points to Q1 2027. Rockstar and Take-Two haven't confirmed a PC version.",
    body: [
      "GTA VI launched on consoles only, and as of November 20, 2026 no PC version has been announced. Take-Two's November 9 earnings materials listed only PS5 and Xbox Series X|S.",
      "Asked about PC, Take-Two CEO Strauss Zelnick told Variety that \"information always comes from our labels\" — meaning Rockstar. He did not confirm or date a PC release.",
      "Rumor watch: GamesBeat reported on October 13 (updated November 18) that Rockstar is targeting the first quarter of 2027 for a PC version, citing four anonymous sources. Rockstar and Take-Two have not confirmed it, so treat it as unconfirmed.",
      "For context, GTA V reached PC about 19 months after its console launch.",
    ],
    tag: "Rumor Watch",
    source: {
      label: "IBTimes UK",
      url: "https://www.ibtimes.co.uk/gta-vi-pc-release-early-2027-report-1833680",
    },
    related: [
      { href: "/pc", label: "GTA 6 on PC" },
      { href: "/gta-v", label: "Play GTA V roleplay on PC now" },
    ],
  },
  {
    slug: "gta-6-launch-fivem-roleplay-status",
    seoTitle: "GTA VI launch and FiveM roleplay: nothing announced yet",
    date: "2026-11-20",
    dateLabel: "November 20, 2026",
    title: "What GTA VI's launch means for FiveM and roleplay: nothing announced yet",
    summary:
      "FiveM is still a PC modification for GTA V, with no console version. We found no announcement of FiveM or multiplayer-mod support for GTA VI.",
    body: [
      "GTA VI launched on PS5 and Xbox Series X|S, so there is no PC version to mod yet. FiveM's own site describes it as multiplayer modification frameworks for Grand Theft Auto V, for Windows PC, and says offering FiveM on any game consoles is not feasible.",
      "Cfx.re, the team behind FiveM and RedM, joined Rockstar in August 2023, according to PC Gamer. We found no announcement, as of November 20, 2026, that FiveM or any multiplayer-mod platform will support GTA VI.",
      "For Syndicate RP, that means the server stays on GTA V for PC. We plan to move to GTA VI when a PC version and an official multiplayer platform both exist. On PS5 and want to play with us? See the PS5 guide.",
    ],
    tag: "Business",
    source: { label: "FiveM", url: "https://fivem.net/" },
    related: [
      { href: "/gta-v", label: "Syndicate RP on GTA V" },
      { href: "/ps5", label: "GTA 6 on PS5" },
      { href: "/pc", label: "GTA 6 on PC" },
    ],
  },
  {
    slug: "vice-city-sign-kaseya-center-miami",
    seoTitle: "Vice City sign now sits on the Miami Heat's arena",
    seoDescription: "Rockstar helicoptered a pink-and-white Welcome to Vice City sign onto the roof of Miami's Kaseya Center, the first piece of a citywide GTA VI campaign.",
    date: "2026-09-22",
    dateLabel: "September 22, 2026",
    title: "A giant \"Welcome to Vice City\" sign now sits on the Miami Heat's arena",
    summary:
      "Rockstar helicoptered a pink-and-white \"Welcome to Vice City\" sign onto the roof of Miami's Kaseya Center — the first piece of a citywide GTA VI campaign as launch closes in.",
    body: [
      "Grand Theft Auto VI's marketing has moved off screens and into the real Vice City. On September 22, 2026, crews used helicopters to lift a roughly 4,700-square-foot \"Welcome to Vice City\" sign, complete with the GTA VI logo, onto the roof of the Kaseya Center — home of the Miami Heat.",
      "Rockstar reportedly paid Miami-Dade County, which owns the arena, about $975,000 for the placement. The waterfront sign is big enough to read from planes heading into Miami International Airport, and reports say it could stay up until April 2027 — well past the November 19 launch.",
      "The rooftop sign is the first of several Miami activations to go live. Branding on Miami Beach and banners around downtown are expected to follow through launch season.",
    ],
    tag: "Business",
    source: {
      label: "Notebookcheck",
      url: "https://www.notebookcheck.net/GTA-6-promo-on-Miami-Heat-arena-Here-s-what-it-looks-like-and-how-much-it-cost.1407497.0.html",
    },
    related: [
      { href: "/map", label: "How Vice City maps onto Miami" },
      { href: "/release-date", label: "GTA 6 release date & countdown" },
    ],
  },
  {
    slug: "gta-6-single-player-at-launch-no-online",
    seoTitle: "GTA VI launches single-player only, no new GTA Online",
    seoDescription: "Take-Two's Strauss Zelnick said GTA VI arrives November 19 as a single-player experience with no recurrent consumer spending anticipated at launch.",
    date: "2026-09-17",
    dateLabel: "September 17, 2026",
    title: "GTA VI launches single-player only — no new GTA Online on day one",
    summary:
      "At Take-Two's shareholder meeting, Strauss Zelnick said GTA VI arrives November 19 as a single-player experience, with \"no recurrent consumer spending anticipated\" at launch. The existing GTA Online keeps running.",
    body: [
      "If you were hoping to jump into a new GTA Online on November 19, adjust expectations. At Take-Two's annual shareholder meeting on September 17, 2026, CEO Strauss Zelnick said Grand Theft Auto VI will launch as a single-player experience on PS5 and Xbox Series X|S.",
      "Zelnick added that there's \"no recurrent consumer spending anticipated with regard to this launch\" — in other words, no online economy or microtransactions at release. Take-Two has said it won't discuss the next GTA Online before launch.",
      "The existing GTA Online, built on GTA V, will keep getting support after GTA VI arrives. Pre-orders even include a free month of GTA+ for it. Historically Rockstar has launched online modes weeks after the story game: GTA Online arrived two weeks after GTA V in 2013.",
    ],
    tag: "Business",
    source: {
      label: "GTA Boom",
      url: "https://www.gtaboom.com/take-two-confirms-gta-6-has-no-online-mode-or-recurrent-spending-at-launch-fcad",
    },
    related: [
      { href: "/faq", label: "GTA 6 FAQ" },
      { href: "/gta-v", label: "Play GTA V roleplay with us now" },
    ],
  },
  {
    slug: "stephen-root-voices-brian-heder",
    seoDescription: "The King of the Hill and Office Space actor is the first GTA VI cast member to confirm a role: Brian Heder, the Keys drug runner who is Jason's landlord.",
    date: "2026-09-14",
    dateLabel: "September 14, 2026",
    title: "Stephen Root confirms he voices Brian Heder",
    summary:
      "The King of the Hill and Office Space actor is the first GTA VI cast member to publicly confirm a role — he plays Brian Heder, the old-school Keys drug runner who's Jason's landlord.",
    body: [
      "Rockstar keeps its casts sealed until launch, but veteran character actor Stephen Root has broken the silence. In an interview tied to his Emmy nomination for Widow's Bay, Root confirmed he voices Brian Heder in Grand Theft Auto VI.",
      "Brian Heder was one of the characters Rockstar revealed alongside Trailer 2: a smuggler from the golden era of Keys drug running who now lets Jason live rent-free on one of his properties in exchange for odd jobs. Root said fans had already recognized his voice from the trailer — \"there are too many people who knew me from King of the Hill and my voice.\"",
      "That makes Root the first named actor officially attached to GTA VI. Expect the full cast list to surface around launch, as it has for every Rockstar release.",
    ],
    tag: "Official",
    source: {
      label: "Push Square",
      url: "https://www.pushsquare.com/news/2026/09/the-first-gta-6-actor-has-confirmed-their-involvement-and-nobodys-surprised",
    },
    related: [{ href: "/characters", label: "Every confirmed GTA 6 character" }],
  },
  {
    slug: "gta-6-30fps-on-consoles",
    seoDescription: "Rockstar co-director Rob Nelson says GTA VI is currently targeting 30fps on all consoles. A 60fps option at launch or later is neither ruled in nor out.",
    date: "2026-08-28",
    dateLabel: "August 28, 2026",
    title: "GTA VI targets 30fps on every console — including PS5 Pro",
    summary:
      "Rockstar co-director Rob Nelson says the game is \"currently targeting 30fps on all consoles.\" A 60fps option at launch or later hasn't been ruled in or out.",
    body: [
      "After the Extended Look, the big technical question was frame rate. Rockstar's Rob Nelson answered it during a studio visit by content creators: the game is \"currently targeting 30fps on all consoles\" — PS5, PS5 Pro, and Xbox Series X|S.",
      "Nelson didn't close the door on a performance mode. He said he'd need \"to consult the technical team to determine if there will be a 60fps option at launch or later.\" Resolution and ray-tracing details weren't shared.",
      "Context matters here: the Extended Look was captured on a base PS5, and Rockstar's open worlds have historically been CPU-heavy. Don't expect a 60fps mode at launch — but a post-launch patch, or the eventual PC version, are the likely routes to higher frame rates.",
    ],
    tag: "Official",
    source: {
      label: "Push Square",
      url: "https://www.pushsquare.com/news/2026/08/gta-6-targeting-30fps-on-ps5-undecided-on-performance-mode",
    },
    related: [
      { href: "/game", label: "Everything we know about GTA 6" },
      { href: "/faq", label: "GTA 6 FAQ" },
    ],
  },
  {
    slug: "extended-look-netflix-youtube",
    seoTitle: "An Extended Look: 27 minutes of GTA VI on Netflix",
    seoDescription: "Rockstar skipped a traditional Trailer 3 and premiered a 27-minute in-game showcase on Netflix, then YouTube six hours later. It hit No. 1 on Netflix.",
    date: "2026-08-27",
    dateLabel: "August 27, 2026",
    title: "\"An Extended Look\": 27 minutes of GTA VI premieres on Netflix",
    summary:
      "Rockstar skipped a traditional Trailer 3 and premiered a 27-minute in-game showcase on Netflix, then YouTube six hours later. It hit No. 1 on Netflix and crashed both Netflix and Twitch on the night.",
    body: [
      "Instead of a third trailer, Rockstar dropped something much bigger. Grand Theft Auto VI: An Extended Look premiered exclusively on Netflix at 3 p.m. ET on August 27, 2026, then landed on Rockstar's YouTube channel and the GTA VI site at 9 p.m. ET.",
      "The roughly 27-minute presentation was captured entirely in-game on a PlayStation 5. It mixes trailer-style montages with long story cutscenes following Jason and Lucia through Leonida — robberies, racing, nightclubs, security jobs, and run-ins with Boobie Ike, Raul Bautista, and Brian Heder.",
      "Demand broke things: Netflix and Twitch both buckled on premiere night. The special went to No. 1 on Netflix with 31.1 million views in its first four days and passed 17 million YouTube views within a week. You can watch it free on our trailers page.",
    ],
    tag: "Trailer",
    source: {
      label: "Rockstar Newswire",
      url: "https://www.rockstargames.com/newswire/article/9k2kaa1o3297k9/grand-theft-auto-vi-an-extended-look",
    },
    related: [
      { href: "/trailers", label: "Watch every GTA 6 trailer" },
      { href: "/characters", label: "Who's who in the Extended Look" },
    ],
  },
  {
    slug: "take-two-q1-fy27-preorders-unprecedented",
    seoTitle: "Take-Two: GTA VI pre-orders unprecedented, Nov 19 holds",
    seoDescription: "Take-Two again listed GTA VI for November 19, 2026 and repeated $8.0-8.2B FY2027 net bookings. Zelnick called pre-orders unprecedented but gave no number.",
    date: "2026-08-07",
    dateLabel: "August 7, 2026",
    title: "Take-Two: GTA VI pre-orders are \"unprecedented\" — November 19 holds",
    summary:
      "In its first earnings report since pre-orders opened, Take-Two again listed GTA VI for November 19, 2026 and reiterated $8.0–8.2B in FY2027 net bookings. Strauss Zelnick called pre-orders \"unprecedented and astonishing\" but gave no number.",
    body: [
      "Take-Two's fiscal Q1 2027 report on August 7, 2026 was the first look at how GTA VI pre-orders were going. The answer, per CEO Strauss Zelnick: \"unprecedented and astonishing\" — though the company didn't share a unit figure.",
      "The earnings release lists Grand Theft Auto VI for PS5 and Xbox Series X|S on November 19, 2026, and the company reiterated its fiscal 2027 net bookings outlook of $8.0 to $8.2 billion, citing \"excitement around the November 19th launch.\"",
      "Zelnick also defended the $79.99 Standard / $99.99 Ultimate pricing, calling the game \"an incredible bargain\" for the amount of entertainment it delivers. With guidance this large tied to the date, another delay is very unlikely.",
    ],
    tag: "Business",
    source: {
      label: "Take-Two (SEC filing)",
      url: "https://www.sec.gov/Archives/edgar/data/0000946581/000162828026054580/ttwo1q27earningsrelease.htm",
    },
    related: [
      { href: "/release-date", label: "GTA 6 release date & countdown" },
      { href: "/pre-order", label: "GTA 6 price & editions" },
    ],
  },
  {
    slug: "preorders-open-price-editions",
    seoDescription: "Rockstar opened pre-orders with two editions; boxed copies hold a download code, not a disc. Preloading starts November 12 with the Vintage Vice City Pack.",
    date: "2026-06-25",
    dateLabel: "June 25, 2026",
    title: "GTA VI pre-orders open: $79.99 Standard, $99.99 Ultimate",
    summary:
      "Rockstar opened pre-orders with two editions and confirmed that boxed copies contain a download code instead of a disc. Preloading starts November 12; pre-orders get the Vintage Vice City Pack and a month of GTA+.",
    body: [
      "Pre-orders for Grand Theft Auto VI went live on June 25, 2026 at midnight local time, with two editions: Standard at $79.99 (£69.99 / €79.99) and Ultimate at $99.99 (£89.99 / €99.99). The Ultimate Edition adds extra clothing, vehicles, weapons, locations, and side missions.",
      "Anyone who pre-orders either edition — or buys before November 20, 2026 — gets the Vintage Vice City Pack, a set of items inspired by 2002's GTA: Vice City, plus one month of GTA+.",
      "The surprise: there's no disc. Rockstar said physical copies \"will contain a code that can be redeemed for the digital download of the game. A disc will not be included in the box.\" Boxed copies hit shelves November 12 so players can preload ahead of the November 19 launch.",
      "Notably, no Trailer 3 arrived with pre-orders. Rockstar's next big reveal turned out to be the Extended Look on August 27.",
    ],
    tag: "Official",
    source: {
      label: "Rockstar Newswire",
      url: "https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25",
    },
    related: [
      { href: "/pre-order", label: "GTA 6 price, editions & bonuses" },
      { href: "/release-date", label: "Preload & release date" },
    ],
  },
  {
    slug: "take-two-reaffirms-date-q4-earnings",
    seoDescription: "On its Q4 FY2026 call, Take-Two CEO Strauss Zelnick reconfirmed the November 19, 2026 release, with $8B+ in FY2027 revenue guidance tied to the launch.",
    date: "2026-05-21",
    dateLabel: "May 21, 2026",
    title: "Take-Two reaffirms November 19 — no more delays",
    summary:
      "On its Q4 FY2026 earnings call, Take-Two CEO Strauss Zelnick reconfirmed the November 19, 2026 release, backed by $8B+ in FY2027 revenue guidance tied directly to the launch. The date is locked.",
    body: [
      "Take-Two's Q4 fiscal 2026 earnings call put the delay rumors to rest. CEO Strauss Zelnick reconfirmed that Grand Theft Auto VI launches November 19, 2026 on PS5 and Xbox Series X|S.",
      "More telling than the words was the money: the company guided to more than $8 billion in fiscal 2027 net bookings, a number that only works if GTA VI ships in November. Publicly traded companies don't put guidance like that on a date they aren't confident in.",
    ],
    tag: "Business",
    source: {
      label: "Forbes",
      url: "https://www.forbes.com/sites/paultassi/2026/05/23/the-gta-6-release-date-is-confirmed-and-everything-weve-learned-recently/",
    },
    related: [{ href: "/release-date", label: "GTA 6 release date & countdown" }],
  },
  {
    slug: "delay-to-november-2026",
    seoDescription: "Take-Two moved the launch from May 26, 2026 to November 19, 2026, the second shift after the original Fall 2025 window. Rockstar cited polish.",
    date: "2025-11-06",
    dateLabel: "November 6, 2025",
    title: "GTA VI delayed to November 19, 2026",
    summary:
      "Take-Two announced the launch would move from May 26, 2026 to November 19, 2026 — the second shift after the original Fall 2025 window. Rockstar said the extra time is to finish the game at the level of polish players expect.",
    body: [
      "Take-Two announced that Grand Theft Auto VI would move from May 26, 2026 to November 19, 2026. It was the game's second delay: Rockstar originally targeted Fall 2025 before the first slip to May 2026.",
      "Rockstar said the extra months were needed to finish the game with the level of polish players expect. The November date has held ever since, reconfirmed on every Take-Two earnings call that followed.",
    ],
    tag: "Official",
    source: {
      label: "Rockstar Newswire",
      url: "https://www.rockstargames.com/newswire",
    },
    related: [{ href: "/release-date", label: "GTA 6 release date & countdown" }],
  },
  {
    slug: "trailer-2-jason-lucia",
    seoDescription: "Rockstar dropped Trailer 2 with new screenshots: Jason and Lucia caught in a criminal conspiracy across the state of Leonida. 475M+ views in 24 hours.",
    date: "2025-05-06",
    dateLabel: "May 6, 2025",
    title: "Trailer 2 introduces Jason & Lucia's story",
    summary:
      "Rockstar dropped Trailer 2 with a screenshot and info blowout: Jason and Lucia caught in a criminal conspiracy stretching across the state of Leonida. It pulled 475M+ views across platforms in 24 hours.",
    body: [
      "Rockstar released Grand Theft Auto VI Trailer 2 on May 6, 2025, alongside a site update with 70 screenshots and profiles for the main cast. The trailer sets up Jason Duval and Lucia Caminos as a duo on the run after an easy score goes wrong, caught in a conspiracy that stretches across Leonida.",
      "It became the biggest video launch ever, with more than 475 million views across platforms in its first 24 hours. The update also introduced Cal Hampton, Boobie Ike, Dre'Quan Priest, the Real Dimez, Raul Bautista, and Brian Heder, plus the regions of Leonida.",
    ],
    tag: "Trailer",
    source: {
      label: "Rockstar Games",
      url: "https://www.rockstargames.com/newswire/article/3928aaa9471o3a/grand-theft-auto-vi-watch-trailer-2-now",
    },
    related: [
      { href: "/trailers", label: "Watch Trailer 2" },
      { href: "/characters", label: "Meet the cast" },
    ],
  },
  {
    slug: "trailer-1-vice-city-reveal",
    seoDescription: "The first official look at GTA VI: modern-day Vice City, the state of Leonida, and Lucia, the series' first female protagonist since the 2D era.",
    date: "2023-12-04",
    dateLabel: "December 4, 2023",
    title: "Trailer 1 reveals Vice City and Lucia",
    summary:
      "The first official look at GTA VI: modern-day Vice City, the state of Leonida, and Lucia — the series' first female protagonist since the 2D era. It broke YouTube records with 100M views in under a week.",
    body: [
      "Rockstar revealed Grand Theft Auto VI on December 4, 2023 — a day early, after the trailer leaked online. The first look confirmed a return to a modern-day Vice City inside the state of Leonida, Rockstar's take on Florida.",
      "It also introduced Lucia, the series' first female protagonist since the 2D era. The trailer broke YouTube records on its way to 100 million views in under a week.",
    ],
    tag: "Trailer",
    source: {
      label: "GameSpot",
      url: "https://www.gamespot.com/articles/gta-6-trailer-passes-100-million-views-on-youtube-in-less-than-a-week/1100-6531463/",
    },
    related: [
      { href: "/trailers", label: "Watch Trailer 1" },
      { href: "/map", label: "Explore the map" },
    ],
  },
];

export const getNewsItem = (slug: string) => news.find((n) => n.slug === slug);
