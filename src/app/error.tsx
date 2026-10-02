"use client";

import { btn } from "@/lib/ui";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="mb-3 text-4xl">Đã có lỗi xảy ra</h1>
      <p className="mb-6 text-muted">
        Không thể tải dữ liệu. Vui lòng thử lại.
      </p>
      <button type="button" onClick={reset} className={btn("primary")}>
        Thử lại
      </button>
    </div>
  );
}
