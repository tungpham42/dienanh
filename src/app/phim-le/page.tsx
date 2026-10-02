import MediaList from "@/components/MediaList";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phim Lẻ | Xem Phim Lẻ Mới Nhất",
  description:
    "Tổng hợp phim lẻ hay, phim lẻ mới nhất, chất lượng HD, có phụ đề tiếng Việt. Cập nhật liên tục các bộ phim hấp dẫn từ Hàn Quốc, Trung Quốc, Mỹ và nhiều quốc gia khác.",
  path: "/phim-le",
  keywords: ["phim lẻ", "xem phim lẻ", "phim lẻ mới nhất", "phim chiếu rạp"],
  imageAlt: "Phim Lẻ Mới Nhất",
});

export default function MovieListPage() {
  return <MediaList type="movie" />;
}
