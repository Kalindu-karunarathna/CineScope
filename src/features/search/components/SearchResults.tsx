"use client";

import { useEffect, useRef } from "react";
import { Film, SearchX } from "lucide-react";

import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { MovieCard } from "@/components/movie/MovieCard";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { SearchResultsSkeleton } from "./SearchResultsSkeleton";

interface SearchResultsProps {
  query: string;
  page: number;
  onPageChange: (newPage: number) => void;
}

export function SearchResults({ query, page, onPageChange }: SearchResultsProps) {
  const cleanQuery = query.trim();
  const { data, isLoading, isFetching, isError, refetch } = useMovieSearch(cleanQuery, page);

  // Normalize an out-of-range page once the response is available.
  // We track the last normalised page in a ref to avoid triggering this more
  // than once for the same data set (prevents an infinite-update loop).
  const lastNormalisedForRef = useRef<string | null>(null);
  useEffect(() => {
    if (data && data.total_pages > 0 && page > data.total_pages) {
      const key = `${cleanQuery}:${data.total_pages}`;
      if (lastNormalisedForRef.current !== key) {
        lastNormalisedForRef.current = key;
        onPageChange(data.total_pages);
      }
    }
  }, [data, page, cleanQuery, onPageChange]);

  // 1. Initial State — no search query
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

  // 2. Initial Loading State (no cached data yet)
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

      {/* Movies Grid — dimmed while fetching the next page (keepPreviousData) */}
      <div
        className="relative"
        aria-busy={isFetching}
        aria-label={isFetching ? "Loading new page results" : undefined}
      >
        {isFetching && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/50 backdrop-blur-[1px]"
            aria-hidden="true"
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Pagination — only shown when there is more than one page */}
      {total_pages > 1 && (
        <Pagination
          page={page}
          totalPages={total_pages}
          onPageChange={onPageChange}
          isTransitioning={isFetching}
        />
      )}
    </section>
  );
}
