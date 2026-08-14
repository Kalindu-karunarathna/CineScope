"use client";

import { useQuery } from "@tanstack/react-query";

import { getUpcomingMovies } from "@/services/tmdb/movies";

export function useUpcomingMovies() {
  return useQuery({
    queryKey: ["movies", "upcoming"],

    queryFn: getUpcomingMovies,
  });
}
