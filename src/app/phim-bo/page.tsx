import MediaList from "@/components/MediaList";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phim Bộ | Xem Phim Bộ Mới Nhất",
  description:
    "Tổng hợp phim bộ hay, phim bộ mới nhất, chất lượng HD, có phụ đề tiếng Việt. Cập nhật liên tục các bộ phim hấp dẫn từ Hàn Quốc, Trung Quốc, Mỹ và nhiều quốc gia khác.",
  path: "/phim-bo",
  keywords: [
    "phim bộ",
    "phim dài tập",
    "xem phim bộ",
    "phim bộ mới nhất",
    "phim truyền hình",
  ],
  imageAlt: "Phim Bộ Mới Nhất",
});

export default function ShowListPage() {
  return <MediaList type="tv" />;
}
