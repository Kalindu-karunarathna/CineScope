"use client";

import { ErrorState } from "@/components/common/ErrorState";
import { MovieRow } from "@/components/movie/MovieRow";
import { MovieCardSkeleton } from "@/components/movie/MovieCardSkeleton";
import { useTrendingMovies } from "@/hooks/movies/useTrendingMovies";

const sectionTitle = "Trending Movies";

export function TrendingSection() {
  const { data, isLoading, isError, refetch } = useTrendingMovies();

  if (isLoading) {
    return <TrendingMoviesSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load trending movies"
        description="Please check your connection and try again."
        onRetry={() => void refetch()}
      />
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
