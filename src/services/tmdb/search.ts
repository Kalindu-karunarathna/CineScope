import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { tmdbFetch } from "./tmdb-client";
import type { MovieResponse } from "./types";

export async function searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const searchParams = new URLSearchParams({
    query: cleanQuery,
    page: String(page),
  });

  return tmdbFetch<MovieResponse>(`${API_ENDPOINTS.tmdb.search.movies}?${searchParams.toString()}`);
}
