import type { ReactNode } from "react";

export default function Badge({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "neutral" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
        tone === "primary"
          ? "bg-primary text-white shadow-md shadow-primary/30"
          : "border border-line bg-surface-2 text-foreground"
      }`}
    >
      {children}
    </span>
  );
}
