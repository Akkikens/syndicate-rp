// ─────────────────────────────────────────────────────────────
// Edit this one file to update your links across the whole site.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "GTA 6 Network",
  domain: "https://gta6network.org",
  tagline: "Your home for everything Grand Theft Auto VI",

  // GTA VI released November 19, 2026 (ET) — used for the days-since-launch counter.
  releaseDateISO: "2026-11-19T00:00:00-05:00",
  releaseDateLabel: "November 19, 2026",
  platforms: "PS5 · Xbox Series X|S",

  // Bump whenever the facts pages are re-checked — shown on-page and used as
  // dateModified / sitemap lastModified so search engines see fresh content.
  lastUpdated: "2026-11-20",
  lastUpdatedLabel: "November 20, 2026",

  // Your channels — replace with your real URLs
  youtube: "https://www.youtube.com/@Mindwiredd",
  discord: "https://discord.gg/YOUR_INVITE",
  twitter: "https://x.com/YOUR_HANDLE",

  // Your FiveM server
  server: {
    name: "Syndicate RP",
    shortPitch:
      "Car culture, drag racing, custom builds, and elite roleplay on GTA V.",
    // Flip to true once the server is deployed and live on a host — this turns
    // the "launching soon" state into a working Connect button + copy command.
    live: false,
    // cfx.re join link from your Keymaster (e.g. https://cfx.re/join/abc123)
    connectUrl: "https://cfx.re/join/dg3mgrq",
    // Direct connect string players can paste into F8 console
    connectCommand: "connect cfx.re/join/dg3mgrq",
    slots: 128,
    // Tebex store for VIP subscriptions
    store: "https://syndicaterp.tebex.io",
  },

  // Membership payments — create two subscription Payment Links in your
  // Stripe dashboard (Products → Payment Links) and paste them here.
  // Until then the site shows a waitlist CTA instead of buy buttons.
  premium: {
    insiderLink: "https://buy.stripe.com/YOUR_INSIDER_LINK",
    founderLink: "https://buy.stripe.com/YOUR_FOUNDER_LINK",
  },
} as const;

// True once a URL has been filled in (placeholders contain "YOUR_").
export const isConfigured = (url: string) => !url.includes("YOUR_");
