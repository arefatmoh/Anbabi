import Image from "next/image";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type NumberBadgeVariant = "orange" | "cream" | "charcoal";
type NumberBadgeSize = "sm" | "md" | "lg";
type NumberBadgeShape = "circle" | "dashed" | "double" | "sticker";

const shapeAssets: Record<NumberBadgeShape, string> = {
  circle: assets.numberBadges.circle,
  dashed: assets.numberBadges.dashedCircle,
  double: assets.numberBadges.doubleCircle,
  sticker: assets.numberBadges.stickerCircle,
};

const sizeClasses: Record<NumberBadgeSize, string> = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
};

const variantClasses: Record<NumberBadgeVariant, string> = {
  orange: "text-ink",
  cream: "text-ink",
  charcoal: "text-cream",
};

export function NumberBadge({
  value,
  className,
  variant = "orange",
  size = "md",
  shape = "circle",
  tilted = false,
}: {
  value: number | string;
  className?: string;
  variant?: NumberBadgeVariant;
  size?: NumberBadgeSize;
  shape?: NumberBadgeShape;
  tilted?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center font-extrabold",
        sizeClasses[size],
        variantClasses[variant],
        tilted && "rotate-[-4deg]",
        className,
      )}
    >
      <Image
        src={shapeAssets[shape]}
        alt=""
        fill
        sizes="56px"
        className={cn(
          "pointer-events-none object-contain",
          variant === "charcoal" && "brightness-0 invert",
          variant === "cream" && "opacity-80",
        )}
      />
      <span className="relative z-10 leading-none">{value}</span>
    </span>
  );
}
