"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navRoutes } from "@/config/routes";
import { site } from "@/config/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="display text-xl tracking-wide">
          GTA<span className="sunset-text">6</span>NETWORK
          <span className="text-teal">.org</span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex" aria-label="Main">
          {navRoutes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                isActive(pathname, item.href)
                  ? "text-vice"
                  : item.accent
                    ? "text-teal hover:text-cream"
                    : "text-muted hover:text-cream"
              }`}
            >
              {item.navLabel ?? item.label}
            </Link>
          ))}
          <Link
            href="/search"
            aria-label="Search"
            aria-current={pathname === "/search" ? "page" : undefined}
            className="text-muted hover:text-cream"
          >
            <SearchIcon />
          </Link>
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-vice px-4 py-2"
          >
            YouTube
          </a>
        </nav>

        <button
          type="button"
          className="xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-night px-4 py-4 xl:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-4">
            {navRoutes.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`font-mono text-sm uppercase tracking-[0.18em] ${
                    isActive(pathname, item.href)
                      ? "text-vice"
                      : item.accent
                        ? "text-teal"
                        : "text-cream"
                  }`}
                >
                  {item.navLabel ?? item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                aria-current={pathname === "/search" ? "page" : undefined}
                className="font-mono text-sm uppercase tracking-[0.18em] text-cream"
              >
                Search
              </Link>
            </li>
            <li>
              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-[0.18em] text-vice"
              >
                YouTube ↗
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
