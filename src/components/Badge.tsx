import type { ReactNode } from "react";

export default function Badge({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "neutral";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-sm font-medium text-white ${
        tone === "primary" ? "bg-primary" : "bg-zinc-600"
      }`}
    >
      {children}
    </span>
  );
}
