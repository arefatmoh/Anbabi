import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Section<T extends ElementType = "section">({
  as,
  className,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn("py-14 sm:py-18 lg:py-24", className)}
      {...props}
    />
  );
}
