"use client";

import { useQuery } from "@tanstack/react-query";

import { getPopularMovies } from "@/services/tmdb/movies";

export function usePopularMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],

    queryFn: getPopularMovies,
  });
}
