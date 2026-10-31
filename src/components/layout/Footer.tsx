import Image from "next/image";
import Link from "next/link";
import { Film, Heart, Home, Search } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search Movies", icon: Search },
  { href: "/favorites", label: "Favorites", icon: Heart },
] as const;

/**
 * Global footer — Server Component.
 *
 * `new Date().getFullYear()` runs at request time on the server, so React
 * renders the same year string during both SSR and hydration; no mismatch.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 xl:px-10">
        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 — CineScope branding */}
          <div className="space-y-3">
            <Link
              href="/"
              aria-label="CineScope home"
              className="inline-flex items-center gap-2 rounded-md text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Film className="size-4" aria-hidden="true" />
              </div>
              CineScope
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Discover movies, explore stories, and find your next favorite — powered by TMDB.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigate
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — TMDB Attribution */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Data Source
            </p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Movie Database (TMDB) — opens in a new tab"
              className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {/*
               * Official TMDB "blue short" horizontal logo, downloaded from
               * https://www.themoviedb.org/about/logos-attribution into /public.
               * Aspect ratio 273.42 × 35.52 preserved at display size 154 × 20.
               */}
              <Image
                src="/tmdb-logo.svg"
                alt="The Movie Database (TMDB)"
                width={154}
                height={20}
                className="h-5 w-auto"
                priority={false}
              />
            </a>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="mt-10 border-t border-border/40 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {year} CineScope. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
