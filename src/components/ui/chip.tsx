import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "orange" | "paper" | "dark" | "success";
};

const tones = {
  orange: "border-brand-orange-deep bg-peach text-ink",
  paper: "border-ink/20 bg-cream text-ink",
  dark: "border-charcoal bg-charcoal text-cream",
  success: "border-success/40 bg-success/15 text-ink",
} as const;

export function Chip({
  tone = "paper",
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-xs font-bold tracking-[0.06em] uppercase",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
