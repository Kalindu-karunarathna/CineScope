import Link from "next/link";
import { Film } from "lucide-react";

import { ThemeToggle } from "@/components/common/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Film className="size-4" aria-hidden="true" />
          </div>
          <span>CineScope</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
