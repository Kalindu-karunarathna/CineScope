import { HeroSection } from "@/features/home/components/HeroSection";
import { PopularSection } from "@/features/home/components/PopularSection";
import { TopRatedSection } from "@/features/home/components/TopRatedSection";
import { TrendingSection } from "@/features/home/components/TrendingSection";
import { UpcomingSection } from "@/features/home/components/UpcomingSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrendingSection />
      <PopularSection />
      <TopRatedSection />
      <UpcomingSection />
    </main>
  );
}
