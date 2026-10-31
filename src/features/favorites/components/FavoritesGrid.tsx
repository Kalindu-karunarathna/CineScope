"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";

import { MovieCard } from "@/components/movie/MovieCard";
import { buttonVariants } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

export function FavoritesGrid() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section
        className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-8 text-center"
        aria-label="No favorites saved"
      >
        <div className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground shadow-xs mb-5">
          <Heart className="size-9 stroke-[1.5]" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          No favorites yet
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Browse movies and click the{" "}
          <Heart className="inline size-3.5 fill-rose-500 text-rose-500" aria-label="heart" /> icon
          on any movie card to save it here for later.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "min-h-11 w-full justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
            )}
          >
            Browse Movies
          </Link>
          <Link
            href="/search"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-11 w-full justify-center gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
            )}
          >
            <Search className="size-4" aria-hidden="true" />
            Search Movies
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="favorites-grid-heading">
      <p id="favorites-grid-heading" className="sr-only">
        Your saved favorite movies
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
