import Image from "next/image";

import { Chip } from "@/components/ui/chip";
import { NumberBadge } from "@/components/ui/number-badge";
import { PaperPanel } from "@/components/ui/paper-panel";
import { assets } from "@/lib/assets";

const markers = ["Read", "Reflect", "Discuss", "Write"] as const;

export function ProgressPreview() {
  return (
    <PaperPanel
      surface="charcoal"
      className="relative overflow-hidden p-6 sm:p-8"
    >
      <div className="grid items-center gap-7 sm:grid-cols-[auto_1fr]">
        <Image
          src={assets.gamification.readingBadge}
          alt="Reading badge artwork"
          width={266}
          height={276}
          className="mx-auto w-32 sm:w-40"
        />
        <div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="orange">Reading momentum</Chip>
            <Chip tone="dark">Reflection-led</Chip>
          </div>
          <h3 className="font-display mt-5 text-3xl font-semibold sm:text-4xl">
            Progress should encourage, not pressure.
          </h3>
          <p className="text-cream/70 mt-4 max-w-2xl text-sm leading-7 sm:text-base">
            The cycle makes consistency visible through a simple rhythm: show up
            for the reading, pause to reflect, contribute thoughtfully, and
            carry one useful idea forward.
          </p>
          <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {markers.map((marker, index) => (
              <li
                key={marker}
                className="border-cream/20 bg-cream/5 rounded-2xl border p-3 text-center"
              >
                <NumberBadge
                  value={index + 1}
                  size="sm"
                  shape={index % 2 === 0 ? "circle" : "dashed"}
                  className="mx-auto"
                />
                <span className="mt-2 block text-xs font-bold">{marker}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PaperPanel>
  );
}
