"use client";

import { ChevronLeft, ChevronRight, Film, SearchX } from "lucide-react";

import { ErrorState } from "@/components/common/ErrorState";
import { MovieCard } from "@/components/movie/MovieCard";
import { Button } from "@/components/ui/button";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { SearchResultsSkeleton } from "./SearchResultsSkeleton";

interface SearchResultsProps {
  query: string;
  page: number;
  onPageChange: (newPage: number) => void;
}

export function SearchResults({ query, page, onPageChange }: SearchResultsProps) {
  const cleanQuery = query.trim();
  const { data, isLoading, isError, refetch } = useMovieSearch(cleanQuery, page);

  // 1. Initial State (No search query typed yet)
  if (!cleanQuery) {
    return (
      <section
        className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-8 text-center sm:min-h-96"
        aria-label="Search prompt"
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground shadow-xs mb-4">
          <Film className="size-8" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Search for a movie
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
          Type a movie title in the search box above to discover popular blockbusters, classics, and
          more.
        </p>
      </section>
    );
  }

  // 2. Loading State
  if (isLoading) {
    return <SearchResultsSkeleton count={10} />;
  }

  // 3. Error State
  if (isError) {
    return (
      <ErrorState
        title="Unable to search movies"
        description="We encountered a problem while connecting to the TMDB search service. Please check your connection and try again."
        onRetry={() => void refetch()}
        retryLabel="Try Again"
      />
    );
  }

  // 4. Empty Results State
  if (!data || data.results.length === 0) {
    return (
      <section
        className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-card p-8 text-center shadow-xs sm:min-h-96"
        aria-label="No results"
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
          <SearchX className="size-8" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          No movies found
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
          We couldn&apos;t find any movies matching &quot;
          <span className="font-semibold text-foreground">{cleanQuery}</span>&quot;. Try checking
          for typos or search for a different title.
        </p>
      </section>
    );
  }

  const { results, total_pages, total_results } = data;

  return (
    <section className="space-y-6" aria-labelledby="search-results-heading">
      {/* Results Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-4">
        <h2
          id="search-results-heading"
          className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          Results for &quot;<span className="text-primary">{cleanQuery}</span>&quot;
        </h2>
        <span className="text-xs text-muted-foreground sm:text-sm">
          Found {total_results.toLocaleString()} {total_results === 1 ? "movie" : "movies"}
        </span>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      {total_pages > 1 && (
        <nav
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border"
          aria-label="Search results pagination"
        >
          <p className="text-xs text-muted-foreground sm:text-sm">
            Page <span className="font-semibold text-foreground">{page}</span> of{" "}
            <span className="font-semibold text-foreground">{total_pages}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Go to previous page"
              className="gap-1 min-h-9 px-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              <span>Previous</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= total_pages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Go to next page"
              className="gap-1 min-h-9 px-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>Next</span>
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      )}
    </section>
  );
}
