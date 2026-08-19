import Image from "next/image";
import { Star } from "lucide-react";

import type { Movie } from "@/services/tmdb/types";

interface MovieCardProps {
  movie: Movie;
}

const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "Release date unavailable";
  const rating = movie.vote_average.toFixed(1);

  return (
    <article className="group w-full max-w-56 overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-2/3 overflow-hidden bg-muted">
        {movie.poster_path ? (
          <Image
            src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 224px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
            Poster unavailable
          </div>
        )}
      </div>

      <div className="space-y-2 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5">{movie.title}</h3>
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>{releaseYear}</span>
          <span className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 10`}>
            <Star className="size-4 fill-current text-amber-500" aria-hidden="true" />
            <span>{rating}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
