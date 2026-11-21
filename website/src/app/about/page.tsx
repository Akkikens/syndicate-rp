import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { site } from "@/config/site";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "About GTA 6 Network: An Independent GTA VI Fan Site";
const description =
  "GTA 6 Network is an independent fan site with sourced Grand Theft Auto VI news and guides. Not affiliated with Rockstar Games or Take-Two Interactive.";

export const metadata = pageMetadata({ title, description, path: "/about" });

const linkClass = "text-teal underline underline-offset-2 hover:text-cream";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/about", title, description, "AboutPage")} />
      <Breadcrumbs items={[{ href: "/about", label: "About" }]} />
      <p className="eyebrow">About</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        About <span className="sunset-text">GTA 6 Network</span>
      </h1>

      <div className="mt-8 flex flex-col gap-5 leading-relaxed text-muted">
        <p>
          {site.name} is a fan-run site about Grand Theft Auto VI. We publish
          news, a PS5 guide, the trailers, the cast, the map, prices and
          editions, and a FAQ, and we link a source for the facts. Where
          something is not confirmed, we say so.
        </p>

        <h2 className="display pt-4 text-2xl text-cream">
          Not affiliated with Rockstar or Take-Two
        </h2>
        <p>
          This is an independent fan site. It is not affiliated with, endorsed
          by or sponsored by Rockstar Games or Take-Two Interactive. Grand
          Theft Auto and GTA are trademarks of Take-Two Interactive. We
          don&apos;t speak for either company and we don&apos;t have inside
          access: everything here comes from public sources.
        </p>

        <h2 className="display pt-4 text-2xl text-cream">How we work</h2>
        <p>
          Our sourcing rules are written down on the{" "}
          <Link href="/editorial-policy" className={linkClass}>
            editorial policy
          </Link>
          : primary sources first, rumors labeled, dated corrections. Pages
          show when their facts were last checked (currently{" "}
          {site.lastUpdatedLabel}).
        </p>

        <h2 className="display pt-4 text-2xl text-cream">
          How this relates to {site.server.name}
        </h2>
        <p>
          {site.server.name} is a separate community project: a car culture
          roleplay server for GTA V on PC, run through FiveM. This site hosts
          its{" "}
          <Link href="/gta-v" className={linkClass}>
            server page
          </Link>{" "}
          and the{" "}
          <Link href="/premium" className={linkClass}>
            membership waitlist
          </Link>
          . {site.server.name} has no connection to Rockstar Games or
          Take-Two Interactive either, and it is not part of our news
          coverage.
        </p>

        <h2 className="display pt-4 text-2xl text-cream">Get in touch</h2>
        <p>
          See the{" "}
          <Link href="/contact" className={linkClass}>
            contact page
          </Link>{" "}
          for our channels, and the{" "}
          <Link href="/privacy" className={linkClass}>
            privacy page
          </Link>{" "}
          for what the site collects.
        </p>
      </div>

      <RelatedPages current="/about" />
    </div>
  );
}
