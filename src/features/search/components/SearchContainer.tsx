"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

export function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

  const handleSearchChange = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const cleanNewQuery = newQuery.trim();

      if (cleanNewQuery) {
        params.set("q", cleanNewQuery);
        params.delete("page"); // Reset to page 1 on new query search
      } else {
        params.delete("q");
        params.delete("page");
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `/search?${queryString}` : "/search";
      router.push(targetUrl, { scroll: false });
    },
    [router, searchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage > 1) {
        params.set("page", String(newPage));
      } else {
        params.delete("page");
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `/search?${queryString}` : "/search";
      router.push(targetUrl, { scroll: true });
    },
    [router, searchParams]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 space-y-8">
      {/* Header Title & Subtitle */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Search Movies
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          Explore thousands of movies across TMDB. Enter a title below to get instant results.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="flex justify-center md:justify-start">
        <SearchInput initialQuery={query} onSearch={handleSearchChange} />
      </div>

      {/* Search Results Display */}
      <SearchResults query={query} page={page} onPageChange={handlePageChange} />
    </div>
  );
}
