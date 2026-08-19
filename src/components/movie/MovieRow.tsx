import { MovieCard } from "@/components/movie/MovieCard";
import type { Movie } from "@/services/tmdb/types";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabIndex={0}
        aria-label={`${title} movie collection`}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-40 shrink-0 snap-start sm:w-48">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
