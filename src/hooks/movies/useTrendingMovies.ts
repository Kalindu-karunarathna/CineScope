"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrendingMovies } from "@/services/tmdb/movies";

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["movies", "trending"],

    queryFn: getTrendingMovies,
  });
}
