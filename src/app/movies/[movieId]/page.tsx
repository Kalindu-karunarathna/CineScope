import type { Metadata } from "next";

import { getMovieDetailsServer } from "@/services/tmdb/tmdb-server";
import { MovieDetailsContainer } from "@/features/movie-details/components/MovieDetailsContainer";

interface MoviePageProps {
  params: Promise<{
    movieId: string;
  }>;
}

/** TMDB poster/backdrop image CDN base — publicly accessible, no credentials needed. */
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

/**
 * Truncate an overview to a sensible meta-description length.
 * Search engines typically display ~155–160 characters.
 */
function truncateDescription(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text;
  return (
    text
      .slice(0, maxLength)
      .replace(/\s+\S*$/, "")
      .trimEnd() + "…"
  );
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { movieId } = await params;
  const numericId = parseInt(movieId, 10);

  // Guard: invalid ID — return minimal fallback metadata
  if (isNaN(numericId) || numericId <= 0) {
    return {
      title: "Movie Not Found",
      description: "The requested movie could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const movie = await getMovieDetailsServer(numericId);

  // Guard: TMDB returned nothing for this ID
  if (!movie) {
    return {
      title: "Movie Not Found",
      description: "The requested movie could not be found on TMDB.",
      robots: { index: false, follow: false },
    };
  }

  const title = movie.title;
  const description = movie.overview
    ? truncateDescription(movie.overview)
    : `Explore ${title} on CineScope — details, cast, and more.`;

  // Prefer the backdrop for wide OG images; fall back to poster; fall back to nothing.
  const ogImagePath = movie.backdrop_path ?? movie.poster_path;
  const ogImages = ogImagePath
    ? [
        {
          url: `${TMDB_IMAGE_BASE}/w1280${ogImagePath}`,
          width: 1280,
          height: movie.backdrop_path ? 720 : 1920,
          alt: title,
        },
      ]
    : [];

  const canonicalPath = `/movies/${numericId}`;

  return {
    // Produces: "<Movie Title> | CineScope"
    title,
    description,

    openGraph: {
      type: "video.movie",
      title: `${title} | CineScope`,
      description,
      url: canonicalPath,
      images: ogImages,
      siteName: "CineScope",
    },

    twitter: {
      card: ogImages.length > 0 ? "summary_large_image" : "summary",
      title: `${title} | CineScope`,
      description,
      ...(ogImages.length > 0 && { images: [ogImages[0].url] }),
    },

    alternates: {
      canonical: canonicalPath,
    },
  };
}

export default async function MovieDetailsPage({ params }: MoviePageProps) {
  const { movieId } = await params;

  return (
    <main className="min-h-screen bg-background">
      <MovieDetailsContainer movieId={movieId} />
    </main>
  );
}
