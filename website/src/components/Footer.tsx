import Link from "next/link";
import NewsletterBlock from "@/components/NewsletterBlock";
import { groupOf, routeGroups, routes } from "@/config/routes";
import { site, isConfigured } from "@/config/site";

const linkClass = "text-muted hover:text-cream";

export default function Footer() {
  const groups = routeGroups.map((name) => ({
    name,
    links: routes.filter((r) => r.href !== "/" && groupOf(r) === name),
  }));

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-xs">
          <p className="display text-lg">
            GTA<span className="sunset-text">6</span>NETWORK
            <span className="text-teal">.org</span>
          </p>
          <p className="mt-3 text-sm text-muted">
            {site.tagline}. Run by the community, for the community.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="mt-10 grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:grid-cols-5"
        >
          {groups.map((g) => (
            <div key={g.name}>
              <h2 className="eyebrow">{g.name}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {g.links.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className={linkClass}>
                      {r.label}
                    </Link>
                  </li>
                ))}
                {g.name === "News" && (
                  <>
                    <li>
                      <Link href="/search" className={linkClass}>
                        Search
                      </Link>
                    </li>
                    <li>
                      <a href="/news/rss.xml" className={linkClass}>
                        RSS
                      </a>
                    </li>
                  </>
                )}
                {g.name === "Community" && (
                  <>
                    <li>
                      <a
                        href={site.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        YouTube ↗
                      </a>
                    </li>
                    {isConfigured(site.discord) && (
                      <li>
                        <a
                          href={site.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          Discord ↗
                        </a>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          ))}
        </nav>

        <NewsletterBlock variant="footer" />

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted">
          Independent fan site. Not affiliated with, endorsed by or sponsored by
          Rockstar Games or Take-Two Interactive. Grand Theft Auto and GTA are
          trademarks of Take-Two Interactive; all other trademarks belong to
          their owners.
          <br />© {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
