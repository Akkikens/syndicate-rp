import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Syndicate RP on GTA V — GTA 6 Network";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg("Syndicate RP on GTA V", "FiveM");
}
