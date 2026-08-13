const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getTmdbToken(): string {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB_API_READ_ACCESS_TOKEN is not configured.");
  }

  return token;
}

export async function tmdbFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getTmdbToken()}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
