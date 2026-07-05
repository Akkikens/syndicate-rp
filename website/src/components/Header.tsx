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

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navRoutes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                isActive(pathname, item.href)
                  ? "text-vice"
                  : item.accent
                    ? "text-teal hover:text-cream"
                    : "text-muted hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
          className="lg:hidden"
          aria-expanded={open}
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
          className="border-t border-line bg-night px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-4">
            {navRoutes.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-sm uppercase tracking-[0.18em] ${
                    item.accent ? "text-teal" : "text-cream"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
