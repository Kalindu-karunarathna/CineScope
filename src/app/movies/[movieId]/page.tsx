import { MovieDetailsContainer } from "@/features/movie-details/components/MovieDetailsContainer";

interface MoviePageProps {
  params: Promise<{
    movieId: string;
  }>;
}

export default async function MovieDetailsPage({ params }: MoviePageProps) {
  const { movieId } = await params;

  return (
    <main className="min-h-screen bg-background">
      <MovieDetailsContainer movieId={movieId} />
    </main>
  );
}
