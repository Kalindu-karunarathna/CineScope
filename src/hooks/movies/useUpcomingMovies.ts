"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getUpcomingMovies } from "@/services/tmdb/movies";

export function useUpcomingMovies() {
  return useQuery({
    queryKey: QUERY_KEYS.movies.upcoming,

    queryFn: getUpcomingMovies,
  });
}
