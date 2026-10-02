const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "border-primary bg-primary text-white hover:bg-primary-hover hover:border-primary-hover",
  outline: "border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "border-line text-muted hover:bg-surface-2 hover:text-foreground",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
} as const;

export function btn(
  variant: keyof typeof variants = "primary",
  size: keyof typeof sizes = "md",
  extra = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
