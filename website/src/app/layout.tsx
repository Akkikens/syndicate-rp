import type { Metadata, Viewport } from "next";
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
    "GTA 6 countdown to November 19, 2026, plus sourced news, every trailer, price and editions, the map, and characters. Everything Grand Theft Auto VI in one place.",
  applicationName: site.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/news/rss.xml" },
  },
  category: "games",
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
      "GTA 6 countdown, news, trailers, price, and everything we know. Launching November 19, 2026.",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA 6 Network — Everything Grand Theft Auto VI",
    description:
      "GTA 6 countdown, news, trailers, price, and everything we know.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0612",
  colorScheme: "dark",
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
