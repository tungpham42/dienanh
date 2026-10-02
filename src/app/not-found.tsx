import Link from "next/link";
import { btn } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="mb-3 text-4xl">Không tìm thấy trang</h1>
      <p className="mb-6 text-muted">
        Nội dung bạn tìm không tồn tại hoặc đã bị gỡ.
      </p>
      <Link href="/" className={btn("primary")}>
        Về trang chủ
      </Link>
    </div>
  );
}
