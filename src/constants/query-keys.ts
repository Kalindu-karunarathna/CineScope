export const QUERY_KEYS = {
  movies: {
    trending: ["movies", "trending"] as const,
    popular: ["movies", "popular"] as const,
    topRated: ["movies", "top-rated"] as const,
    upcoming: ["movies", "upcoming"] as const,
  },

  movie: {
    details: (movieId: number) => ["movie", "details", movieId] as const,

    credits: (movieId: number) => ["movie", "credits", movieId] as const,

    videos: (movieId: number) => ["movie", "videos", movieId] as const,

    recommendations: (movieId: number) => ["movie", "recommendations", movieId] as const,

    similar: (movieId: number) => ["movie", "similar", movieId] as const,
  },

  search: {
    movies: (query: string) => ["search", "movies", query] as const,
  },

  genres: {
    all: ["genres"] as const,
  },
} as const;
