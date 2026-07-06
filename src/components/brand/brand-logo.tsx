import Image from "next/image";
import Link from "next/link";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
};

export function BrandLogo({
  inverse = false,
  compact = false,
  className,
}: BrandLogoProps) {
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
        src={
          compact
            ? inverse
              ? assets.brand.markInverse
              : assets.brand.mark
            : inverse
              ? assets.brand.logoInverse
              : assets.brand.logoPrimary
        }
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
