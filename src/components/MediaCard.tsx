import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { btn } from "@/lib/ui";
import {
  tmdbImage,
  truncate,
  type MediaSummary,
  type MediaType,
} from "@/lib/types";

export default function MediaCard({
  item,
  type,
}: {
  item: MediaSummary;
  type: MediaType;
}) {
  const href = `/${type === "movie" ? "phim-le" : "phim-bo"}/${item.id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface-2 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/40">
      <Link
        href={href}
        className="relative block aspect-2/3 bg-surface"
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.posterPath ? (
          <Image
            src={tmdbImage(item.posterPath)}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted">
            <Icon name="film" className="size-12" />
          </div>
        )}
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
          <Icon name="star" className="size-3" />
          {item.voteAverage.toFixed(1)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-xl leading-snug">
          <Link href={href} className="text-primary hover:underline">
            {truncate(item.title, 80)}
          </Link>
        </h3>
        <p className="text-sm text-muted">{item.year || "N/A"}</p>
        <p className="text-sm">
          {item.overview ? truncate(item.overview, 80) : "Không có mô tả."}
        </p>
        <Link href={href} className={btn("primary", "sm", "mt-auto w-full")}>
          <Icon name={type === "movie" ? "film" : "play"} />
          Xem chi tiết
        </Link>
      </div>
    </article>
  );
}
