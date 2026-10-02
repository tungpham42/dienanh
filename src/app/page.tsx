import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { btn } from "@/lib/ui";
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
    text: "Tuyển tập các bộ phim lẻ hay nhất được cập nhật liên tục.",
  },
  {
    href: "/phim-bo",
    icon: "tv",
    title: "Phim bộ",
    image: "/tv.png",
    text: "Phim bộ đặc sắc từ Hàn Quốc, Trung Quốc, Việt Nam và hơn thế nữa.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative flex h-[70vh] items-center overflow-hidden">
        <Image
          src="/banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto w-full max-w-6xl px-4 text-center lg:text-left">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Khám phá thế giới điện ảnh
          </h1>
          <p className="mb-8 max-w-xl text-lg text-zinc-200 max-lg:mx-auto">
            Hàng ngàn bộ phim chất lượng cao đang chờ bạn khám phá. Xem mọi lúc,
            mọi nơi trên mọi thiết bị.
          </p>
          <Link href="/phim-le" className={btn("primary", "lg")}>
            <Icon name="play" />
            Xem ngay
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center text-3xl">Danh mục phim</h2>
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {categories.map((c) => (
            <article
              key={c.href}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface-2 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/40"
            >
              <Link
                href={c.href}
                className="relative block h-52"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 384px, 100vw"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-2xl">
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-2 text-primary"
                  >
                    <Icon name={c.icon} className="size-5" />
                    {c.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted">{c.text}</p>
                <Link href={c.href} className={btn("outline", "md", "mt-auto")}>
                  Khám phá
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
