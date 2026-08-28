import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getTmdbToken(): string {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB_API_READ_ACCESS_TOKEN is not configured.");
  }

  return token;
}

async function proxyToTmdb(request: NextRequest, path: string[]) {
  const endpoint = `/${path.join("/")}`;
  const searchParams = request.nextUrl.search;

  let token: string;
  try {
    token = getTmdbToken();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "TMDB API is not configured on the server." },
      { status: 500 }
    );
  }

  const tmdbResponse = await fetch(`${TMDB_BASE_URL}${endpoint}${searchParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // Cache TMDB responses at the edge/server for a short window instead of
    // refetching on every request.
    next: { revalidate: 60 * 5 },
  });

  const rawBody = await tmdbResponse.text();
  const data = rawBody ? safeJsonParse(rawBody) : null;

  if (!tmdbResponse.ok) {
    return NextResponse.json(
      { message: data?.status_message ?? "TMDB API request failed." },
      { status: tmdbResponse.status }
    );
  }

  if (data === null) {
    return NextResponse.json(
      { message: "Received an unexpected response from TMDB." },
      { status: 502 }
    );
  }

  return NextResponse.json(data, { status: tmdbResponse.status });
}

function safeJsonParse(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyToTmdb(request, path);
}
