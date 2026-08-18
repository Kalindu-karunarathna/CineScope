"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getPopularMovies } from "@/services/tmdb/movies";

export function usePopularMovies() {
  return useQuery({
    queryKey: QUERY_KEYS.movies.popular,

    queryFn: getPopularMovies,
  });
}
