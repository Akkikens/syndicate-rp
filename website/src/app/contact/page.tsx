import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { site, isConfigured } from "@/config/site";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Contact GTA 6 Network: Tips, Corrections & Questions";
const description =
  "How to contact GTA 6 Network about news tips, corrections or questions through our official channels. We don't publish an email address; use these links.";

export const metadata = pageMetadata({ title, description, path: "/contact" });

// Only channels that are really set up are listed.
const channels = [
  { label: "YouTube", url: site.youtube, note: "Comment on our videos." },
  { label: "Discord", url: site.discord, note: "Join the community server." },
  { label: "X", url: site.twitter, note: "Send us a post or message." },
].filter((c) => isConfigured(c.url));

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/contact", title, description, "ContactPage")} />
      <Breadcrumbs items={[{ href: "/contact", label: "Contact" }]} />
      <p className="eyebrow">Contact</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        Get in <span className="sunset-text">touch</span>
      </h1>
      <p className="mt-4 text-muted">
        News tips, corrections and questions are welcome. Reach us through
        these channels. If you&apos;re reporting a mistake, say which page and
        what is wrong; our{" "}
        <Link href="/editorial-policy" className="text-teal underline underline-offset-2 hover:text-cream">
          editorial policy
        </Link>{" "}
        explains how corrections are handled.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-card block rounded-md p-6"
            >
              <span className="display text-xl">{c.label} ↗</span>
              <span className="mt-2 block text-sm text-muted">{c.note}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted">
        We are an independent fan site and can&apos;t help with problems in the
        game itself or with Rockstar Games accounts; for those, use
        Rockstar&apos;s own support.
      </p>

      <RelatedPages current="/contact" />
    </div>
  );
}
