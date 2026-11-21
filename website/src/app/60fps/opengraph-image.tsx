import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "GTA 6 60fps & PS5 Pro — GTA 6 Network";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg("GTA 6 60fps & PS5 Pro", "Performance");
}
