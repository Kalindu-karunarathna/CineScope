"use client";

import { ErrorState } from "@/components/common/ErrorState";
import { MovieRow } from "@/components/movie/MovieRow";
import { MovieRowSkeleton } from "@/components/movie/MovieRowSkeleton";
import { useUpcomingMovies } from "@/hooks/movies/useUpcomingMovies";

const sectionTitle = "Upcoming Movies";

export function UpcomingSection() {
  const { data, isLoading, isError, refetch } = useUpcomingMovies();

  if (isLoading) {
    return <MovieRowSkeleton title={sectionTitle} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load upcoming movies"
        description="Please check your connection and try again."
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <section className="space-y-4" aria-labelledby="upcoming-movies-heading">
        <h2
          id="upcoming-movies-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {sectionTitle}
        </h2>
        <p className="text-sm text-muted-foreground">No upcoming movies are available right now.</p>
      </section>
    );
  }

  return <MovieRow title={sectionTitle} movies={data.results} />;
}
