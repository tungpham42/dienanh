"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "./Icon";

const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Trang chủ", icon: "home" },
  { href: "/phim-le", label: "Phim lẻ", icon: "film" },
  { href: "/phim-bo", label: "Phim bộ", icon: "tv" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-heading text-2xl tracking-wider">
          <span className="grid size-8 place-items-center rounded-md bg-primary text-white shadow-lg shadow-primary/40">
            <Icon name="play" className="size-4 fill-current" />
          </span>
          <span>
            <span className="font-bold text-primary">PHIM</span>
            <span className="ml-1">ẢNH</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          className="rounded-md border border-line p-2 md:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-5" />
        </button>

        <nav
          id="main-nav"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-background/95 p-4 backdrop-blur-xl md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}
        >
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? "page" : undefined}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                isActive(href)
                  ? "bg-primary font-semibold text-white shadow-lg shadow-primary/30"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              <Icon name={icon} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
