"use client";

import { useCallback, useEffect, useState } from "react";
import Icon, { Spinner } from "./Icon";
import MediaCard from "./MediaCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { LANGUAGES, type MediaPage, type MediaType } from "@/lib/types";

const COPY = {
  movie: { title: "Phim lẻ", icon: "film", placeholder: "Tìm kiếm phim lẻ..." },
  tv: { title: "Phim bộ", icon: "tv", placeholder: "Tìm kiếm phim bộ..." },
} as const;

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
    const params = new URLSearchParams({
      type,
      page: String(page),
      language,
      query,
    });

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
        setError(
          `Lỗi tải dữ liệu: ${err instanceof Error ? err.message : "Lỗi không xác định"}`,
        );
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

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 flex items-center gap-3 text-3xl">
        <Icon name={copy.icon} className="size-7 text-primary" />
        {copy.title}
      </h1>

      <SearchBar
        placeholder={copy.placeholder}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <label className="mb-6 block">
        <span className="mb-1 block text-sm text-muted">Chọn ngôn ngữ gốc</span>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setQuery("");
            setPage(1);
          }}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 focus:border-primary focus:outline-none"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </label>

      {loading ? (
        <div className="flex flex-col items-center gap-2 py-16">
          <Spinner />
          <p className="text-muted">Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <p
          role="alert"
          className="rounded-md border border-primary/50 bg-primary/10 p-4 text-center text-primary"
        >
          {error}
        </p>
      ) : data.results.length === 0 ? (
        <p className="py-16 text-center text-muted">
          Không tìm thấy kết quả phù hợp.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.results.map((item) => (
              <MediaCard key={item.id} item={item} type={type} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}
