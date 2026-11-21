import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import RelatedPages from "@/components/RelatedPages";
import { isNewsletterConfigured } from "@/lib/newsletter";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "GTA 6 Newsletter: GTA VI News by Email";
const description =
  "Get the GTA 6 Network newsletter: occasional, sourced GTA VI news by email on release, editions and platforms. Unsubscribe any time with one click.";

export const metadata = pageMetadata({ title, description, path: "/newsletter" });

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={webPageSchema("/newsletter", title, description)} />
      <Breadcrumbs items={[{ href: "/newsletter", label: "Newsletter" }]} />
      <p className="eyebrow">Newsletter</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        GTA VI news, <span className="sunset-text">in your inbox</span>
      </h1>
      <p className="mt-4 text-muted">
        An occasional email with the GTA VI stories worth your time: release and
        edition news, platform updates and what comes next. Every fact is
        sourced, and rumors are labelled as rumors.
      </p>

      <div className="mt-8">
        <NewsletterSignup ready={isNewsletterConfigured()} />
      </div>

      <p className="mt-6 text-sm text-muted">
        We store only your email address, with our email provider Resend, to
        send the newsletter. Every email carries an unsubscribe link. See the
        privacy page for details.
      </p>

      <RelatedPages current="/newsletter" />
    </div>
  );
}
