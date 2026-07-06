import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PaperSurface = "cream" | "paper" | "peach" | "charcoal" | "orange";

type PaperPanelProps = HTMLAttributes<HTMLDivElement> & {
  surface?: PaperSurface;
};

const surfaceStyles: Record<PaperSurface, string> = {
  cream: "bg-cream text-ink",
  paper: "bg-paper text-ink",
  peach: "bg-peach text-ink",
  charcoal: "bg-charcoal text-cream",
  orange: "bg-brand-orange text-ink",
};

export function PaperPanel({
  className,
  surface = "cream",
  ...props
}: PaperPanelProps) {
  return (
    <div
      className={cn(
        "border-ink shadow-paper rounded-[1.75rem] border-2 sm:rounded-[2.25rem]",
        surfaceStyles[surface],
        className,
      )}
      {...props}
    />
  );
}
