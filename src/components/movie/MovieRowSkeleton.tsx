import { useId } from "react";

import { MovieCardSkeleton } from "@/components/movie/MovieCardSkeleton";

interface MovieRowSkeletonProps {
  title: string;
  count?: number;
}

export function MovieRowSkeleton({ title, count = 5 }: MovieRowSkeletonProps) {
  const headingId = useId();

  return (
    <section className="space-y-4" aria-labelledby={headingId} aria-busy="true">
      <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <p className="sr-only" role="status">
        Loading {title.toLowerCase()}
      </p>
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabIndex={0}
        aria-label={`${title} loading`}
      >
        {Array.from({ length: count }, (_, index) => (
          <div key={`${title}-skeleton-${index}`} className="w-40 shrink-0 snap-start sm:w-48">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
