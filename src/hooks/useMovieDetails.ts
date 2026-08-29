"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getMovieDetails } from "@/services/tmdb/movies";
import type { MovieDetails } from "@/services/tmdb/types";

export function useMovieDetails(movieId: number | string | null | undefined) {
  const numericId =
    typeof movieId === "number"
      ? movieId
      : typeof movieId === "string"
        ? parseInt(movieId, 10)
        : null;

  const isValidId = Boolean(
    numericId !== null && !isNaN(numericId) && numericId > 0 && Number.isInteger(numericId)
  );

  return useQuery<MovieDetails>({
    queryKey: QUERY_KEYS.movie.details(numericId ?? 0),
    queryFn: () => getMovieDetails(numericId!),
    enabled: isValidId,
  });
}
