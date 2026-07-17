import Image from "next/image";
import Link from "next/link";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type BrandLogoTone = "primary" | "inverse" | "footer";

type BrandLogoProps = {
  inverse?: boolean;
  tone?: BrandLogoTone;
  compact?: boolean;
  className?: string;
};

export function BrandLogo({
  inverse = false,
  tone,
  compact = false,
  className,
}: BrandLogoProps) {
  const resolvedTone: BrandLogoTone = tone ?? (inverse ? "inverse" : "primary");

  const logoSrc = compact
    ? resolvedTone === "inverse" || resolvedTone === "footer"
      ? assets.brand.markInverse
      : assets.brand.mark
    : resolvedTone === "footer"
      ? assets.brand.logoFooter
      : resolvedTone === "inverse"
        ? assets.brand.logoInverse
        : assets.brand.logoPrimary;

  return (
    <Link
      href="/"
      aria-label="Read & Revive / አንባቢ home"
      className={cn(
        "focus-visible:outline-brand-orange inline-flex min-h-11 items-center rounded-xl focus-visible:outline-3 focus-visible:outline-offset-4",
        className,
      )}
    >
      <Image
        src={logoSrc}
        alt="Read & Revive / አንባቢ"
        width={compact ? 305 : 306}
        height={compact ? 199 : 238}
        className={cn(
          "h-auto object-contain",
          compact ? "w-12" : "w-[4.8rem] sm:w-[5.4rem]",
        )}
        priority
      />
    </Link>
  );
}
