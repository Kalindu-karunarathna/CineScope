export function MovieDetailsSkeleton() {
  return (
    <div className="w-full space-y-6" aria-busy="true" aria-label="Loading movie details">
      <div className="sr-only" role="status">
        Loading movie details...
      </div>

      {/* Back button skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Hero Backdrop & Details Layout Skeleton */}
      <div className="relative w-full overflow-hidden bg-card border-y shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
            {/* Poster Skeleton */}
            <div className="w-48 sm:w-56 md:w-64 lg:w-72 shrink-0">
              <div className="aspect-2/3 w-full animate-pulse rounded-lg border bg-muted shadow-md" />
            </div>

            {/* Content Info Skeleton */}
            <div className="w-full flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
              {/* Title & Tagline Skeleton */}
              <div className="space-y-2">
                <div className="mx-auto h-8 w-3/4 animate-pulse rounded-md bg-muted md:mx-0 sm:h-10 lg:h-12" />
                <div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-muted md:mx-0" />
              </div>

              {/* Badges / Genres Skeleton */}
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
              </div>

              {/* Metadata Row Skeleton (Rating, Date, Runtime, Status) */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                <div className="h-5 w-24 animate-pulse rounded bg-muted" />
                <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                <div className="h-5 w-20 animate-pulse rounded bg-muted" />
                <div className="h-5 w-24 animate-pulse rounded bg-muted" />
              </div>

              {/* Action Button Skeleton */}
              <div className="flex justify-center pt-2 md:justify-start">
                <div className="h-11 w-full max-w-xs animate-pulse rounded-lg bg-muted sm:w-44" />
              </div>

              {/* Overview Skeleton */}
              <div className="space-y-2 pt-4 border-t">
                <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
