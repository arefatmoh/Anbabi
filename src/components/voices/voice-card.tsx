import Image from "next/image";
import Link from "next/link";

import { Chip } from "@/components/ui/chip";
import { ReactionBar } from "@/components/ui/reaction-bar";
import { assets } from "@/lib/assets";
import type { MockVoice } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const coverAssets = {
  voices: assets.illustrations.voicesFromCircle,
  notebook: assets.illustrations.writingReflection,
  reader: assets.illustrations.singleReader,
} as const;

export function VoiceCard({
  voice,
  featured = false,
  mobileSwipe = false,
}: {
  voice: MockVoice;
  featured?: boolean;
  mobileSwipe?: boolean;
}) {
  return (
    <article
      className={cn(
        "border-ink bg-cream group relative overflow-hidden rounded-[1.75rem] border-2 shadow-[4px_4px_0_#111]",
        featured && !mobileSwipe && "md:grid md:grid-cols-[0.72fr_1.28fr]",
      )}
    >
      <div
        className={cn(
          "bg-peach relative overflow-hidden",
          featured && !mobileSwipe ? "min-h-64" : "h-44",
        )}
      >
        <Image
          src={coverAssets[voice.cover]}
          alt=""
          width={1213}
          height={880}
          className="duration-standard absolute inset-0 h-full w-full object-contain p-5 transition-transform motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {featured && !mobileSwipe ? <Chip tone="orange">Featured voice</Chip> : null}
          <Chip>{voice.category}</Chip>
        </div>
        <h3
          className={cn(
            "font-display mt-4 leading-tight font-semibold",
            featured && !mobileSwipe ? "text-3xl sm:text-4xl" : "text-2xl",
          )}
        >
          <Link
            href={`/voices/${voice.slug}`}
            className="focus-visible:outline-brand-orange rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4"
          >
            {voice.title}
          </Link>
        </h3>
        {!mobileSwipe ? (
          <p className="text-ink/70 mt-3 text-sm leading-7">{voice.excerpt}</p>
        ) : null}
        <p className="text-ink/55 mt-4 text-xs">
          From <span className="font-semibold">{voice.relatedBook}</span>
        </p>
        <div className="text-ink/55 mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <span>{voice.author}</span>
          <span aria-hidden="true">·</span>
          <span>{voice.publishedLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{voice.readingTime}</span>
        </div>
        {!mobileSwipe ? (
          <Link
            href={`/voices/${voice.slug}`}
            className="text-brand-orange-deep focus-visible:outline-brand-orange mt-5 inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-4 focus-visible:rounded focus-visible:outline-3"
          >
            Read this voice
          </Link>
        ) : null}

        <ReactionBar
          contentId={`voice-card:${voice.slug}`}
          label={`React to ${voice.title}`}
          compact
        />
      </div>
    </article>
  );
}
