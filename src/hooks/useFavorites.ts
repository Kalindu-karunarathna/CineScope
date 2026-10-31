"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import type { Movie } from "@/services/tmdb/types";

const STORAGE_KEY = "cinescope-favorites";
const CHANGE_EVENT = "cinescope_favorites_change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

function parseFavorites(raw: string): Movie[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Movie =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).id === "number" &&
        typeof (item as Record<string, unknown>).title === "string"
    );
  } catch {
    return [];
  }
}

function persistFavorites(favorites: Movie[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Ignore storage errors (e.g. private browsing quota)
  }
}

export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const favorites = useMemo<Movie[]>(() => parseFavorites(raw), [raw]);

  const favoriteIds = useMemo<number[]>(() => favorites.map((m) => m.id), [favorites]);

  const isFavorite = useCallback(
    (movieId: number): boolean => favoriteIds.includes(movieId),
    [favoriteIds]
  );

  const addFavorite = useCallback((movie: Movie): void => {
    const current = parseFavorites(
      (() => {
        try {
          return localStorage.getItem(STORAGE_KEY) ?? "[]";
        } catch {
          return "[]";
        }
      })()
    );
    if (current.some((m) => m.id === movie.id)) return;
    persistFavorites([...current, movie]);
  }, []);

  const removeFavorite = useCallback((movieId: number): void => {
    const current = parseFavorites(
      (() => {
        try {
          return localStorage.getItem(STORAGE_KEY) ?? "[]";
        } catch {
          return "[]";
        }
      })()
    );
    persistFavorites(current.filter((m) => m.id !== movieId));
  }, []);

  const toggleFavorite = useCallback((movie: Movie): void => {
    const current = parseFavorites(
      (() => {
        try {
          return localStorage.getItem(STORAGE_KEY) ?? "[]";
        } catch {
          return "[]";
        }
      })()
    );
    if (current.some((m) => m.id === movie.id)) {
      persistFavorites(current.filter((m) => m.id !== movie.id));
    } else {
      persistFavorites([...current, movie]);
    }
  }, []);

  return {
    favorites,
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
