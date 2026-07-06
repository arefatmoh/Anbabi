import Image from "next/image";

import { Chip } from "@/components/ui/chip";
import { NumberBadge } from "@/components/ui/number-badge";
import type { ScheduleStep, TimelineState } from "@/lib/content-types";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const stateStyles: Record<TimelineState, string> = {
  completed: "border-success bg-success/15",
  current: "border-brand-orange-deep bg-peach shadow-[4px_4px_0_#C2410C]",
  upcoming: "border-ink/35 bg-cream",
  missed: "border-danger bg-danger/10",
  closing: "border-ink bg-warm-yellow/45",
};

const stateLabels: Record<TimelineState, string> = {
  completed: "Completed",
  current: "This week",
  upcoming: "Upcoming",
  missed: "Missed",
  closing: "Closing step",
};

const timelineIcons = [
  assets.icons.calendar,
  assets.icons.notebook,
  assets.icons.discussion,
  assets.icons.trophy,
] as const;

function TimelineStep({ step, index }: { step: ScheduleStep; index: number }) {
  return (
    <li className="relative grid grid-cols-[2.75rem_1fr] gap-4 md:block">
      <NumberBadge
        value={index + 1}
        shape={step.state === "current" ? "sticker" : "circle"}
        tilted={step.state === "current"}
        className="relative z-10 md:mx-auto"
      />
      <article
        className={cn(
          "relative overflow-hidden rounded-[1.5rem] border-2 p-5 md:mt-5 md:min-h-64",
          stateStyles[step.state],
        )}
      >
        <Image
          src={timelineIcons[index % timelineIcons.length]}
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className="pointer-events-none absolute right-4 bottom-4 hidden size-9 object-contain opacity-25 sm:block"
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-extrabold tracking-[0.12em] uppercase">
            {step.label}
          </p>
          <Chip tone="paper" className="text-[0.65rem]">
            {stateLabels[step.state]}
          </Chip>
        </div>
        <h3 className="font-display mt-3 text-2xl font-semibold">
          {step.title}
        </h3>
        <p className="text-ink/70 mt-3 text-sm leading-6">
          {step.readingTarget}
        </p>
        <div className="border-ink/15 mt-4 border-t pt-4">
          <p className="text-xs font-extrabold tracking-wide uppercase">
            Reflection prompt
          </p>
          <p className="text-ink/70 mt-1 text-sm leading-6">{step.prompt}</p>
        </div>
      </article>
    </li>
  );
}

export function ReadingTimeline({ steps }: { steps: readonly ScheduleStep[] }) {
  return (
    <div className="relative">
      <Image
        src={assets.doodles.readingPathLoopBlack}
        alt=""
        width={488}
        height={64}
        className="pointer-events-none absolute top-3 left-[8%] hidden h-12 w-[84%] object-fill opacity-30 md:block"
      />
      <ol className="relative grid gap-5 md:grid-cols-4 md:gap-4">
        {steps.map((step, index) => (
          <TimelineStep key={step.id} step={step} index={index} />
        ))}
      </ol>
    </div>
  );
}
