import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const decorationAssets = {
  arrowLoop: assets.doodles.arrowLoopOrange,
  arrowLoopAlt: assets.doodles.arrowLoopOrangeAlt,
  arrowDashedLoop: assets.doodles.arrowDashedLoopOrange,
  arrowCurve: assets.doodles.arrowCurveOrange,
  arrowCurveAlt: assets.doodles.arrowCurveOrangeThird,
  emphasisArrow: assets.doodles.emphasisArrowOrange,
  emphasisRays: assets.doodles.emphasisRaysOrange,
  sparkle: assets.doodles.sparkleOrange,
  sparkleAlt: assets.doodles.sparkleOrangeAlt,
  sparkleRays: assets.doodles.sparkleRaysOrange,
  readingPath: assets.doodles.readingPathAlt,
  readingPathLoop: assets.doodles.readingPathLoopBlack,
  circleScribble: assets.doodles.circleScribbleBlack,
  star: assets.doodles.starOrange,
  highlight: assets.doodles.highlightOrange,
  stickyNoteCream: assets.stickers.stickyNoteCream,
  tornNoteTaped: assets.stickers.tornNoteTaped,
  tornNotePeach: assets.stickers.tornNotePeachPinned,
  tornPaperStrip: assets.stickers.tornPaperStrip,
  tapeOrange: assets.stickers.tapeOrange,
  tapeCream: assets.stickers.tapeCream,
  tapeStriped: assets.stickers.tapeStripedOrange,
  stampOrange: assets.stickers.stampOrangeBorder,
  ctaBookSpark: assets.cta.bookSpark,
  ctaCorner: assets.cta.cornerFlourish,
  ctaSparkle: assets.cta.sparkleCluster,
  ctaSparkleAlt: assets.cta.sparkleClusterAlt,
  ctaSparkleSwish: assets.cta.sparkleSwish,
  ctaLoopArrow: assets.cta.loopArrow,
  ctaLoopArrowAlt: assets.cta.loopArrowAlt,
  ctaDashedArrow: assets.cta.dashedArrow,
  ctaOpenBook: assets.cta.openBookRays,
  ctaOpenBookAlt: assets.cta.openBookRaysAlt,
  ctaPageSwish: assets.cta.pageSwish,
  communityBubble: assets.community.bubbleOrange,
  communityConnection: assets.community.connectionPath,
  communityGroup: assets.community.groupOrange,
  communityHeart: assets.community.heartRays,
  voicesQuote: assets.voices.quoteOrange,
  voicesPaperNote: assets.voices.paperNote,
  voicesBookmark: assets.voices.bookmarkOrange,
  voicesUnderline: assets.voices.underline,
  contactStamp: assets.contact.stamp,
  contactTape: assets.contact.tapeOrange,
  policyPaper: assets.policy.tornPaper,
} as const;

export type DoodleAssetKey = keyof typeof decorationAssets;

type DecorativeAssetProps = Omit<
  ComponentPropsWithoutRef<typeof Image>,
  "alt"
> & {
  alt?: "";
  mobileHidden?: boolean;
};

export function DecorativeAsset({
  alt = "",
  className,
  mobileHidden = false,
  ...props
}: DecorativeAssetProps) {
  return (
    <Image
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      className={cn(
        "pointer-events-none select-none",
        mobileHidden && "max-sm:hidden",
        className,
      )}
      {...props}
    />
  );
}

type DoodleDecorationProps = Omit<DecorativeAssetProps, "src"> & {
  asset: DoodleAssetKey;
};

export function DoodleDecoration({
  asset,
  className,
  alt = "",
  ...props
}: DoodleDecorationProps) {
  return (
    <DecorativeAsset
      src={decorationAssets[asset]}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
