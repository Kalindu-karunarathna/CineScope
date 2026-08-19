"use client";

import { MovieRow } from "@/components/movie/MovieRow";
import { MovieCardSkeleton } from "@/components/movie/MovieCardSkeleton";
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
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabIndex={0}
        aria-label="Trending movies loading"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={`trending-movie-skeleton-${index}`}
            className="w-40 shrink-0 snap-start sm:w-48"
          >
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
