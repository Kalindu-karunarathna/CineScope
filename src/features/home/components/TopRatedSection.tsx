"use client";

import { ErrorState } from "@/components/common/ErrorState";
import { MovieRow } from "@/components/movie/MovieRow";
import { MovieRowSkeleton } from "@/components/movie/MovieRowSkeleton";
import { useTopRatedMovies } from "@/hooks/movies/useTopRatedMovies";

const sectionTitle = "Top Rated Movies";

export function TopRatedSection() {
  const { data, isLoading, isError, refetch } = useTopRatedMovies();

  if (isLoading) {
    return <MovieRowSkeleton title={sectionTitle} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load top rated movies"
        description="Please check your connection and try again."
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <section className="space-y-4" aria-labelledby="top-rated-movies-heading">
        <h2
          id="top-rated-movies-heading"
          className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl"
        >
          {sectionTitle}
        </h2>
        <p className="text-sm text-muted-foreground">
          No top rated movies are available right now.
        </p>
      </section>
    );
  }

  return <MovieRow title={sectionTitle} movies={data.results} />;
}
