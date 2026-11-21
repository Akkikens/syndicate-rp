import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { site } from "@/config/site";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Editorial Policy: How We Source GTA 6 News";
const description =
  "How GTA 6 Network sources and corrects its news: primary sources first, rumors labeled as rumors, dated corrections, and no paid placement in news stories.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/editorial-policy",
});

const rules = [
  {
    heading: "Primary sources first",
    body: "When Rockstar Games or Take-Two has said something, we link that statement or the store listing. When we can't reach a primary source, we link the outlet we relied on and say so in the story.",
  },
  {
    heading: "Rumors are labeled",
    body: "Unconfirmed claims go under the Rumor Watch tag and the story says what is and isn't verified. We don't state a rumor as fact, and we keep reported estimates separate from company figures.",
  },
  {
    heading: "Corrections are dated",
    body: "If a story or page turns out to be wrong or out of date, we fix it and show an Updated date. Evergreen pages show when their facts were last checked.",
  },
  {
    heading: "No paid placement in news",
    body: "Nobody pays us to publish, rank or word a news story. Membership and server pages are clearly separate from the news section.",
  },
  {
    heading: "Our own words",
    body: "We write our own summaries and quote others sparingly, with attribution and a link.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/editorial-policy", title, description)} />
      <Breadcrumbs
        items={[{ href: "/editorial-policy", label: "Editorial Policy" }]}
      />
      <p className="eyebrow">Editorial policy</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        How we <span className="sunset-text">source</span> the news
      </h1>
      <p className="mt-4 text-muted">
        {site.name} is an independent fan site. These are the rules we follow
        for the{" "}
        <Link href="/news" className="text-teal underline underline-offset-2 hover:text-cream">
          news section
        </Link>{" "}
        and the guides.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {rules.map((r) => (
          <section key={r.heading} className="neon-card rounded-md p-6">
            <h2 className="display text-xl">{r.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-8 text-muted">
        Spotted a mistake? Tell us through the channels on the{" "}
        <Link href="/contact" className="text-teal underline underline-offset-2 hover:text-cream">
          contact page
        </Link>
        .
      </p>

      <RelatedPages current="/editorial-policy" />
    </div>
  );
}
