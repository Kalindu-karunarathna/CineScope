import type { Metadata } from "next";

import { FavoritesPageClient } from "@/features/favorites/components/FavoritesPageClient";

export const metadata: Metadata = {
  // Produces: "My Favorites | CineScope"
  title: "My Favorites",
  description: "View and manage your favorite movies in your personal CineScope collection.",
  /**
   * The Favorites page displays content sourced from browser localStorage — data
   * that is unique to each user and unavailable to search-engine crawlers.
   * Indexing this page would waste crawl budget and produce empty/misleading results,
   * so we mark it noindex while still allowing the crawler to follow its links.
   */
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "My Favorites | CineScope",
    description: "View and manage your favorite movies in your personal CineScope collection.",
    url: "/favorites",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "My Favorites | CineScope",
    description: "View and manage your favorite movies in your personal CineScope collection.",
  },
  alternates: {
    canonical: "/favorites",
  },
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
