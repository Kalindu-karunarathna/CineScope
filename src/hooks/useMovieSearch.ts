"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { searchMovies } from "@/services/tmdb/search";
import type { MovieResponse } from "@/services/tmdb/types";

export function useMovieSearch(query: string, page: number = 1) {
  const cleanQuery = query.trim();
  const isValidQuery = cleanQuery.length > 0;

  return useQuery<MovieResponse>({
    queryKey: QUERY_KEYS.search.movies(cleanQuery, page),
    queryFn: () => searchMovies(cleanQuery, page),
    enabled: isValidQuery,
  });
}
