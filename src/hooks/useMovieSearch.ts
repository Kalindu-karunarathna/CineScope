"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
    // Keep the previous page's data visible while the next page is loading
    // so the grid doesn't flash to a skeleton on every page change.
    placeholderData: keepPreviousData,
  });
}
