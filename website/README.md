# gta6network.org

The website for **GTA 6 Network** — a GTA VI fan hub (countdown, news, trailers, everything-we-know) with a GTA V section promoting the Syndicate RP FiveM server.

Built with Next.js 16 (App Router) + Tailwind CSS 4. Fully static — no database, no server costs.

## Run locally

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000.

## ✏️ Customize (do this first)

All your links live in **one file**: [`src/config/site.ts`](src/config/site.ts)

Replace these placeholders:

| Field | What to put there |
|---|---|
| `youtube` | Your YouTube channel URL |
| `discord` | Your Discord invite link |
| `twitter` | Your X/Twitter profile |
| `server.connectUrl` | Your cfx.re join link (from [Cfx Keymaster](https://portal.cfx.re/)) |
| `server.connectCommand` | Same code, as the F8 `connect` command |

Other content:

- **News**: add items to the top of [`src/data/news.ts`](src/data/news.ts) — they appear on the home page and `/news` automatically.
- **Trailer 3**: when it drops, add it to the top of [`src/data/trailers.ts`](src/data/trailers.ts) — the trailers page, home-page embed, and structured data all update from that one file.
- **New pages**: register the route in [`src/config/routes.ts`](src/config/routes.ts) — header nav, footer, and sitemap all derive from it.
- **Facts page**: `src/app/game/page.tsx` · **FAQ**: `src/data/faq.ts` · **Characters**: `src/data/characters.ts` · **Map**: `src/data/locations.ts` · **Server page**: `src/app/gta-v/page.tsx`.

## 🚀 Deploy to gta6network.org (Vercel, free)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and set **Root Directory** to `website`. Deploy.
3. In the Vercel project → **Settings → Domains**, add `gta6network.org` and `www.gta6network.org`.
4. At your domain registrar, set the DNS records Vercel shows you:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`
5. Wait for DNS to propagate (minutes to a few hours). Done — HTTPS is automatic.

Every `git push` to `main` redeploys the site automatically.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero countdown to Nov 19, 2026, latest news, Trailer 2, explore grid, server promo |
| `/news` | Full sourced GTA VI news timeline |
| `/trailers` | All official trailers (click-to-play) + Trailer 3 watch |
| `/characters` | Jason, Lucia & the full confirmed cast |
| `/map` | All six confirmed Leonida regions + size facts |
| `/game` | "Everything we actually know" — facts vs rumors |
| `/faq` | 11 SEO-targeted Q&As with FAQPage structured data |
| `/gta-v` | Syndicate RP server — features, how to join, Discord |

## SEO already wired in

- JSON-LD structured data: `WebSite` + `Organization` (site-wide), `VideoGame` (/game), `FAQPage` (/faq) — eligible for Google rich results
- Auto-generated OG share image (`/opengraph-image`), custom favicon, canonical URLs on every page
- `sitemap.xml` + `robots.txt` generated at build time
- Click-to-play YouTube embeds (no third-party scripts until the user presses play)

After deploying, submit `https://gta6network.org/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) to get indexed fast.
