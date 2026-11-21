import NewsletterSignup from "@/components/NewsletterSignup";
import { isNewsletterConfigured } from "@/lib/newsletter";

// Server wrapper: decides whether the form is live (RESEND_API_KEY present)
// and supplies the heading copy for each placement. Pages are prerendered, so
// this is read at build time.
export default function NewsletterBlock({
  variant,
}: {
  variant: "footer" | "section" | "article";
}) {
  const ready = isNewsletterConfigured();

  if (variant === "footer") {
    return (
      <div className="mt-10 max-w-md">
        <h2 className="eyebrow">Newsletter</h2>
        <p className="mt-2 text-sm text-muted">GTA VI news, in your inbox.</p>
        <div className="mt-3">
          <NewsletterSignup ready={ready} compact />
        </div>
      </div>
    );
  }

  const article = variant === "article";
  return (
    <section className={article ? "mt-16 border-t border-line pt-12" : "border-t border-line"}>
      <div className={article ? "" : "mx-auto max-w-3xl px-4 py-20 text-center sm:px-6"}>
        <p className="eyebrow">Newsletter</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">
          GTA VI news, straight to your inbox
        </h2>
        <p className={`mt-4 max-w-xl text-muted ${article ? "" : "mx-auto"}`}>
          Sourced updates on release, editions, platforms and what comes next.
          No spam.
        </p>
        <div className="mt-8 max-w-xl text-left mx-auto">
          <NewsletterSignup ready={ready} />
        </div>
      </div>
    </section>
  );
}
