import type { Metadata } from "next";

import { FavoritesPageClient } from "@/features/favorites/components/FavoritesPageClient";

export const metadata: Metadata = {
  title: "My Favorites — CineScope",
  description:
    "Your saved favorite movies on CineScope. Add movies from any page and find them here.",
};

export default function FavoritesPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-7xl px-4 py-10 outline-none sm:px-6 sm:py-12 lg:px-8 xl:px-10"
    >
      <FavoritesPageClient />
    </main>
  );
}
