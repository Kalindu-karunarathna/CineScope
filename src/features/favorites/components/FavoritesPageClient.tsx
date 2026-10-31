"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
import { FavoritesGrid } from "./FavoritesGrid";

export function FavoritesPageClient() {
  const { favorites } = useFavorites();
  const count = favorites.length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="space-y-3 border-b pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                <Heart className="size-5 fill-rose-500" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Favorites
              </h1>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {count === 0
                ? "You haven't saved any movies yet."
                : `You have ${count} saved ${count === 1 ? "movie" : "movies"}. Click the heart on any card to remove it.`}
            </p>
          </div>

          {count > 0 && (
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "shrink-0 self-start gap-1.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              Discover More
            </Link>
          )}
        </div>
      </header>

      {/* Content */}
      <FavoritesGrid />
    </div>
  );
}
