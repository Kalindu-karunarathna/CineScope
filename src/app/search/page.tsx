import { Suspense } from "react";
import type { Metadata } from "next";

import { SearchContainer } from "@/features/search/components/SearchContainer";
import { SearchResultsSkeleton } from "@/features/search/components/SearchResultsSkeleton";

export const metadata: Metadata = {
  // Produces: "Search Movies | CineScope"
  title: "Search Movies",
  description:
    "Search and discover movies by title. Find any film from thousands of titles powered by TMDB.",
  /**
   * Search result pages (/search?q=batman&page=2) contain query-specific content
   * that changes with every search term. Marking the search landing page as indexable
   * is fine; individual paginated result URLs are not worth indexing because they are
   * ephemeral and their content is already accessible through normal navigation.
   * We apply noindex here so search engines do not index query-specific URLs that
   * change with every search and may not represent stable, canonical content.
   */
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Search Movies | CineScope",
    description:
      "Search and discover movies by title. Find any film from thousands of titles powered by TMDB.",
    url: "/search",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Movies | CineScope",
    description:
      "Search and discover movies by title. Find any film from thousands of titles powered by TMDB.",
  },
  alternates: {
    canonical: "/search",
  },
};

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 space-y-8">
            <div className="h-10 w-48 animate-pulse rounded bg-muted" />
            <div className="h-11 w-full max-w-2xl animate-pulse rounded-lg bg-muted" />
            <SearchResultsSkeleton count={10} />
          </div>
        }
      >
        <SearchContainer />
      </Suspense>
    </main>
  );
}
