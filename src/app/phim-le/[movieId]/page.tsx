import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import Icon, { type IconName } from "@/components/Icon";
import PlayerFrame from "@/components/PlayerFrame";
import { getMovie } from "@/lib/tmdb";
import { buildMetadata, clip } from "@/lib/seo";
import { tmdbImage } from "@/lib/types";
import { btn } from "@/lib/ui";

type Props = { params: Promise<{ movieId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params;
  const movie = await getMovie(movieId).catch(() => null);

  if (!movie) {
    return buildMetadata({
      title: "Phim Lẻ | Xem Phim Lẻ Mới Nhất",
      description:
        "Tổng hợp phim lẻ hay, phim lẻ mới nhất, chất lượng HD, có phụ đề tiếng Việt.",
      path: "/phim-le",
    });
  }

  return buildMetadata({
    title: `${movie.title} | Xem Phim Lẻ Mới Nhất`,
    description: movie.overview
      ? clip(movie.overview)
      : "Xem phim lẻ chất lượng cao, cập nhật liên tục. Thưởng thức phim lẻ từ nhiều quốc gia với phụ đề tiếng Việt.",
    path: `/phim-le/${movieId}`,
    keywords: ["phim lẻ", movie.title, "xem phim lẻ", "phim lẻ mới nhất"],
    image: movie.poster_path ? tmdbImage(movie.poster_path, "w780") : undefined,
    imageAlt: `${movie.title} Poster`,
  });
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-2 border-b border-line py-3 last:border-0">
      <Icon name={icon} className="size-4 text-primary" />
      <strong>{label}:</strong> {value}
    </li>
  );
}

export default async function MovieDetailsPage({ params }: Props) {
  const { movieId } = await params;
  const movie = await getMovie(movieId);
  if (!movie) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-6 md:flex-row">
        {movie.poster_path && (
          <Image
            src={tmdbImage(movie.poster_path)}
            alt={movie.title}
            width={300}
            height={450}
            priority
            className="h-auto w-full max-w-xs shrink-0 self-start rounded-lg shadow-lg max-md:mx-auto"
          />
        )}
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl">{movie.title || "Không có tiêu đề"}</h1>
            <Badge>
              <Icon name="film" />
              Phim lẻ
            </Badge>
          </div>
          <p className="text-zinc-300">{movie.overview || "Không có mô tả."}</p>
        </div>
      </div>

      <section className="mb-6 rounded-lg bg-surface p-5 shadow">
        <h2 className="mb-2 text-xl text-primary">Thông tin phim</h2>
        <ul>
          <InfoRow
            icon="calendar"
            label="Ngày phát hành"
            value={movie.release_date || "N/A"}
          />
          <InfoRow
            icon="clock"
            label="Thời lượng"
            value={movie.runtime ? `${movie.runtime} phút` : "N/A"}
          />
          <InfoRow
            icon="star"
            label="Điểm đánh giá"
            value={
              movie.vote_average
                ? `${movie.vote_average.toFixed(1)} / 10`
                : "N/A"
            }
          />
        </ul>
      </section>

      <section className="mb-6 rounded-lg bg-surface p-5 shadow">
        <h2 className="mb-3 text-xl text-primary">Xem phim</h2>
        <PlayerFrame tmdbId={movieId} title={movie.title} />
      </section>

      <div className="text-center">
        <Link href="/phim-le" className={btn("ghost")}>
          <Icon name="home" />
          Quay về danh sách phim lẻ
        </Link>
      </div>
    </div>
  );
}
