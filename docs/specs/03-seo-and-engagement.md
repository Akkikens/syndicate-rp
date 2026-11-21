# Spec 03 — SEO depth, trust, and engagement

Status: ready to implement · Written 2026-11-21 · Scope: `website/` only

## Goal

Grow search traffic and time-on-site for gta6network.org. The site already
has canonical URLs, JSON-LD (WebSite, Organization, VideoGame, FAQPage,
NewsArticle, BreadcrumbList, VideoObject), a sitemap, RSS and `llms.txt`. What
it lacks is: enough pages to match what people search for, the trust signals a
news site needs, news-specific discovery, ways to move around the site, and any
measurement. This spec fills those gaps. It is split into two workstreams that
run in parallel on separate branches.

The FiveM server stays PC-only and waits for a GTA VI PC release; nothing here
depends on it.

## Ground rules (both workstreams)

1. **No invented facts.** Every factual claim about the game, prices, dates or
   companies must come from a page you opened in this session, cited on the
   page or in the data file. If you cannot verify something, leave it out or
   say it is not announced/unconfirmed. An honest "not announced yet, here is
   what is known" page is valid and ranks; a made-up answer is not acceptable.
2. **No copied text.** Write in your own words. At most one short quote
   (under 15 words) per page, attributed. Never reproduce another site's guide.
3. Read `website/AGENTS.md` first: this Next.js version differs from older
   ones, so check `node_modules/next/dist/docs/` before using an API.
4. Never rename an existing route or news slug. Do not fill placeholder URLs
   (`YOUR_INVITE`, Stripe links), do not flip `site.server.live`, do not run
   `npm run indexnow`, do not publish the owner's email address anywhere.
5. Reuse existing patterns: `pageMetadata()`, `webPageSchema()`, `faqSchema()`,
   `breadcrumbSchema()`, `Breadcrumbs`, `JsonLd`, `routes.ts`, `isConfigured()`,
   existing CSS classes. Titles ≤ 60 characters, descriptions 120–155.
6. Every new page: one `h1`, keyword-first title, unique description,
   breadcrumbs, JSON-LD, "Updated {site.lastUpdatedLabel}" where it holds
   facts, and at least three internal links to related pages.
7. Accessibility is part of SEO: semantic headings in order, labelled
   controls, visible focus, keyboard operable, contrast kept.

## Workstream A — technical SEO, trust, engagement

### A1. News discovery
- **Google News sitemap** at `/news/sitemap-news.xml`: `news:news` entries for
  articles published in the last 48 hours (publication name, language, date,
  title). Reference it from `robots.ts`.
- `NewsItem` gains optional `updated` (ISO date). Use it for `dateModified`,
  `og:modified_time`, sitemap `lastModified`, and show "Updated …" on the
  article when present.
- **Tag pages** `/news/tag/[tag]` (static params from the tag union), with
  `CollectionPage` + `ItemList` JSON-LD, linked from each article's tag and
  from the news index. Add `ItemList` JSON-LD to `/news` too.
- Article page: reading time, share links (X, Reddit, WhatsApp, copy link; plain
  anchors plus one small client component for copy), previous/next article
  links, and "More like this" chosen by shared tag before falling back to
  newest.

### A2. Trust pages (E-E-A-T)
Add `/about`, `/editorial-policy`, `/contact`, `/privacy`, linked in the footer.
- About: what the site is, that it is an independent fan site not affiliated
  with Rockstar Games or Take-Two, and how it relates to Syndicate RP. Add an
  unaffiliated/trademark line to the footer as well.
- Editorial policy: the sourcing rules the site actually follows (primary
  source first, rumors labelled, corrections dated, no paid placement in news).
- Contact: via the configured channels only (YouTube; Discord and X when
  `isConfigured`). No email address.
- Privacy: an accurate description of what the site does. State only what is
  true of the code after your changes (see A5 for analytics; YouTube embeds use
  the no-cookie domain; search runs in the browser). Mark it in a code comment
  as needing the owner's review; it is not legal advice.
- Organization JSON-LD: add `publishingPrinciples` → `/editorial-policy`.

### A3. Site search
`/search`: client-side search over a build-time index of pages and news
(title, summary/description, tag). No dependency, no network calls. Query in
the URL (`?q=`), results update as you type, empty and no-result states, a
search link in the header. Add `SearchAction` (sitelinks search box) to the
WebSite JSON-LD. `/search` itself is `noindex, follow` and absent from the
sitemap.

### A4. Navigation and crawl paths
- A real `not-found.tsx` with a search box and links to the top pages.
- A reusable "Related pages" block at the foot of every evergreen page so no
  page is a dead end.
