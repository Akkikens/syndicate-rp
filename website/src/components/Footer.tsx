import Link from "next/link";
import { routes } from "@/config/routes";
import { site, isConfigured } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="display text-lg">
            GTA<span className="sunset-text">6</span>NETWORK
            <span className="text-teal">.org</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            {site.tagline}. Run by the community, for the community.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {routes
            .filter((r) => r.href !== "/")
            .map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="text-muted hover:text-cream"
              >
                {r.label}
              </Link>
            ))}
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-cream"
          >
            YouTube ↗
          </a>
          {isConfigured(site.discord) && (
            <a
              href={site.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-cream"
            >
              Discord ↗
            </a>
          )}
          <a href="/news/rss.xml" className="text-muted hover:text-cream">
            RSS
          </a>
        </nav>

        <p className="text-xs leading-relaxed text-muted md:text-right">
          Fan site. Not affiliated with Rockstar Games or Take-Two Interactive.
          Grand Theft Auto and GTA are trademarks of Take-Two Interactive.
          <br />© {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
