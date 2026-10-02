import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import { getSeason, getShow } from "@/lib/tmdb";
import { buildMetadata, clip } from "@/lib/seo";
import { tmdbImage } from "@/lib/types";
import { btn } from "@/lib/ui";

type Props = { params: Promise<{ showId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { showId } = await params;
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
    title: `${show.name} | Phim Bộ Mới Nhất`,
    description: show.overview
      ? clip(show.overview)
      : "Xem phim bộ chất lượng cao, cập nhật liên tục. Thưởng thức phim bộ có phụ đề tiếng Việt.",
    path: `/phim-bo/${showId}`,
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

export default async function ShowDetailsPage({ params }: Props) {
  const { showId } = await params;
  const show = await getShow(showId);
  if (!show) notFound();

  const seasons = (
    await Promise.all(
      show.seasons.map((s) => getSeason(showId, String(s.season_number))),
    )
  ).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col gap-6 md:flex-row">
        {show.poster_path && (
          <Image
            src={tmdbImage(show.poster_path)}
            alt={show.name}
            width={300}
            height={450}
            priority
            className="h-auto w-full max-w-xs shrink-0 self-start rounded-lg shadow-lg max-md:mx-auto"
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl">{show.name}</h1>
            <Badge>
              <Icon name="tv" />
              Phim bộ
            </Badge>
          </div>

          <p className="mb-4 text-zinc-300">
            {show.overview || "Không có mô tả."}
          </p>

          <div className="mb-6 flex gap-3">
            <Badge tone="neutral">
              <Icon name="list" />
              {show.number_of_seasons} Mùa
            </Badge>
            <Badge tone="neutral">
              <Icon name="play" />
              {show.number_of_episodes} Tập
            </Badge>
          </div>

          <div className="mb-6 space-y-2">
            {seasons.map((season, i) => (
              <details
                key={season.id}
                open={i === 0}
                className="group overflow-hidden rounded-md border border-line bg-surface"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 hover:bg-surface-2">
                  <span>
                    <strong className="text-primary">
                      Mùa {season.season_number}
                    </strong>
                    <span className="ml-2 text-muted">
                      ({season.episodes.length} Tập)
                    </span>
                  </span>
                  <Icon
                    name="chevronDown"
                    className="size-4 transition-transform group-open:rotate-180"
                  />
                </summary>
                <ul className="divide-y divide-line border-t border-line">
                  {season.episodes.map((ep) => (
                    <li key={ep.id} className="p-2">
                      <Link
                        href={`/phim-bo/${showId}/${season.season_number}/${ep.episode_number}`}
                        className={btn(
                          "outline",
                          "md",
                          "w-full justify-start text-left",
                        )}
                      >
                        <Icon name="play" className="size-4 shrink-0" />
                        <span className="truncate">
                          Tập {ep.episode_number}: {ep.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <Link href="/phim-bo" className={btn("ghost")}>
            <Icon name="home" />
            Quay về danh sách phim
          </Link>
        </div>
      </div>
    </div>
  );
}
