import { useId } from "react";

import { MovieCardSkeleton } from "@/components/movie/MovieCardSkeleton";
import { movieCardWrapperClassName, movieRowScrollClassName } from "@/components/movie/MovieRow";

interface MovieRowSkeletonProps {
  title: string;
  count?: number;
}

export function MovieRowSkeleton({ title, count = 5 }: MovieRowSkeletonProps) {
  const headingId = useId();

  return (
    <section className="space-y-3 sm:space-y-4" aria-labelledby={headingId} aria-busy="true">
      <h2 id={headingId} className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
        {title}
      </h2>
      <p className="sr-only" role="status">
        Loading {title.toLowerCase()}
      </p>
      <div className={movieRowScrollClassName} tabIndex={0} aria-label={`${title} loading`}>
        {Array.from({ length: count }, (_, index) => (
          <div key={`${title}-skeleton-${index}`} className={movieCardWrapperClassName}>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
