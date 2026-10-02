"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/phim-le", label: "Phim lẻ" },
  { href: "/phim-bo", label: "Phim bộ" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-primary bg-surface shadow-lg shadow-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-heading text-2xl tracking-wide">
          <span className="font-bold text-primary">PHIM</span>
          <span className="ml-1 text-foreground">ẢNH</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="rounded-md border border-line p-2 text-foreground md:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-5" />
        </button>

        <nav
          id="main-nav"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-14.5 z-40 flex-col gap-1 border-b border-line bg-surface p-4 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 transition-colors ${
                isActive(href)
                  ? "font-bold text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
