import RelatedPages from "@/components/RelatedPages";
import { site, isConfigured } from "@/config/site";
import { premiumTiers, freeTier, premiumFaq } from "@/data/premium";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Premium Membership",
  description:
    "Join the Premium membership waitlist: early videos, a private Discord wing and Syndicate RP queue priority for GTA 6 Network members. Opening soon.",
  path: "/premium",
});

function TierCta({ paymentLink, name }: { paymentLink: string; name: string }) {
  if (isConfigured(paymentLink)) {
    return (
      <a href={paymentLink} className="btn btn-vice mt-6 w-full text-center">
        Join {name}
      </a>
    );
  }
  // Payments not wired up yet — collect intent instead of dead-ending.
  const waitlistHref = isConfigured(site.discord) ? site.discord : site.youtube;
  return (
    <a
      href={waitlistHref}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-ghost mt-6 w-full text-center"
    >
      Opening soon — join the waitlist
    </a>
  );
}

export default function PremiumPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Premium</p>
      <h1 className="display mt-3 text-4xl sm:text-6xl">
        Get inside the <span className="sunset-text">network</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        GTA VI is out. Membership puts you inside the network for what comes
        next: early videos and a private wing of the Discord.
        Memberships open soon — join the waitlist.
      </p>

      {/* Tiers */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* Free */}
        <div className="neon-card rounded-md p-7">
          <h2 className="display text-2xl">{freeTier.name}</h2>
          <p className="mt-1 font-mono text-sm text-muted">$0 — always</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {freeTier.perks.map((perk) => (
              <li key={perk} className="flex gap-2 text-sm text-muted">
                <span className="text-muted" aria-hidden="true">
                  ✓
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-4 font-mono text-xs text-muted">
            You&apos;re already here. Everything public stays free — forever.
          </p>
        </div>

        {premiumTiers.map((tier) => (
          <div
            key={tier.name}
            className={`neon-card relative rounded-md p-7 ${
              tier.highlight ? "border-vice/60" : ""
            }`}
          >
            <h2 className="display text-2xl">{tier.name}</h2>
            <p className="mt-1 font-mono text-sm">
              <span className="text-vice">{tier.price}</span>
              <span className="text-muted">{tier.period}</span>
            </p>
            <p className="mt-3 text-sm text-muted">{tier.tagline}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-2 text-sm text-muted">
                  <span className="text-teal" aria-hidden="true">
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <TierCta paymentLink={tier.paymentLink} name={tier.name} />
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs text-muted">
        Payments by Stripe · cancel anytime · fan community, not affiliated
        with Rockstar Games
      </p>

      {/* Premium FAQ */}
      <section className="mt-20">
        <h2 className="display text-3xl">Straight answers</h2>
        <div className="mt-8 flex flex-col gap-3">
          {premiumFaq.map((f) => (
            <details key={f.q} className="neon-card group rounded-md">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-vice transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
      <RelatedPages current="/premium" />
    </div>
  );
}
