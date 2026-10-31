import type { Metadata } from "next";

import { HeroSection } from "@/features/home/components/HeroSection";
import { PopularSection } from "@/features/home/components/PopularSection";
import { TopRatedSection } from "@/features/home/components/TopRatedSection";
import { TrendingSection } from "@/features/home/components/TrendingSection";
import { UpcomingSection } from "@/features/home/components/UpcomingSection";

export const metadata: Metadata = {
  // Produces: "Discover Movies | CineScope"  (via root layout title template)
  title: "Discover Movies",
  description:
    "Discover trending movies, explore popular films, and find your next favorite movie with CineScope.",
  openGraph: {
    title: "Discover Movies | CineScope",
    description:
      "Discover trending movies, explore popular films, and find your next favorite movie with CineScope.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Movies | CineScope",
    description:
      "Discover trending movies, explore popular films, and find your next favorite movie with CineScope.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <HeroSection />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:space-y-12 sm:px-6 sm:py-12 lg:space-y-14 lg:px-8 xl:px-10">
        <TrendingSection />
        <PopularSection />
        <TopRatedSection />
        <UpcomingSection />
      </div>
    </main>
  );
}
