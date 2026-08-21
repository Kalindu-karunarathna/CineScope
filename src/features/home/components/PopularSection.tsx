"use client";

import { ErrorState } from "@/components/common/ErrorState";
import { MovieRow } from "@/components/movie/MovieRow";
import { MovieRowSkeleton } from "@/components/movie/MovieRowSkeleton";
import { usePopularMovies } from "@/hooks/movies/usePopularMovies";

const sectionTitle = "Popular Movies";

export function PopularSection() {
  const { data, isLoading, isError, refetch } = usePopularMovies();

  if (isLoading) {
    return <MovieRowSkeleton title={sectionTitle} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load popular movies"
        description="Please check your connection and try again."
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <section className="space-y-4" aria-labelledby="popular-movies-heading">
        <h2
          id="popular-movies-heading"
          className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl"
        >
          {sectionTitle}
        </h2>
        <p className="text-sm text-muted-foreground">No popular movies are available right now.</p>
      </section>
    );
  }

  return <MovieRow title={sectionTitle} movies={data.results} />;
}
