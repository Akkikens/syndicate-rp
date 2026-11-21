import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Per-page share card in the same style as the home card, with the page title.
export function renderOg(title: string, eyebrow = "GTA VI") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(80% 70% at 50% 110%, #7b2fbe 0%, #2a0f4d 45%, #0a0612 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 8,
            color: "#35e0db",
          }}
        >
          <span>GTA6NETWORK.ORG</span>
          <span style={{ color: "#ff2d78" }}>{eyebrow.toUpperCase()}</span>
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#fff4ea",
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,244,234,0.75)",
            letterSpacing: 4,
          }}
        >
          OUT NOW · NEWS · TRAILERS · PS5 · 11.19.2026
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
