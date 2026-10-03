"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import MediaCard from "./MediaCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { LANGUAGES, type MediaPage, type MediaType } from "@/lib/types";

const COPY = {
  movie: { title: "Phim lẻ", sub: "Một buổi tối, một bộ phim trọn vẹn.", icon: "film", placeholder: "Tìm phim lẻ theo tên..." },
  tv: { title: "Phim bộ", sub: "Chọn một bộ phim và cày cả cuối tuần.", icon: "tv", placeholder: "Tìm phim bộ theo tên..." },
} as const;

const GRID = "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4";

export default function MediaList({ type }: { type: MediaType }) {
  const copy = COPY[type];
  const [data, setData] = useState<MediaPage>({ results: [], totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ type, page: String(page), language, query });

    setLoading(true);
    setError(null);

    fetch(`/api/media?${params}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<MediaPage>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(`Lỗi tải dữ liệu: ${err instanceof Error ? err.message : "Lỗi không xác định"}`);
        setLoading(false);
      });

    return () => controller.abort();
  }, [type, page, language, query]);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setLanguage("");
    setPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setQuery("");
    setLanguage("");
    setPage(1);
  }, []);

  const pickLanguage = (value: string) => {
    setLanguage(value);
    setQuery("");
    setPage(1);
  };

  const changePage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-4xl md:text-5xl">
          <Icon name={copy.icon} className="size-9 text-primary" />
          {copy.title}
        </h1>
        <p className="mt-2 text-muted">{copy.sub}</p>
      </div>

      <SearchBar placeholder={copy.placeholder} onSearch={handleSearch} onReset={handleReset} />

      <div role="group" aria-label="Chọn ngôn ngữ gốc" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1">
        {LANGUAGES.map((l) => {
          const active = !query && language === l.value;
          return (
            <button
              key={l.value}
              type="button"
              onClick={() => pickLanguage(l.value)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
                active
                  ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                  : "border-line bg-surface text-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className={GRID} role="status" aria-label="Đang tải">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="skeleton aspect-2/3 rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div role="alert" className="rounded-xl border border-primary/50 bg-primary/10 p-6 text-center">
          <p className="mb-3 text-primary">{error}</p>
          <button type="button" onClick={handleReset} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">
            Thử lại
          </button>
        </div>
      ) : data.results.length === 0 ? (
        <div className="py-20 text-center">
          <Icon name="search" className="mx-auto mb-3 size-10 text-muted" />
          <p className="text-lg">Không có kết quả cho lựa chọn này</p>
          <p className="mb-5 text-sm text-muted">Thử từ khóa khác hoặc quay lại danh sách đầy đủ.</p>
          <button type="button" onClick={handleReset} className="rounded-full border border-line px-5 py-2 text-sm hover:border-primary">
            Xem tất cả
          </button>
        </div>
      ) : (
        <>
          <div className={GRID}>
            {data.results.map((item) => (
              <MediaCard key={item.id} item={item} type={type} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={changePage} />
        </>
      )}
    </section>
  );
}
