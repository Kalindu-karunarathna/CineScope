import { useId } from "react";

import { MovieCard } from "@/components/movie/MovieCard";
import type { Movie } from "@/services/tmdb/types";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const movieCardWrapperClassName =
  "w-36 shrink-0 snap-start sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-56";

const movieRowScrollClassName =
  "-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-pl-4 px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-6 sm:gap-4 sm:scroll-pl-6 sm:px-6 lg:-mx-8 lg:scroll-pl-8 lg:px-8 xl:-mx-10 xl:scroll-pl-10 xl:px-10 [&::-webkit-scrollbar]:hidden outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg";

export function MovieRow({ title, movies }: MovieRowProps) {
  const headingId = useId();

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3 sm:space-y-4" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-lg font-semibold tracking-tight text-foreground sm:text-xl md:text-2xl"
      >
        {title}
      </h2>
      <div
        className={movieRowScrollClassName}
        tabIndex={0}
        aria-label={`${title} collection scroll container`}
      >
        {movies.map((movie) => (
          <div key={movie.id} className={movieCardWrapperClassName}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}

export { movieCardWrapperClassName, movieRowScrollClassName };
