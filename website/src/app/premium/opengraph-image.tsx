import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Premium Membership — GTA 6 Network";
export const size = ogSize;
export const contentType = ogContentType;

export default function OgImage() {
  return renderOg("Premium Membership", "Premium");
}
