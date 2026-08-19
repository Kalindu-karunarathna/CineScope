"use client";

import { MovieRow } from "@/components/movie/MovieRow";
import { Button } from "@/components/ui/button";
import { useTrendingMovies } from "@/hooks/movies/useTrendingMovies";

const sectionTitle = "Trending Movies";

export function TrendingSection() {
  const { data, isLoading, isError, error, refetch } = useTrendingMovies();

  if (isLoading) {
    return <TrendingMoviesSkeleton />;
  }

  if (isError) {
    const retryMessage = error instanceof Error ? "Please try again." : "Please try again later.";

    return (
      <section className="space-y-4" aria-labelledby="trending-movies-heading">
        <h2
          id="trending-movies-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {sectionTitle}
        </h2>
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm"
          role="alert"
        >
          <p className="font-medium">We couldn&apos;t load trending movies right now.</p>
          <p className="mt-1 text-muted-foreground">{retryMessage}</p>
          <Button className="mt-3" variant="outline" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      </section>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <section className="space-y-4" aria-labelledby="trending-movies-heading">
        <h2
          id="trending-movies-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {sectionTitle}
        </h2>
        <p className="text-sm text-muted-foreground">No trending movies are available right now.</p>
      </section>
    );
  }

  return <MovieRow title={sectionTitle} movies={data.results} />;
}

function TrendingMoviesSkeleton() {
  return (
    <section className="space-y-4" aria-labelledby="trending-movies-heading" aria-busy="true">
      <h2 id="trending-movies-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
        {sectionTitle}
      </h2>
      <p className="sr-only" role="status">
        Loading trending movies
      </p>
      <div className="flex gap-4 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={`trending-movie-skeleton-${index}`} className="w-40 shrink-0 sm:w-48">
            <div className="aspect-2/3 animate-pulse rounded-lg bg-muted" />
            <div className="mt-3 h-5 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
