export type MediaType = "movie" | "tv";

export interface MediaSummary {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  voteAverage: number;
  year: string;
}

export interface MediaPage {
  results: MediaSummary[];
  totalPages: number;
}

export const LANGUAGES = [
  { value: "", label: "Tất cả" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "zh", label: "Tiếng Trung" },
  { value: "en", label: "Tiếng Anh" },
  { value: "ja", label: "Tiếng Nhật" },
  { value: "ko", label: "Tiếng Hàn" },
  { value: "th", label: "Tiếng Thái" },
] as const;

export const tmdbImage = (
  path: string,
  size: "w500" | "w780" | "w1280" = "w500",
) => `https://image.tmdb.org/t/p/${size}${path}`;

export const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
