import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { tmdbFetch } from "./tmdb-client";
import type { MovieDetails, MovieResponse } from "./types";

export async function getTrendingMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(API_ENDPOINTS.tmdb.movies.trending);
}

export async function getPopularMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(API_ENDPOINTS.tmdb.movies.popular);
}

export async function getTopRatedMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(API_ENDPOINTS.tmdb.movies.topRated);
}

export async function getUpcomingMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(API_ENDPOINTS.tmdb.movies.upcoming);
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(API_ENDPOINTS.tmdb.movies.details(movieId));
}
