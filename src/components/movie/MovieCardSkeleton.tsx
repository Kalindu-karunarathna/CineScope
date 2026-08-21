export function MovieCardSkeleton() {
  return (
    <article
      className="w-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
      aria-hidden="true"
    >
      <div className="aspect-2/3 animate-pulse bg-muted" />
      <div className="space-y-1.5 p-2.5 sm:space-y-2 sm:p-3">
        <div className="min-h-10 animate-pulse rounded bg-muted" />
        <div className="flex items-center justify-between gap-2">
          <div className="h-3.5 w-12 animate-pulse rounded bg-muted sm:h-4" />
          <div className="h-3.5 w-10 animate-pulse rounded bg-muted sm:h-4" />
        </div>
      </div>
    </article>
  );
}
