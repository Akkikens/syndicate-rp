import { ImageResponse } from "next/og";

export const alt = "GTA 6 Network — Everything Grand Theft Auto VI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(80% 70% at 50% 110%, #7b2fbe 0%, #2a0f4d 45%, #0a0612 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 14,
            color: "#35e0db",
            marginBottom: 28,
          }}
        >
          GTA6NETWORK.ORG
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 800,
            color: "#fff4ea",
            textAlign: "center",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>EVERYTHING</span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(100deg, #8a4fff 0%, #ff2d78 45%, #ff8a3d 80%, #ffd36e 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            GTA VI
          </span>
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 30,
            color: "rgba(255,244,234,0.75)",
            letterSpacing: 6,
          }}
        >
          OUT NOW · NEWS · TRAILERS · PS5 · 11.19.2026
        </div>
      </div>
    ),
    { ...size },
  );
}
