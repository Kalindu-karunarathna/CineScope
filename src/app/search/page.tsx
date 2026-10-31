import { Suspense } from "react";
import type { Metadata } from "next";

import { SearchContainer } from "@/features/search/components/SearchContainer";
import { SearchResultsSkeleton } from "@/features/search/components/SearchResultsSkeleton";

export const metadata: Metadata = {
  title: "Search Movies | CineScope",
  description: "Search and explore thousands of movies on CineScope powered by TMDB.",
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
