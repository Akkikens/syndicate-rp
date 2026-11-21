import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Privacy: What GTA 6 Network Collects and Doesn't";
const description =
  "What gta6network.org does with your data: an optional newsletter email stored with Resend, no cookies, cookieless analytics, and in-browser search.";

export const metadata = pageMetadata({ title, description, path: "/privacy" });

// OWNER REVIEW NEEDED: this page describes what the site's code does as of
// this change (Vercel Web Analytics + Speed Insights in the root layout,
// click-to-play YouTube facade, client-side search, plain share links, and the
// Resend-backed newsletter signup at /api/newsletter). It is
// not legal advice. Re-check it whenever scripts, forms, cookies or embeds are
// added, and before relying on it for GDPR/CCPA purposes.
const sections = [
  {
    heading: "What we don't do",
    items: [
      "There are no accounts or comments on this site. The only form is the newsletter signup (see below), which asks for an email address and nothing else.",
      "The site's own code doesn't set cookies and doesn't use your browser's local storage.",
      "We don't run advertising or ad trackers.",
    ],
  },
  {
    heading: "Newsletter",
    items: [
      "If you sign up for the newsletter, the email address you submit is stored with Resend, our email provider, so we can send you the newsletter. Nothing else is collected with it: no name, and no profile of what you read.",
      "Your address is used only to send the newsletter. Every email will carry an unsubscribe link; using it stops all further emails to you.",
      "Your IP address is used briefly by the site's server to limit repeated sign-up attempts, and is not stored with your subscription.",
      "Resend's own privacy policy applies to the data it holds.",
    ],
  },
  {
    heading: "Analytics and speed measurement",
    items: [
      "On the live site we use Vercel Web Analytics to count page views and Vercel Speed Insights to measure how fast pages load. Both are cookieless.",
      "They report the page you viewed, how it performed, and general technical details such as your browser, device type and country, in aggregate. We use this to see which pages are read and which are slow.",
      "Before anything is sent, the part of the address after “?” is removed, so the words you type into site search are not included.",
    ],
  },
  {
    heading: "Search",
    items: [
      "Site search runs in your browser over an index of page and story titles and summaries that is built when the site is published. It doesn't send the words you type anywhere.",
      "Your search words are kept in the address bar (?q=) so you can share or reload results. They are not sent to us or to anyone else.",
    ],
  },
  {
    heading: "YouTube videos",
    items: [
      "Trailer videos load as a thumbnail image from YouTube's image servers (i.ytimg.com), which means YouTube can see that your browser requested it.",
      "The video player itself loads only when you press play, and it comes from youtube-nocookie.com, YouTube's privacy-enhanced embed domain. YouTube's own privacy policy applies from that point.",
    ],
  },
  {
    heading: "Fonts, share buttons and other links",
    items: [
      "Fonts are downloaded when the site is built and served from this site, so your browser doesn't contact Google Fonts.",
      "The share buttons on news stories are ordinary links to X, Reddit and WhatsApp. Nothing is loaded from those services unless you click one, and then their policies apply. “Copy link” copies the story's address to your clipboard in your browser.",
      "Links to YouTube, Discord, X and other sites take you to services we don't control. Their privacy policies apply there.",
    ],
  },
  {
    heading: "Hosting",
    items: [
      "The site is served by a hosting provider, which, like any web host, handles your IP address and request details in order to deliver pages and keep the service running.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/privacy", title, description)} />
      <Breadcrumbs items={[{ href: "/privacy", label: "Privacy" }]} />
      <p className="eyebrow">Privacy</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Privacy on <span className="sunset-text">GTA 6 Network</span>
      </h1>
      <p className="mt-4 text-muted">
        This page describes what gta6network.org does with your data. It is a
        plain-language summary, not legal advice.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {sections.map((s) => (
          <section key={s.heading} className="neon-card rounded-md p-6">
            <h2 className="display text-xl">{s.heading}</h2>
            <ul className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted">
              {s.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-8 text-muted">
        Questions about this page? See the{" "}
        <Link href="/contact" className="text-teal underline underline-offset-2 hover:text-cream">
          contact page
        </Link>
        .
      </p>

      <RelatedPages current="/privacy" />
    </div>
  );
}
