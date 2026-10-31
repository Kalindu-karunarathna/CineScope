import { MovieCardSkeleton } from "@/components/movie/MovieCardSkeleton";

interface SearchResultsSkeletonProps {
  count?: number;
}

export function SearchResultsSkeleton({ count = 10 }: SearchResultsSkeletonProps) {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading search results">
      <div className="sr-only" role="status">
        Searching for movies...
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: count }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
