"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
import type { Movie } from "@/services/tmdb/types";

interface FavoriteButtonProps {
  movie: Movie;
  /** Extra className applied to the button root */
  className?: string;
}

/**
 * Compact heart button intended to overlay a MovieCard poster.
 * Calls stopPropagation so the parent <Link> navigation is not triggered.
 *
 * Hydration: the lazy useState initializer reads `typeof window` —
 * returns false on the server (no browser APIs), true on the client.
 * This means the button is omitted from the SSR output and appears
 * after the client bundle executes, with no hydration mismatch.
 */
export function FavoriteButton({ movie, className }: FavoriteButtonProps) {
  // Lazy initializer: false on server, true on client — no extra render cycle.
  const [isMounted] = useState<boolean>(() => typeof window !== "undefined");
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!isMounted) return null;

  const active = isFavorite(movie.id);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        active ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`
      }
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center rounded-full p-1.5 transition-all duration-200",
        "bg-black/60 backdrop-blur-sm hover:bg-black/80",
        "outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-black/60",
        "active:scale-110",
        className
      )}
    >
      <Heart
        aria-hidden="true"
        className={cn(
          "size-3.5 transition-colors duration-200",
          active ? "fill-rose-500 text-rose-500" : "fill-none text-white"
        )}
      />
    </button>
  );
}
