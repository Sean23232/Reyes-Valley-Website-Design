export type ButtonVariant =
  | "accent"
  | "navy"
  | "outline"
  | "outlineLight"
  | "white";

export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-lg font-semibold tracking-tight transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-[42px] px-4 text-sm",
  md: "min-h-[50px] px-6 text-[0.95rem]",
  lg: "min-h-[56px] px-7 text-base",
};

const VARIANTS: Record<ButtonVariant, string> = {
  accent:
    "bg-clay-600 text-white shadow-[0_10px_24px_-14px_rgba(156,87,31,0.9)] hover:bg-clay-700 active:bg-clay-700",
  navy: "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950",
  outline:
    "border border-navy-900/20 bg-white text-navy-900 hover:border-navy-900/60 hover:bg-navy-900 hover:text-white",
  outlineLight:
    "border border-white/40 bg-white/5 text-white hover:bg-white hover:text-navy-900",
  white: "bg-white text-navy-900 hover:bg-sand-100",
};

export function btn(
  variant: ButtonVariant = "accent",
  size: ButtonSize = "md",
  extra = "",
): string {
  return [BASE, SIZES[size], VARIANTS[variant], extra].filter(Boolean).join(" ");
}
