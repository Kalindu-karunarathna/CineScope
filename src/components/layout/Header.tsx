import Link from "next/link";
import { Film, Heart, Search } from "lucide-react";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link
          href="/"
          aria-label="CineScope home"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Film className="size-4" aria-hidden="true" />
          </div>
          <span>CineScope</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/favorites"
            aria-label="My favorites"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <Heart className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
          <Link
            href="/search"
            aria-label="Search movies"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <Search className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
