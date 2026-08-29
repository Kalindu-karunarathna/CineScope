"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ErrorState } from "@/components/common/ErrorState";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieDetailsErrorProps {
  onRetry?: () => void;
  title?: string;
  description?: string;
}

export function MovieDetailsError({
  onRetry,
  title = "Unable to load movie details",
  description = "We couldn't retrieve the requested movie information. Please check your connection and try again.",
}: MovieDetailsErrorProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-6">
      <div>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-2 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>

      <ErrorState
        title={title}
        description={description}
        onRetry={onRetry}
        retryLabel="Try Again"
      />
    </div>
  );
}
