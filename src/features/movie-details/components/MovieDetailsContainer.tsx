"use client";

import { useMovieDetails } from "@/hooks/useMovieDetails";
import { MovieDetails } from "./MovieDetails";
import { MovieDetailsError } from "./MovieDetailsError";
import { MovieDetailsSkeleton } from "./MovieDetailsSkeleton";

interface MovieDetailsContainerProps {
  movieId: string | number;
}

export function MovieDetailsContainer({ movieId }: MovieDetailsContainerProps) {
  const numericId = typeof movieId === "number" ? movieId : parseInt(movieId, 10);
  const isValidId = Boolean(!isNaN(numericId) && numericId > 0 && Number.isInteger(numericId));

  const { data, isLoading, isError, refetch } = useMovieDetails(isValidId ? numericId : null);

  if (!isValidId) {
    return (
      <MovieDetailsError
        title="Invalid Movie Identifier"
        description="The movie ID provided in the URL is invalid. Please check the address or browse our collection from the home page."
      />
    );
  }

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (isError || !data) {
    return (
      <MovieDetailsError
        title="Unable to load movie details"
        description="We encountered an issue while loading the details for this movie. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  return <MovieDetails movie={data} />;
}
