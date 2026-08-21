"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Play, Star } from "lucide-react";

import { ErrorState } from "@/components/common/ErrorState";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTrendingMovies } from "@/hooks/movies/useTrendingMovies";
import { cn } from "@/lib/utils";
import type { Movie } from "@/services/tmdb/types";

const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export function HeroSection() {
  const { data, isLoading, isError, refetch } = useTrendingMovies();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (isError) {
    return (
      <section aria-label="Featured movie" className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ErrorState
            title="Unable to load featured movie"
            description="Please check your connection and try again."
            onRetry={() => void refetch()}
          />
        </div>
      </section>
    );
  }

  const featuredMovie = data?.results[0];

  if (!featuredMovie) {
    return (
      <section className="flex min-h-72 items-center justify-center bg-muted px-4 py-10 text-center sm:min-h-80 sm:px-6">
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          No featured movie is available right now.
        </p>
      </section>
    );
  }

  return <HeroContent movie={featuredMovie} />;
}

function HeroContent({ movie }: { movie: Movie }) {
  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : null;

  return (
    <section
      className="relative isolate flex min-h-[22rem] items-end overflow-hidden bg-muted sm:min-h-[28rem] md:min-h-[32rem] lg:min-h-[36rem]"
      aria-labelledby="featured-movie-title"
    >
      {movie.backdrop_path && (
        <Image
          src={`${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover"
          unoptimized
        />
      )}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-black/95 via-black/75 to-black/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/20"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-10 xl:py-20">
        <div className="max-w-2xl space-y-4 text-white sm:space-y-5">
          <p className="text-xs font-medium tracking-wide text-white/80 sm:text-sm">
            Featured this week
          </p>
          <h1
            id="featured-movie-title"
            className="text-3xl font-bold tracking-tight break-words sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-white/90 sm:text-sm md:text-base">
            <span
              className="flex items-center gap-1"
              aria-label={`Rating: ${movie.vote_average.toFixed(1)} out of 10`}
            >
              <Star className="size-4 fill-current text-amber-400" aria-hidden="true" />
              {movie.vote_average.toFixed(1)}
            </span>
            {releaseYear && (
              <>
                <span aria-hidden="true">•</span>
                <span>{releaseYear}</span>
              </>
            )}
          </div>

          {movie.overview && (
            <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-white/85 sm:line-clamp-4 sm:text-base sm:leading-7">
              {movie.overview}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <Link
              href={`/movies/${movie.id}`}
              aria-label={`View details for ${movie.title}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-11 w-full justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
              )}
            >
              <Play className="size-4 fill-current" aria-hidden="true" />
              View Details
            </Link>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled
              aria-label="Add to favorites (coming soon)"
              title="Favorites coming soon"
              className="min-h-11 w-full justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
            >
              <Heart className="size-4" aria-hidden="true" />
              Add Favorite
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <section
      className="flex min-h-[22rem] items-end bg-muted sm:min-h-[28rem] md:min-h-[32rem] lg:min-h-[36rem]"
      aria-busy="true"
    >
      <p className="sr-only" role="status">
        Loading featured movie
      </p>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-10 xl:py-20">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          <div className="h-3 w-28 animate-pulse rounded bg-muted-foreground/20 sm:h-4 sm:w-32" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted-foreground/20 sm:h-12 md:h-16" />
          <div className="h-5 w-48 animate-pulse rounded bg-muted-foreground/20" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted-foreground/20" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted-foreground/20" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted-foreground/20" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="h-11 w-full animate-pulse rounded-lg bg-muted-foreground/20 sm:h-9 sm:w-32" />
            <div className="h-11 w-full animate-pulse rounded-lg bg-muted-foreground/20 sm:h-9 sm:w-36" />
          </div>
        </div>
      </div>
    </section>
  );
}
