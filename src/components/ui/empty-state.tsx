import Image from "next/image";

import { assets } from "@/lib/assets";

import { LinkButton } from "./button";
import { PaperPanel } from "./paper-panel";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel = "Return home",
  actionHref = "/",
}: EmptyStateProps) {
  return (
    <PaperPanel className="mx-auto grid max-w-4xl items-center gap-8 p-7 sm:p-10 md:grid-cols-[0.8fr_1.2fr]">
      <Image
        src={assets.illustrations.emptyStateReading}
        alt=""
        width={1032}
        height={631}
        className="mx-auto w-full max-w-72"
      />
      <div>
        <p className="font-note text-brand-orange-deep text-2xl">
          Still turning the page
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-ink/70 mt-4 leading-7">{description}</p>
        <LinkButton href={actionHref} className="mt-6">
          {actionLabel}
        </LinkButton>
      </div>
    </PaperPanel>
  );
}
