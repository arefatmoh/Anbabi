import Image from "next/image";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { PaperPanel } from "@/components/ui/paper-panel";
import { assets } from "@/lib/assets";
import type { CommunityPlatform } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const platformIcons = {
  discussion: assets.icons.discussion,
  book: assets.icons.openBook,
  share: assets.icons.speechBubble,
} as const;

export function CommunityPlatformCard({
  platform,
  className,
}: {
  platform: CommunityPlatform;
  className?: string;
}) {
  return (
    <PaperPanel
      surface={platform.featured ? "orange" : "cream"}
      className={cn(
        "relative flex h-full flex-col overflow-hidden p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <Chip tone={platform.featured ? "dark" : "paper"}>
            {platform.role}
          </Chip>
          <h3 className="font-display mt-5 text-4xl font-semibold tracking-tight">
            {platform.name}
          </h3>
        </div>
        <div className="border-ink bg-paper flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 shadow-[3px_3px_0_#111]">
          <Image
            src={platformIcons[platform.icon]}
            alt=""
            width={64}
            height={64}
            className="size-10 object-contain"
          />
        </div>
      </div>
      <p className="text-ink/72 mt-5 max-w-2xl leading-7">
        {platform.description}
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {platform.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm leading-6">
            <span
              aria-hidden="true"
              className="bg-ink mt-2 size-1.5 shrink-0 rounded-full"
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      {platform.actionHref && platform.actionLabel ? (
        <div className="mt-auto pt-7">
          <LinkButton
            href={platform.actionHref}
            external={platform.external}
            variant={platform.featured ? "secondary" : "ghost"}
          >
            {platform.actionLabel} <ArrowIcon />
          </LinkButton>
        </div>
      ) : null}
    </PaperPanel>
  );
}
