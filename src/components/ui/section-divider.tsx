import Image from "next/image";

import { Container } from "@/components/ui/container";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type DividerVariant =
  | "orangeLoop"
  | "openBook"
  | "openBookPlain"
  | "leaf"
  | "leafDot"
  | "botanical"
  | "dashed"
  | "dashedAlt";

const dividerAssets: Record<DividerVariant, string> = {
  orangeLoop: assets.dividers.orangeLoop,
  openBook: assets.dividers.openBook,
  openBookPlain: assets.dividers.openBookPlain,
  leaf: assets.dividers.leafOrange,
  leafDot: assets.dividers.leafDot,
  botanical: assets.dividers.botanical,
  dashed: assets.dividers.dashedWave,
  dashedAlt: assets.dividers.dashedWaveAlt,
};

export function SectionDivider({
  variant = "orangeLoop",
  className,
  compact = false,
}: {
  variant?: DividerVariant;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn("pointer-events-none overflow-hidden py-1", className)}
      aria-hidden="true"
    >
      <Container className="flex justify-center">
        <Image
          src={dividerAssets[variant]}
          alt=""
          width={420}
          height={90}
          className={cn(
            "h-auto w-full object-contain opacity-75",
            compact ? "max-h-10 max-w-xs" : "max-h-14 max-w-md",
          )}
        />
      </Container>
    </div>
  );
}
