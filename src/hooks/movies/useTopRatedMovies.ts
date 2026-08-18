"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getTopRatedMovies } from "@/services/tmdb/movies";

export function useTopRatedMovies() {
  return useQuery({
    queryKey: QUERY_KEYS.movies.topRated,

    queryFn: getTopRatedMovies,
  });
}
