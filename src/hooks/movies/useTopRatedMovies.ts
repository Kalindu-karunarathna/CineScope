"use client";

import { useQuery } from "@tanstack/react-query";

import { getTopRatedMovies } from "@/services/tmdb/movies";

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ["movies", "top-rated"],

    queryFn: getTopRatedMovies,
  });
}
