"use client";

import { CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void | Promise<unknown>;
  retryLabel?: string;
}

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Try Again",
}: ErrorStateProps) {
  return (
    <section
      className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 sm:p-6"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2 className="break-words font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
          {onRetry && (
            <Button
              type="button"
              className="mt-4 min-h-11 w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
              variant="outline"
              aria-label={`Retry loading ${title}`}
              onClick={() => void onRetry()}
            >
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
