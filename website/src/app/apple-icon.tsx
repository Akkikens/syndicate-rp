import { ImageResponse } from "next/og";

// Raster logo: iOS home-screen icon and the Organization schema logo
// (Google requires a raster image of at least 112px).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(70% 70% at 50% 85%, #ff2d78 0%, #8a4fff 45%, #0a0612 100%)",
          color: "#fff4ea",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        VI
      </div>
    ),
    { ...size },
  );
}
