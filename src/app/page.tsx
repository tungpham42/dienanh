import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phim Ảnh | Phim Mới Nhất",
  description:
    "Xem phim chất lượng cao, cập nhật liên tục. Thưởng thức phim Hàn Quốc, Trung Quốc, Âu Mỹ,... có phụ đề Việt.",
  path: "/",
  keywords: [
    "phim lẻ",
    "phim bộ",
    "phim dài tập",
    "xem phim lẻ",
    "phim lẻ mới nhất",
    "phim truyền hình",
  ],
  imageAlt: "Phim Mới Nhất",
});

const categories = [
  {
    href: "/phim-le",
    icon: "film",
    title: "Phim lẻ",
    image: "/film.png",
    text: "Xem trọn vẹn trong một buổi tối.",
  },
  {
    href: "/phim-bo",
    icon: "tv",
    title: "Phim bộ",
    image: "/tv.png",
    text: "Hàn, Trung, Việt và nhiều hơn nữa, tập nào cũng muốn xem tiếp.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <Image
          src="/banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="max-w-2xl animate-rise">
            <h1 className="mb-5 text-5xl font-bold uppercase leading-[1.05] md:text-7xl">
              Tắt đèn.
              <br />
              <span className="text-primary">Bấm phát.</span>
            </h1>
            <p className="mb-8 max-w-md text-lg text-zinc-300">
              Hàng ngàn bộ phim có phụ đề Việt, xem mọi lúc trên mọi thiết bị.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/phim-le"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white shadow-xl shadow-primary/40 transition hover:scale-105 hover:bg-primary-hover"
              >
                <Icon name="play" className="size-4 fill-current" />
                Xem phim lẻ
              </Link>
              <Link
                href="/phim-bo"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
              >
                <Icon name="tv" />
                Xem phim bộ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-3xl">Hôm nay xem gì?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative block h-72 overflow-hidden rounded-2xl border border-line transition duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/30"
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="mb-1 flex items-center gap-2 text-3xl">
                  <Icon name={c.icon} className="size-7 text-primary" />
                  {c.title}
                </h3>
                <p className="mb-3 max-w-sm text-sm text-zinc-300">{c.text}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Khám phá
                  <Icon
                    name="arrowRight"
                    className="size-4 transition group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
