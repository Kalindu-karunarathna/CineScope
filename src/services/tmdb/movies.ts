import { tmdbFetch } from "./tmdb-client";
import type { MovieDetails, MovieResponse } from "./types";

const MOVIE_ENDPOINTS = {
  trending: "/trending/movie/week",
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
} as const;

export async function getTrendingMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(MOVIE_ENDPOINTS.trending);
}

export async function getPopularMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(MOVIE_ENDPOINTS.popular);
}

export async function getTopRatedMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(MOVIE_ENDPOINTS.topRated);
}

export async function getUpcomingMovies(): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(MOVIE_ENDPOINTS.upcoming);
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${movieId}`);
}
