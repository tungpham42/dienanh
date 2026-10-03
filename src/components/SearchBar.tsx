"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";

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
    <form
      onSubmit={submit}
      className="mb-5 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-5 transition focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/20"
    >
      <Icon name="search" className="size-5 shrink-0 text-muted" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent py-2 placeholder:text-muted focus:outline-none"
      />
      {query && (
        <button type="button" onClick={reset} aria-label="Làm mới" className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-foreground">
          <Icon name="close" />
        </button>
      )}
      <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover">
        Tìm kiếm
      </button>
    </form>
  );
}
