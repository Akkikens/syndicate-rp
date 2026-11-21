import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "GTA+ in GTA 6 — GTA 6 Network";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg("GTA+ in GTA 6", "GTA+");
}
