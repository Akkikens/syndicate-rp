import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "GTA 6 Console Crew — GTA 6 Network";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg("GTA 6 Console Crew", "Community");
}
