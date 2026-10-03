import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { tmdbImage, truncate, type MediaSummary, type MediaType } from "@/lib/types";

export default function MediaCard({ item, type }: { item: MediaSummary; type: MediaType }) {
  const href = `/${type === "movie" ? "phim-le" : "phim-bo"}/${item.id}`;

  return (
    <Link
      href={href}
      aria-label={`${item.title} ${item.year || ""}`.trim()}
      className="group relative block aspect-2/3 overflow-hidden rounded-xl border border-line bg-surface transition duration-300 hover:z-10 hover:scale-[1.04] hover:border-primary hover:shadow-2xl hover:shadow-primary/40"
    >
      {item.posterPath ? (
        <Image
          src={tmdbImage(item.posterPath)}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="grid h-full place-items-center text-muted">
          <Icon name="film" className="size-12" />
        </div>
      )}

      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-gold backdrop-blur">
        <Icon name="star" className="size-3 fill-current" />
        {item.voteAverage.toFixed(1)}
      </span>

      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black via-black/60 to-transparent p-3 pt-24">
        <h3 className="text-lg leading-tight">{truncate(item.title, 60)}</h3>
        <p className="text-xs text-muted">{item.year || "N/A"}</p>
        <p className="mt-2 hidden text-xs text-zinc-300 md:group-hover:line-clamp-3">
          {item.overview ? truncate(item.overview, 110) : "Không có mô tả."}
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white md:translate-y-2 md:opacity-0 md:transition md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <Icon name="play" className="size-3 fill-current" />
          Xem ngay
        </span>
      </div>
    </Link>
  );
}
