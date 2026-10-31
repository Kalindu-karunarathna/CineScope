/**
 * Server-side TMDB fetcher — for use ONLY in Server Components, Route Handlers,
 * and generateMetadata. It calls the TMDB API directly (no /api/tmdb proxy) using
 * the server-only TMDB_API_READ_ACCESS_TOKEN env var.
 *
 * The token is NOT prefixed with NEXT_PUBLIC_ so it is never exposed to browsers.
 *
 * The existing client-side tmdbFetch (src/services/tmdb/tmdb-client.ts) must not be
 * used here because it constructs a relative /api/tmdb URL that is only resolvable
 * in a browser or a live HTTP request context, not during static generation.
 */

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { MovieDetails } from "./types";

const TMDB_DIRECT_BASE_URL = "https://api.themoviedb.org/3";

function getToken(): string {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (!token) {
    throw new Error("[tmdb-server] TMDB_API_READ_ACCESS_TOKEN is not configured.");
  }
  return token;
}

/**
 * Fetch from the TMDB API directly from the server.
 * Throws on HTTP errors so callers can catch and handle them.
 */
export async function tmdbServerFetch<T>(endpoint: string): Promise<T> {
  const token = getToken();
  const response = await fetch(`${TMDB_DIRECT_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // Align with the same 5-minute revalidation used in the proxy route handler.
    next: { revalidate: 60 * 5 },
  });

  if (!response.ok) {
    throw new Error(`[tmdb-server] TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Fetch a single movie's details by numeric ID — server-side only.
 * Returns null when the movie is not found or the ID is invalid.
 */
export async function getMovieDetailsServer(movieId: number): Promise<MovieDetails | null> {
  try {
    return await tmdbServerFetch<MovieDetails>(API_ENDPOINTS.tmdb.movies.details(movieId));
  } catch {
    return null;
  }
}
