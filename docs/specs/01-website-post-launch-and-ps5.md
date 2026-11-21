# Spec 01 — Website: post-launch refresh + PS5 player hub

Status: ready to implement · Written 2026-11-20 · Scope: `website/` only

## Why

GTA VI launched on November 19, 2026 (PS5, Xbox Series X|S). The site
(gta6network.org) still reads as pre-launch: a countdown to a past date, "almost
here", "launches", "preload", "pre-order". Every one of those is now wrong.
The audience today is console players, mostly PS5, and the site has nothing
built for them. The FiveM server is PC-only and cannot serve them, so the
website is where PS5 players get value.

## Ground rules (these override everything below)

1. **No invented facts.** This is a "sourced, no clickbait" site. Every number,
   date, quote or feature claim you publish must come from a page you opened in
   this session and can cite by URL. If you cannot verify it, either leave it
   out or state plainly that it is unconfirmed. The "Verified facts" table below
   is the starting set; re-open each source before quoting figures from it.
2. Read `website/AGENTS.md` first: this Next.js version differs from older
   ones, so check `node_modules/next/dist/docs/` before using an API.
3. Never change an existing URL path or news `slug`. `/pre-order` and
   `/release-date` keep their paths; only titles and copy change.
4. Do not flip `site.server.live`, do not fill in placeholder links
   (`YOUR_INVITE`, Stripe links), do not run `npm run indexnow`, do not commit
   or push. Stay on branch `post-launch-refresh`.
5. Follow the existing patterns: `pageMetadata()`, `webPageSchema()`,
   `faqSchema()`, `Breadcrumbs`, `routes.ts` as the single route list, the
   `isConfigured()` check for unfilled links, existing CSS classes
   (`display`, `eyebrow`, `neon-card`, `sunset-text`, `btn btn-vice`, …).
   No new dependencies.

## Verified facts (as of 2026-11-20)

| Fact | Source to re-open |
|---|---|
| Launched Nov 19, 2026 on PS5 and Xbox Series X\|S | rockstargames.com newswire; CNN 2026-11-20 |
| Take-Two reported $3.79B first-day retail sales; unclear whether that includes pre-orders | forbes.com/sites/antoniopequenoiv/2026/11/20/…; cnn.com/2026/11/20/media/gta-vi-launch-sales-numbers |
| No PC version announced. On the Nov 9 earnings webcast Zelnick said such news "always comes from our labels" | tweaktown.com/news/114580; ibtimes.co.uk/gta-vi-pc-release-early-2027-report-1833680 |
| A GamesBeat report points to Q1 2027 for PC. Unconfirmed by Rockstar or Take-Two | same IBTimes piece; find the GamesBeat original |
| No FiveM / multiplayer-mod support for GTA VI announced. Cfx.re joined Rockstar in Aug 2023 | zap-hosting.com/en/blog/gta-6-pc-rp-fivem-servers; Cfx.re's own announcement |
| 30fps target on all consoles incl. PS5 Pro (stated pre-launch by Rob Nelson, Aug 2026) | engadget.com/2320281; tomshardware.com |

Not verified, so do not state as fact unless you confirm it: Metacritic score,
install size, pre-order count (32.5M was seen once), PS5 Pro specifics (PSSR,
ray-traced shadows), launch-day graphics modes, any GTA Online VI date, whether
the Vintage Vice City Pack is still obtainable.

## Part A — Post-launch refresh

### A1. Site config (`src/config/site.ts`)
- `lastUpdated` / `lastUpdatedLabel` → the date you finish verifying.
- Keep `releaseDateISO` / `releaseDateLabel` (used widely). Remove
  `preloadDateLabel` if nothing uses it after your edits.
- Add a `platforms` label ("PS5 · Xbox Series X|S") if it removes repetition.

### A2. Countdown → launch status
- Replace `Countdown` with a `LaunchStatus` component: "Out now", platforms,
  and a live "days since launch" figure computed from `releaseDateISO`
  (same hydration-safe `useSyncExternalStore` approach; no layout shift;
  `compact` variant kept). Delete `Countdown.tsx` once unused.
- Home hero: headline "GTA 6 is out now", eyebrow and buttons updated
  (primary → `/ps5`, secondary → `/pre-order` "Price & editions").
- Home ticker: replace preload / pre-order items with current ones
  (out now, platforms, price, PC status "not announced").
- "While we wait · GTA V" bridge → reframed: GTA VI is single-player on console;
  our multiplayer RP server runs on GTA V for PC.
- YouTube and Premium blurbs: remove "launch trailer", "preload alerts",
  "before launch" wording.

### A3. Page-by-page copy (past tense, current state)
Rewrite titles, descriptions, body and FAQ arrays on: `/release-date`,
`/pre-order`, `/pc`, `/game`, `/faq` (`src/data/faq.ts`), `/mods`
(+ `src/data/mods.ts` comment), `/news` index description, `/gta-v` hero line,
`layout.tsx` metadata, `src/lib/schema.ts` site description,
`llms.txt/route.ts`, `news/rss.xml/route.ts` description, `manifest.ts` if it
mentions the countdown.

