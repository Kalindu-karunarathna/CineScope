"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "cinescope_favorites";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cinescope_favorites_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cinescope_favorites_change", callback);
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

export function useFavorites() {
  const rawFavorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const favoriteIds = useMemo<number[]>(() => {
    try {
      const parsed = JSON.parse(rawFavorites);
      if (Array.isArray(parsed)) {
        return parsed.map(Number).filter((id) => !isNaN(id));
      }
    } catch {
      // Return empty array fallback
    }
    return [];
  }, [rawFavorites]);

  const isFavorite = useCallback(
    (movieId: number): boolean => {
      return favoriteIds.includes(movieId);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback((movieId: number): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let current: number[] = [];
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          current = parsed.map(Number).filter((id) => !isNaN(id));
        }
      }

      const isFav = current.includes(movieId);
      const updated = isFav ? current.filter((id) => id !== movieId) : [...current, movieId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("cinescope_favorites_change"));
      return !isFav;
    } catch {
      return false;
    }
  }, []);

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  };
}
