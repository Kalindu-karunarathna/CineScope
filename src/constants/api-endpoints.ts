export const API_ENDPOINTS = {
  tmdb: {
    movies: {
      trending: "/trending/movie/week",
      popular: "/movie/popular",
      topRated: "/movie/top_rated",
      upcoming: "/movie/upcoming",

      details: (movieId: number) => `/movie/${movieId}`,
      credits: (movieId: number) => `/movie/${movieId}/credits`,
      videos: (movieId: number) => `/movie/${movieId}/videos`,
      recommendations: (movieId: number) => `/movie/${movieId}/recommendations`,
      similar: (movieId: number) => `/movie/${movieId}/similar`,
    },

    search: {
      movies: "/search/movie",
    },

    genres: {
      movies: "/genre/movie/list",
    },
  },
} as const;