Specifics:
- `/release-date`: title like "GTA 6 Release Date: Out Now (November 19, 2026)".
  Timeline gains the launch entry as done. Drop "will it be delayed again";
  replace with questions people ask now (is it out, which platforms, PC when,
  is there an online mode yet). Remove "Time until launch".
- `/pre-order`: retitle to price/editions/where-to-buy. Pre-order bonus described
  in the past tense; say its current availability is unconfirmed unless verified.
  CTA "Buy at Rockstar". Breadcrumb label "Price & Editions".
- `/pc`: headline stays honest ("not announced"). Add the Zelnick Nov 9 remark
  and the GamesBeat Q1 2027 report, clearly labelled unconfirmed, next to the
  existing port-gap table (add a "GTA VI" row: consoles Nov 2026, PC "not
  announced"). Add a short "What we'll do when PC lands" section: Syndicate RP
  plans to move to GTA VI when a PC version **and** an official multiplayer
  platform exist; neither does today; link to `/gta-v` and Discord.
- `/mods`: console versions have no PC-style mods; directory opens with PC.
- `/game`, `/faq`: change "launches"/"will" to what is true now; keep hedges
  where the fact was only ever a pre-launch statement.

### A4. Premium (`/premium`, `src/data/premium.ts`)
The page promises things tied to "before launch" ("Founders pricing ends the
day GTA VI ships", "Closes at launch", "launch-week war room", "live
countdown"). Payment links are not configured, so it is a waitlist. Remove
every deadline or perk that has already passed and keep the waitlist. Do not
invent new perks or prices; list what you removed in your report so the owner
can decide the new offer.

### A5. News (`src/data/news.ts`, newest first)
Add, each with `source`, `related`, and body paragraphs in the existing voice:
1. Launch + first-day sales (Official/Business).
2. PC status after launch: Zelnick's remark and the unconfirmed Q1 2027 report
   (tag "Rumor Watch").
3. What launch means for RP/FiveM: nothing announced for GTA VI; FiveM remains
   GTA V (link `/gta-v`). Only if you can source it properly.
Older articles stay untouched: they are dated history.

## Part B — PS5 player hub

### B1. New page `/ps5` — "GTA 6 on PS5"
Add to `routes.ts` (shown in header nav, so it also reaches footer + sitemap).
Sections, each only as detailed as you can source:
- **Buying it**: editions and prices (reuse the data on `/pre-order`; move the
  editions array into `src/data/editions.ts` so both pages share it), digital
  vs boxed (boxed = download code, already stated on the site).
- **Performance**: 30fps target; PS5 vs PS5 Pro differences only if verified;
  otherwise say what is and isn't confirmed.
- **Storage / install**: only with a verified figure; otherwise advise checking
  the PlayStation Store listing.
- **Online & roleplay on PS5**: GTA VI is single-player at launch; FiveM-style
  RP servers are PC-only and do not exist on PS5; GTA Online (GTA V) is the
  multiplayer option on PS5 today.
- **Play with Syndicate on PS5**: a console-crew call to action. Discord is the
  hub (use `site.discord` behind `isConfigured()`, with the same "launching
  soon" fallback pattern `CopyConnect` uses). Describe it as forming now; do
  not claim member counts, schedules or a Rockstar crew URL that do not exist.
- **PS5 FAQ**: 6–8 questions (60fps? PS5 Pro? disc? PS4? PS Plus needed?
  cross-play? transfer to PC later?). Answer "not announced" where that is the
  truth. Emit `faqSchema`.

Put page data in `src/data/ps5.ts`. Add `webPageSchema` + `faqSchema`,
breadcrumbs, and "Updated {site.lastUpdatedLabel}".

### B2. Cross-links for console players
- `/gta-v`: a visible note near the top: "FiveM is PC-only. On PS5? →
  `/ps5`".
- Home "Go deeper" grid: add a PS5 card.
- `/faq`: add "Can I play GTA RP on PS5?" pointing to `/ps5`.
- `llms.txt`: list `/ps5`.

## Acceptance

- `npm run lint` and `npm run build` pass in `website/` with no new warnings.
- Outside `src/data/news.ts` history, a search of `website/src` for
  `almost here|countdown|Countdown|preload|Preload|will launch|until launch|While we wait`
  returns nothing, and every remaining "launches"/"pre-order" is past tense or
  a URL path.
- `/ps5` renders, is in the header, footer and `sitemap.xml`, and has valid
  FAQ JSON-LD.
- Home, `/release-date`, `/pc`, `/pre-order`, `/ps5` checked in a running
  `next start`/`dev` server at desktop and mobile widths: no countdown, no
  hydration warnings in the console, no overflow.
- Report: files changed, each new factual claim with its source URL, anything
  left out because it could not be verified, and the Premium items removed.
