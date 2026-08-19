export function MovieCardSkeleton() {
  return (
    <article
      className="w-full max-w-56 overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
      aria-hidden="true"
    >
      <div className="aspect-2/3 animate-pulse bg-muted" />
      <div className="space-y-2 p-3">
        <div className="h-5 animate-pulse rounded bg-muted" />
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-10 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </article>
  );
}
