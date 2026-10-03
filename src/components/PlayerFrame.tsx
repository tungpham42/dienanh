const EMBED_URL = "https://seplayer.netlify.app";

interface Props {
  tmdbId: string;
  title: string;
  season?: string;
  episode?: string;
}

export default function PlayerFrame({ tmdbId, title, season, episode }: Props) {
  const params = new URLSearchParams({ video_id: tmdbId, tmdb: "1" });
  if (season) params.set("s", season);
  if (episode) params.set("e", episode);

  return (
    <div className="aspect-video overflow-hidden rounded-xl border border-line bg-black shadow-2xl shadow-primary/20 ring-1 ring-primary/30">
      <iframe src={`${EMBED_URL}?${params}`} title={title} allowFullScreen className="size-full" />
    </div>
  );
}