- Footer reorganised into labelled groups (Game, Platforms, News, Community,
  About) driven by `routes.ts` (add a `group` field).
- Skip-to-content link; `aria-current` on the active nav item.

### A5. Measurement and performance
- Add `@vercel/analytics` and `@vercel/speed-insights` to the root layout
  (these are the only new dependencies allowed). They are cookieless; describe
  them accurately on `/privacy`.
- `next.config.ts`: security headers (`X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`), and
  long-lived cache headers for `/cars/*`.
- Run Lighthouse (mobile) against a production build for `/`, `/ps5`, `/news`
  and one article. Fix what it reports until Performance ≥ 90 and
  Accessibility, Best Practices and SEO ≥ 95, or report exactly what blocks it.
- Per-page Open Graph images for the main evergreen pages (dynamic
  `opengraph-image.tsx` reusing the existing home card style with the page
  title), so shared links are distinct.
- Add `.claude/worktrees/` to the repo `.gitignore`.

## Workstream B — pages that match search demand, plus the console crew

Each page answers one query family completely and honestly, with a FAQ block
(`faqSchema`) of 5–8 questions. Put data in `src/data/<page>.ts`. Add every new
route in **one contiguous block directly after the `/faq` line** in
`routes.ts` (workstream A edits the same file; this keeps the merge trivial).

| Route | Query family | Notes |
|---|---|---|
| `/xbox` | "gta 6 xbox", "gta 6 series s" | Mirror `/ps5`: price, Series X vs Series S only where sourced, storage from the Microsoft Store listing, Game Pass status, online |
| `/online` | "gta 6 online release date", "gta online 2" | What Take-Two has said, single-player at launch, GTA V precedent (GTA Online arrived two weeks after), nothing dated |
| `/60fps` | "gta 6 60fps", "gta 6 performance mode", "gta 6 ps5 pro" | 30fps target, what PS5 Pro adds per the store listing, what is not confirmed |
| `/system-requirements` | "gta 6 pc requirements", "can my pc run gta 6" | None are official. Say so in the first sentence. Storage on console as the only hard number; clearly labelled context from Rockstar's past PC ports |
| `/roleplay` | "gta 6 rp", "gta 6 roleplay servers", "fivem gta 6" | Why no RP servers exist yet, what must happen first (PC version, multiplayer platform), FiveM's status, Rockstar's creator platform rules if sourced. CTA: Syndicate RP on GTA V today, GTA VI when it is possible |
| `/gta-plus` | "gta plus gta 6", "is gta+ worth it" | Build on the existing Nov 21 article; re-verify, and prefer a Rockstar page if one is reachable |
| `/guides` | hub | Lists guides below and links the platform pages |
| `/guides/[slug]` | "how to save in gta 6" etc. | 4–6 guides, each fully sourced: saving and autosave; install size and freeing space; which edition to buy; redeeming pre-order content and the GTA+ month; anything else you can source properly. Use `HowTo`-style ordered steps where the content is a procedure. If a topic cannot be sourced, do not write it |
| `/crew` | "gta 6 crew ps5", community | The Syndicate console crew: who it is for (PS5 and Xbox players in GTA Online on GTA V today, GTA VI online when it exists), how it will run (Discord as hub, crew sessions, car meets), a short code of conduct, how to join. It is forming, so no member counts, no schedule, no Rockstar crew link. Discord CTA behind `isConfigured()` with the existing fallback |

Also:
- **Edition picker** on `/pre-order`: a small client component, three or four
  questions, recommends Standard or Ultimate using only facts already on the
  page. Works without JavaScript as a plain comparison table.
- Cross-link: `/ps5` ↔ `/xbox` ↔ `/60fps`; `/pc` ↔ `/system-requirements` ↔
  `/roleplay` ↔ `/mods`; `/gta-v` → `/roleplay`, `/crew`; home "Go deeper" grid
  gains Guides, Xbox, Online and Roleplay; `llms.txt` lists every new route.
- Sitemap priority 0.8 for the new landing pages.

## Acceptance (each workstream)

- `npm run lint` and `npm run build` pass with no new warnings.
- Every new route renders in the build, appears in `sitemap.xml` (except
  `/search`), and has valid JSON-LD (parse it; check required fields).
- No title over 60 characters, no description outside 120–155, no duplicate
  titles or descriptions across the site: list them from the build output.
- Pages loaded from a local production build at mobile and desktop widths with
  no console errors and no horizontal overflow.
- Work committed on your branch, pushed, and a ready-for-review PR opened
  against `main` (do not merge).
- Report: routes added; every factual claim with the URL you opened for it;
  topics you dropped because they could not be sourced; Lighthouse scores
  (workstream A); anything not completed.
