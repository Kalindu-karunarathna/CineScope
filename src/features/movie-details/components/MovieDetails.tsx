"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Heart, Star, Film, Sparkles } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
import type { MovieDetails as MovieDetailsType } from "@/services/tmdb/types";

const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

function formatRuntime(minutes: number | null | undefined): string | null {
  if (!minutes || minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function formatDate(dateString: string | null | undefined): string | null {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const formattedDate = formatDate(movie.release_date);
  const formattedRuntime = formatRuntime(movie.runtime);
  const rating = typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A";
  const voteCount = typeof movie.vote_count === "number" ? movie.vote_count.toLocaleString() : null;

  return (
    <article className="min-h-screen pb-16">
      {/* Top Bar with Back Navigation */}
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Back to home page"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Back to Movies</span>
        </Link>
      </div>

      {/* Hero Section with Backdrop */}
      <section className="relative mt-4 overflow-hidden border-y bg-card text-card-foreground shadow-sm">
        {/* Backdrop Image */}
        {movie.backdrop_path ? (
          <div className="absolute inset-0 z-0 overflow-hidden bg-muted">
            <Image
              src={`${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25 dark:opacity-30 blur-xs scale-105"
              unoptimized
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 z-0 bg-gradient-to-br from-muted/50 via-background to-muted/30"
            aria-hidden="true"
          />
        )}

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
            {/* Poster */}
            <div className="w-48 sm:w-56 md:w-64 lg:w-72 shrink-0">
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl border bg-muted shadow-lg">
                {movie.poster_path ? (
                  <Image
                    src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div
                    className="flex h-full flex-col items-center justify-center p-6 text-center text-muted-foreground"
                    aria-hidden="true"
                  >
                    <Film className="mb-2 size-10 stroke-1" />
                    <span className="text-sm font-medium">Poster unavailable</span>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Info */}
            <div className="w-full flex-1 space-y-5 text-center md:text-left">
              {/* Title & Tagline */}
              <div className="space-y-2">
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
                  {movie.title}
                </h1>

                {movie.original_title && movie.original_title !== movie.title && (
                  <p className="text-sm text-muted-foreground italic">
                    Original Title: {movie.original_title}
                  </p>
                )}

                {movie.tagline && (
                  <p className="text-base font-medium italic text-muted-foreground sm:text-lg">
                    &ldquo;{movie.tagline}&rdquo;
                  </p>
                )}
              </div>

              {/* Genres Pills */}
              {Array.isArray(movie.genres) && movie.genres.length > 0 && (
                <div
                  className="flex flex-wrap items-center justify-center gap-2 md:justify-start"
                  aria-label="Movie genres"
                >
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-flex items-center rounded-full border bg-muted/60 px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Metadata Badges & Specs */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-start">
                {/* Rating */}
                <div
                  className="flex items-center gap-1.5 font-medium text-foreground"
                  aria-label={`Rating: ${rating} out of 10${voteCount ? ` based on ${voteCount} votes` : ""}`}
                >
                  <Star className="size-4 fill-current text-amber-500" aria-hidden="true" />
                  <span className="font-semibold">{rating}</span>
                  {voteCount && (
                    <span className="text-xs text-muted-foreground">({voteCount})</span>
                  )}
                </div>

                {/* Release Date */}
                {formattedDate && (
                  <div
                    className="flex items-center gap-1.5"
                    aria-label={`Release date: ${formattedDate}`}
                  >
                    <Calendar
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span>{formattedDate}</span>
                  </div>
                )}

                {/* Runtime */}
                {formattedRuntime && (
                  <div
                    className="flex items-center gap-1.5"
                    aria-label={`Runtime: ${formattedRuntime}`}
                  >
                    <Clock className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span>{formattedRuntime}</span>
                  </div>
                )}

                {/* Status */}
                {movie.status && (
                  <div className="flex items-center gap-1.5">
                    <Sparkles
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="capitalize">{movie.status}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                <Button
                  type="button"
                  variant={favorite ? "destructive" : "default"}
                  size="lg"
                  onClick={() => toggleFavorite(movie)}
                  aria-label={
                    favorite
                      ? `Remove ${movie.title} from favorites`
                      : `Add ${movie.title} to favorites`
                  }
                  className="w-full sm:w-auto min-h-11 px-6 font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Heart
                    className={cn(
                      "size-4 transition-transform active:scale-125",
                      favorite && "fill-current"
                    )}
                    aria-hidden="true"
                  />
                  <span>{favorite ? "Remove Favorite" : "Add Favorite"}</span>
                </Button>
              </div>

              {/* Overview Section */}
              <div className="pt-4 border-t border-border space-y-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Overview</h2>
                {movie.overview ? (
                  <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {movie.overview}
                  </p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No overview is available for this movie yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
