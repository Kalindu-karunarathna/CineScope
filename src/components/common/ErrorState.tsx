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
    >
      <div className="flex items-start gap-3">
        <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
        <div className="min-w-0">
          <h2 className="font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          {onRetry && (
            <Button className="mt-4" variant="outline" onClick={() => void onRetry()}>
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
