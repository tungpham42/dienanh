import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import PlayerFrame from "@/components/PlayerFrame";
import { getSeason, getShow } from "@/lib/tmdb";
import { buildMetadata, clip } from "@/lib/seo";
import { tmdbImage } from "@/lib/types";
import { btn } from "@/lib/ui";

type Props = {
  params: Promise<{ showId: string; season: string; episode: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { showId, season, episode } = await params;
  const show = await getShow(showId).catch(() => null);

  if (!show) {
    return buildMetadata({
      title: "Phim Bộ | Xem Phim Bộ Mới Nhất",
      description:
        "Tổng hợp phim bộ hay, phim bộ mới nhất, chất lượng HD, có phụ đề tiếng Việt.",
      path: "/phim-bo",
    });
  }

  return buildMetadata({
    title: `Phim "${show.name}" - Tập ${episode} (Mùa ${season}) | Phim Bộ Mới Nhất`,
    description: show.overview
      ? clip(show.overview)
      : "Xem phim bộ chất lượng cao, cập nhật liên tục. Thưởng thức phim bộ có phụ đề tiếng Việt.",
    path: `/phim-bo/${showId}/${season}/${episode}`,
    keywords: [
      "phim bộ",
      show.name,
      "phim dài tập",
      "xem phim bộ",
      "phim bộ mới nhất",
    ],
    image: show.poster_path ? tmdbImage(show.poster_path, "w780") : undefined,
    imageAlt: show.name,
  });
}

export default async function EpisodePage({ params }: Props) {
  const { showId, season, episode } = await params;
  const [show, seasonData] = await Promise.all([
    getShow(showId),
    getSeason(showId, season),
  ]);
  if (!show || !seasonData) notFound();

  const ep = Number(episode);
  const sn = Number(season);
  const totalEpisodes = seasonData.episodes.length;
  const base = `/phim-bo/${showId}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg bg-surface p-5 shadow-lg md:p-6">
        <h1 className="mb-5 flex flex-wrap items-center justify-center gap-2 text-center text-2xl md:text-3xl">
          <Icon name="tv" className="size-6 text-primary" />
          {show.name} - Tập {episode} (Mùa {season})
        </h1>

        <PlayerFrame
          tmdbId={showId}
          title={`${show.name} - Tập ${episode} Mùa ${season}`}
          season={season}
          episode={episode}
        />

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {ep > 1 && (
            <Link
              href={`${base}/${season}/${ep - 1}`}
              className={btn("outline")}
            >
              <Icon name="arrowLeft" />
              Tập trước
            </Link>
          )}
          {ep < totalEpisodes && (
            <Link
              href={`${base}/${season}/${ep + 1}`}
              className={btn("primary")}
            >
              Tập sau
              <Icon name="arrowRight" />
            </Link>
          )}
          {sn > 1 && (
            <Link href={`${base}/${sn - 1}/1`} className={btn("ghost")}>
              <Icon name="arrowLeft" />
              Mùa trước
            </Link>
          )}
          {sn < show.number_of_seasons && (
            <Link href={`${base}/${sn + 1}/1`} className={btn("ghost")}>
              Mùa sau
              <Icon name="arrowRight" />
            </Link>
          )}
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <Link href={base} className={btn("ghost")}>
            <Icon name="reset" />
            Quay về phim
          </Link>
          <Link href="/" className={btn("ghost")}>
            <Icon name="home" />
            Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
