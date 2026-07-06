import Image from "next/image";

import { BookCoverPlaceholder } from "@/components/cycle/book-cover-placeholder";
import { CycleStatusChip } from "@/components/cycle/cycle-status-chip";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { DecorativeAsset } from "@/components/ui/doodle-decoration";
import { PaperPanel } from "@/components/ui/paper-panel";
import { assets } from "@/lib/assets";
import type { ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const metadata = [
  { key: "dateLabel", label: "Dates", icon: assets.icons.calendar },
  { key: "durationLabel", label: "Rhythm", icon: assets.icons.discussion },
  { key: "targetLabel", label: "Target", icon: assets.icons.notebook },
] as const;

export function CurrentCycleHero({
  cycle,
  compact = false,
}: {
  cycle: ReadingCycle;
  compact?: boolean;
}) {
  return (
    <PaperPanel
      className={cn(
        "paper-grain relative overflow-hidden",
        compact ? "p-6 sm:p-8" : "p-6 sm:p-10 lg:p-12",
      )}
    >
      <DecorativeAsset
        src={assets.cycle.path}
        width={456}
        height={160}
        className="absolute top-8 right-8 hidden w-72 rotate-3 opacity-18 lg:block"
      />
      <DecorativeAsset
        src={assets.cycle.flag}
        width={150}
        height={150}
        className="absolute top-6 left-8 hidden w-14 -rotate-6 opacity-70 sm:block lg:left-auto lg:right-[42%]"
      />
      <div
        className={cn(
          "grid items-center gap-8",
          compact
            ? "lg:grid-cols-[0.72fr_1.28fr]"
            : "lg:grid-cols-[0.8fr_1.2fr] lg:gap-14",
        )}
      >
        <BookCoverPlaceholder
          book={cycle.book}
          className={compact ? "max-w-52" : "max-w-72"}
        />
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2">
            <CycleStatusChip status={cycle.status} label={cycle.statusLabel} />
          </div>
          <p className="font-note text-brand-orange-deep mt-5 text-2xl">
            Current Reading Cycle
          </p>
          <h2
            className={cn(
              "font-display mt-2 leading-[1.02] font-semibold tracking-[-0.035em] text-balance",
              compact
                ? "text-4xl sm:text-5xl"
                : "text-5xl sm:text-6xl lg:text-7xl",
            )}
          >
            {cycle.title}
          </h2>
          <p className="text-ink/72 mt-5 max-w-2xl leading-7 sm:text-lg sm:leading-8">
            {cycle.shortDescription}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {metadata.map((item) => (
              <div
                key={item.key}
                className="border-ink/15 bg-paper/70 flex items-start gap-3 rounded-2xl border p-3"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="mt-0.5 size-8 object-contain"
                />
                <div>
                  <p className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase">
                    {item.label}
                  </p>
                  <p className="text-ink/70 mt-1 text-xs leading-5">
                    {cycle[item.key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              id="cycle-primary-cta"
              href={siteConfig.telegramUrl}
              external
              size="lg"
            >
              Join Current Reading Cycle <ArrowIcon />
            </LinkButton>
            {compact ? (
              <LinkButton href="/current-cycle" variant="secondary" size="lg">
                View cycle details
              </LinkButton>
            ) : null}
          </div>
          <p className="text-ink/55 mt-3 text-xs">
            Reading prompts and circle discussions continue in Telegram.
          </p>
        </div>
      </div>
    </PaperPanel>
  );
}
