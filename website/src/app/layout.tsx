import type { Metadata } from "next";
import { Anton, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { websiteSchema, organizationSchema } from "@/lib/schema";
import { site } from "@/config/site";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "GTA 6 Network — Everything Grand Theft Auto VI",
    template: "%s — GTA 6 Network",
  },
  description:
    "Countdown, news, trailers, and everything we know about Grand Theft Auto VI — plus our GTA V roleplay server. GTA VI launches November 19, 2026.",
  keywords: [
    "GTA 6",
    "GTA VI",
    "Grand Theft Auto VI",
    "GTA 6 release date",
    "GTA 6 countdown",
    "GTA 6 news",
    "GTA 6 trailers",
    "GTA 6 map",
    "GTA 6 characters",
    "GTA 6 Leonida",
    "GTA 6 Vice City",
    "FiveM server",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "GTA 6 Network — Everything Grand Theft Auto VI",
    description:
      "Countdown, news, trailers, and everything we know about GTA VI. Launching November 19, 2026.",
    url: site.domain,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA 6 Network — Everything Grand Theft Auto VI",
    description:
      "Countdown, news, trailers, and everything we know about GTA VI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${instrument.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col">
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
