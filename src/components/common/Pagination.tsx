"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  /** The currently active page (1-indexed). */
  page: number;
  /** Total number of pages available. */
  totalPages: number;
  /** Called when the user requests a new page. */
  onPageChange: (newPage: number) => void;
  /** Suppresses clicks while a page transition is already in progress. */
  isTransitioning?: boolean;
  /** Additional class names for the wrapping nav element. */
  className?: string;
}

/**
 * Reusable pagination control:  Previous  |  Page X of Y  |  Next
 *
 * - Previous is disabled on page 1.
 * - Next is disabled on the last page.
 * - Both are disabled during a transition or when totalPages < 2.
 * - Page numbers outside [1, totalPages] are clamped before being emitted.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  isTransitioning = false,
  className,
}: PaginationProps) {
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;
  const isDisabled = isTransitioning || totalPages < 1;

  function goTo(target: number) {
    // Clamp to the valid range to handle edge cases without crashing.
    const safe = Math.min(Math.max(1, target), Math.max(1, totalPages));
    if (safe !== page) {
      onPageChange(safe);
    }
  }

  return (
    <nav className={className} aria-label="Search results pagination">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <p
          className="text-xs text-muted-foreground sm:text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          Page <span className="font-semibold text-foreground">{page}</span> of{" "}
          <span className="font-semibold text-foreground">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDisabled || !hasPrevious}
            onClick={() => goTo(page - 1)}
            aria-label="Go to previous page"
            className="gap-1 min-h-9 px-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            <span>Previous</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDisabled || !hasNext}
            onClick={() => goTo(page + 1)}
            aria-label="Go to next page"
            className="gap-1 min-h-9 px-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>Next</span>
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
