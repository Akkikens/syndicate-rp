import type { InfoPageData } from "@/data/page-types";

// Facts for /60fps. Sources opened 2026-11-21:
//  [EN] Engadget, Nov 18 — Rockstar told Kotaku: no 60/40fps mode on any launch console incl.
//       PS5 Pro, read as covering future patches; Marc Chambers (technology production
//       director): PS5 Pro CPU not strong enough for the simulation at higher frame rates;
//       Pro's GPU/upscaling go to visuals; turning off ray tracing wouldn't unlock 60fps
//       https://www.engadget.com/2321134/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision/
//  [TB] TBreak, Nov 20 — same statements, undated on the page
//       https://tbreak.com/gta-6-60fps-ps5-pro-cpu-rockstar/
//  [PS] PlayStation GTA VI features page — PS5 Pro Enhanced, PSSR, ray-traced shadows,
//       "Compatible display required"; no frame rate or resolution given
//       https://www.playstation.com/en-us/GTAVIfeatures/
//  [PQ] Push Square, Aug 28 — earlier: 30fps target, Rob Nelson would consult the tech team
//       about a 60fps option (relayed via a YouTuber); superseded by the statements above
//       https://www.pushsquare.com/news/2026/08/gta-6-targeting-30fps-on-ps5-undecided-on-performance-mode
//  [MS] Microsoft Store listing — "Optimized for Xbox Series X|S", HDR10, ray tracing; no fps/resolution
// We could not open Digital Foundry's own analysis (blocked), so no measured
// resolution or frame-rate numbers appear on this page.
export const fpsPage: InfoPageData = {
  path: "/60fps",
  title: "GTA 6 60fps: No Performance Mode, 30fps & PS5 Pro",
  description:
    "Does GTA 6 run at 60fps? No. Rockstar says there is no 60fps or 40fps mode on any launch console, PS5 Pro included. What the Pro adds, and what is unknown.",
  crumb: "GTA 6 60fps",
  h1: ["GTA 6", "60fps?"],
  lede: "Short answer: no. GTA VI runs at 30fps on current consoles, and Rockstar has said it is not adding a 60fps or 40fps mode, including on PS5 Pro. This page covers who said that, what PS5 Pro does add, and the details nobody has published.",
  blocks: [
    {
      eyebrow: "Confirmed",
      title: "What Rockstar has said",
      cards: [
        {
          title: "No 60fps or 40fps mode",
          badge: "Confirmed",
          body: "Rockstar told Kotaku that GTA VI will not get a 60fps or 40fps mode on any launch console, PS5 Pro included. Engadget reported this on November 18 and read it as ruling out later patches too. We read the statement through Engadget and TBreak, not on Kotaku directly.",
        },
        {
          title: "Why, according to Rockstar",
          badge: "Confirmed",
          body: "Marc Chambers, Rockstar's technology production director, told Kotaku that the PS5 Pro's processor is only slightly faster than the base PS5's and cannot run the game's simulation at higher frame rates. Engadget adds that he said switching off ray tracing would not unlock 60fps, because the CPU is the limit.",
        },
        {
          title: "PS5 Pro Enhanced",
          badge: "Confirmed",
          body: "PlayStation's GTA VI page lists PS5 Pro Enhanced, with improved clarity from PSSR (PlayStation Spectral Super Resolution) and ray-traced shadows. A compatible display is required. Per Rockstar's comments, the Pro's extra GPU power goes to image quality, not frame rate.",
        },
        {
          title: "Xbox Series X|S",
          badge: "Confirmed",
          body: "The Microsoft Store lists the game as Optimized for Xbox Series X|S with HDR10 and ray tracing support. It states no resolution or frame rate.",
        },
      ],
    },
    {
      eyebrow: "Not confirmed",
      title: "What is still unknown",
      cards: [
        {
          title: "Resolution on each console",
          badge: "Not confirmed",
          body: "Neither PlayStation nor Microsoft publishes target resolutions on the pages we read. Third-party measurements exist, but we could not open the original analyses, so we do not quote them.",
        },
        {
          title: "How steady 30fps is",
          badge: "Not confirmed",
          body: "Frame-rate stability on base PS5, PS5 Pro, Series X and Series S is a matter for independent testing. Rockstar has not published numbers.",
        },
        {
          title: "Frame rate on PC",
          badge: "Not confirmed",
          body: "No PC version is announced, so nothing has been said about PC frame rates. See our system requirements page.",
        },
      ],
      note: "Earlier, in August, Push Square relayed that co-director Rob Nelson would consult the technical team about a 60fps option. The November statements replace that: it is no longer an open question on current consoles.",
    },
    {
      eyebrow: "What to do",
      title: "Getting the best picture",
      bullets: [
        "PS5 Pro owners get PSSR and ray-traced shadows. You need a compatible display.",
        "Series S and Series X owners: Microsoft lists the same Optimized for Xbox Series X|S badge for both and gives no per-console figures.",
        "If it hitches, saving manually is the safer habit. See our saving guide.",
      ],
    },
  ],
  faq: [
    {
      q: "Does GTA 6 run at 60fps?",
      a: "No. GTA VI targets 30fps on current consoles, and Rockstar told Kotaku there is no 60fps or 40fps mode coming to any launch console, per Engadget (November 18).",
    },
    {
      q: "Is there a performance mode in GTA 6?",
      a: "No. Rockstar has said no 60fps or 40fps mode will be added, even on PS5 Pro, and reportedly not in later patches either.",
    },
    {
      q: "Does the PS5 Pro run GTA 6 at 60fps?",
      a: "No. Rockstar says the PS5 Pro's CPU cannot run the simulation at higher frame rates. The Pro adds PSSR and ray-traced shadows on the PlayStation listing, which are image-quality features.",
    },
    {
      q: "What does PS5 Pro add in GTA 6?",
      a: "The PlayStation page lists PS5 Pro Enhanced with PSSR for improved clarity and ray-traced shadows. A compatible display is required. It does not list a frame-rate or resolution change.",
    },
    {
      q: "Will 60fps come in a patch?",
      a: "Rockstar told Kotaku it will not happen on current consoles, according to Engadget's reading of the statement. A PC version is not announced.",
    },
    {
      q: "Is GTA 6 4K on Xbox Series X?",
      a: "Not stated. The Microsoft Store listing shows HDR10 and ray tracing but no resolution, and we found no official figure.",
    },
    {
      q: "What frame rate does Xbox Series S get?",
      a: "No official figure is published. Rockstar says current consoles target 30fps; Microsoft's pages state no per-console difference.",
    },
  ],
  sources: [
    { label: "Engadget: Rockstar settled the 60fps question", url: "https://www.engadget.com/2321134/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision/", note: "reports the Kotaku statements, Nov 18" },
    { label: "TBreak: Rockstar says the CPU can't do 60fps", url: "https://tbreak.com/gta-6-60fps-ps5-pro-cpu-rockstar/", note: "same statements, Nov 20" },
    { label: "PlayStation: GTA VI features", url: "https://www.playstation.com/en-us/GTAVIfeatures/", note: "PS5 Pro Enhanced, PSSR, ray-traced shadows" },
    { label: "Microsoft Store: Grand Theft Auto VI (US)", url: "https://www.xbox.com/en-us/games/store/grand-theft-auto-vi/9nl3wwnzlzzn", note: "Series X|S badge and features" },
    { label: "Push Square: 30fps target, undecided on performance mode", url: "https://www.pushsquare.com/news/2026/08/gta-6-targeting-30fps-on-ps5-undecided-on-performance-mode", note: "August report, now superseded" },
  ],
  links: [
    { href: "/ps5", label: "GTA 6 on PS5" },
    { href: "/xbox", label: "GTA 6 on Xbox" },
    { href: "/system-requirements", label: "PC requirements" },
    { href: "/news/gta-6-30fps-on-consoles", label: "Our 30fps report" },
    { href: "/guides/how-to-save-in-gta-6", label: "How to save" },
  ],
};
