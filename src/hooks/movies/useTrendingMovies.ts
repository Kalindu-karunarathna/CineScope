"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getTrendingMovies } from "@/services/tmdb/movies";

export function useTrendingMovies() {
  return useQuery({
    queryKey: QUERY_KEYS.movies.trending,

    queryFn: getTrendingMovies,
  });
}
