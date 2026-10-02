import "server-only";
import { cache } from "react";
import type { MediaPage, MediaType } from "./types";

const BASE_URL = "https://api.themoviedb.org/3";

export class TmdbError extends Error {
  constructor(
    public status: number,
    path: string,
  ) {
    super(`TMDB ${status} on ${path}`);
  }
}

type Params = Record<string, string | number | undefined>;

async function tmdb<T>(
  path: string,
  params: Params = {},
  revalidate = 3600,
): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("Missing TMDB_API_KEY environment variable");

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "vi");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "")
      url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) throw new TmdbError(res.status, path);
  return res.json() as Promise<T>;
}

/** Returns null on 404, throws on any other failure. */
async function orNull<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise;
  } catch (err) {
    if (err instanceof TmdbError && err.status === 404) return null;
    throw err;
  }
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
}

export interface Episode {
  id: number;
  episode_number: number;
  name: string;
}

export interface Season {
  id: number;
  season_number: number;
  episodes: Episode[];
}

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: { season_number: number }[];
}

// React `cache` dedupes calls between generateMetadata and the page itself.
export const getMovie = cache((id: string) =>
  orNull(tmdb<Movie>(`/movie/${id}`)),
);
export const getShow = cache((id: string) => orNull(tmdb<TvShow>(`/tv/${id}`)));
export const getSeason = cache((id: string, season: string) =>
  orNull(tmdb<Season>(`/tv/${id}/season/${season}`)),
);

interface RawItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface ListArgs {
  type: MediaType;
  page: number;
  language: string;
  query: string;
}

export async function listMedia({
  type,
  page,
  language,
  query,
}: ListArgs): Promise<MediaPage> {
  const path = query
    ? `/search/${type}`
    : language
      ? `/discover/${type}`
      : `/trending/${type}/day`;

  const data = await tmdb<{ results: RawItem[]; total_pages: number }>(
    path,
    { page, query, with_original_language: query ? undefined : language },
    600,
  );

  return {
    // TMDB caps pagination at 500 pages.
    totalPages: Math.min(data.total_pages, 500),
    results: data.results.map((item) => ({
      id: item.id,
      title: item.title ?? item.name ?? "",
      overview: item.overview,
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
      year: (item.release_date ?? item.first_air_date ?? "").split("-")[0],
    })),
  };
}
