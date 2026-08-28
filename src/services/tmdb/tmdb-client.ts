const TMDB_PROXY_BASE_URL = "/api/tmdb";

export async function tmdbFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${TMDB_PROXY_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
