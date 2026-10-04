import { ImageResponse } from "next/og";
import { news, getNewsItem } from "@/data/news";

export const alt = "GTA 6 Network news";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export default async function NewsOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = getNewsItem((await params).slug);
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
          <span style={{ color: "#ff2d78" }}>
            {(item?.tag ?? "News").toUpperCase()}
          </span>
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#fff4ea",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          {item?.title ?? "GTA VI News"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,244,234,0.75)",
            letterSpacing: 4,
          }}
        >
          {`${(item?.dateLabel ?? "").toUpperCase()} · GTA VI · 11.19.2026`}
        </div>
      </div>
    ),
    { ...size },
  );
}
