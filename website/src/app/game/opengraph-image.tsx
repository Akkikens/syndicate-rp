import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Everything We Know About GTA 6 — GTA 6 Network";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg("Everything We Know About GTA 6", "The facts");
}
