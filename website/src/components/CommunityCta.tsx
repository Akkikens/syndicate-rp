import { site, isConfigured } from "@/config/site";

// Discord invite isn't set yet — fall back to YouTube so CTAs never 404.
// Same pattern as the crew block on /ps5.
export default function CommunityCta({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  const discordReady = isConfigured(site.discord);
  const href = discordReady ? site.discord : site.youtube;
  return (
    <section className="mt-16 rounded-md border border-teal/30 bg-panel p-8 sm:p-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-3 text-3xl">{title}</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{body}</p>
      {discordReady ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-vice mt-8"
        >
          Join the Discord
        </a>
      ) : (
        <div className="neon-card mt-8 flex flex-col gap-3 rounded-md p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sunset" />
            </span>
            <span className="font-mono text-sm text-cream">
              Discord launching soon
            </span>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-vice shrink-0 px-4 py-2"
          >
            Get the go-live alert
          </a>
        </div>
      )}
    </section>
  );
}
