import Image from "next/image";
import Link from "next/link";
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
    <Link
      href={`/movies/${movie.id}`}
      aria-label={`${movie.title} (${releaseYear}), rating ${rating} out of 10`}
      className="group block w-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="w-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-2/3 overflow-hidden bg-muted">
          {movie.poster_path ? (
            <Image
              src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`}
              alt=""
              fill
              sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, (max-width: 1024px) 176px, (max-width: 1280px) 192px, 208px"
              className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div
              className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground"
              aria-hidden="true"
            >
              Poster unavailable
            </div>
          )}
        </div>

        <div className="space-y-1.5 p-2.5 sm:space-y-2 sm:p-3">
          <h3 className="line-clamp-2 min-h-10 break-words text-xs font-semibold leading-5 sm:text-sm">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground sm:text-sm">
            <span>{releaseYear}</span>
            <span className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 10`}>
              <Star className="size-4 fill-current text-amber-500" aria-hidden="true" />
              <span>{rating}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
