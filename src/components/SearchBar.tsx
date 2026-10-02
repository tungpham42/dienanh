"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { btn } from "@/lib/ui";

interface Props {
  placeholder: string;
  onSearch: (query: string) => void;
  onReset: () => void;
}

export default function SearchBar({ placeholder, onSearch, onReset }: Props) {
  const [query, setQuery] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) onSearch(q);
  };

  const reset = () => {
    setQuery("");
    onReset();
  };

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row">
      <form onSubmit={submit} className="flex flex-1">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="min-w-0 flex-1 rounded-l-md border border-line bg-surface px-3 py-2 placeholder:text-muted focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Tìm kiếm"
          className={btn("primary", "md", "rounded-l-none")}
        >
          <Icon name="search" />
        </button>
      </form>
      <button type="button" onClick={reset} className={btn("ghost")}>
        <Icon name="reset" />
        Làm mới
      </button>
    </div>
  );
}
