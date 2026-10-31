"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchInput({
  initialQuery = "",
  onSearch,
  placeholder = "Search for movies by title...",
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);

  // Sync state during render when initialQuery prop changes (e.g. browser back/forward)
  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setSearchTerm(initialQuery);
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Trigger search when debounced value changes and differs from current URL query
  useEffect(() => {
    if (debouncedSearchTerm.trim() !== initialQuery.trim()) {
      onSearch(debouncedSearchTerm.trim());
    }
  }, [debouncedSearchTerm, initialQuery, onSearch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-2xl items-center gap-2"
    >
      <label htmlFor="movie-search-input" className="sr-only">
        Search movies
      </label>

      <div className="relative flex-1">
        <Search
          className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />

        <Input
          id="movie-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 min-h-11 text-base sm:text-sm"
          autoComplete="off"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Clear search query"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="min-h-11 px-5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Search className="size-4 mr-1.5" aria-hidden="true" />
        <span>Search</span>
      </Button>
    </form>
  );
}
