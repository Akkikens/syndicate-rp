import CopyLinkButton from "@/components/CopyLinkButton";

const linkClass =
  "rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted hover:border-teal hover:text-cream";

// Plain share anchors: nothing from X, Reddit or WhatsApp loads until clicked.
export default function ShareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: "Reddit", href: `https://www.reddit.com/submit?url=${u}&title=${t}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
        Share
      </span>
      {targets.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.label} (opens in a new tab)`}
          className={linkClass}
        >
          {s.label}
        </a>
      ))}
      <CopyLinkButton url={url} />
    </div>
  );
}
