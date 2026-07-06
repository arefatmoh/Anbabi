import Image from "next/image";

import { assets } from "@/lib/assets";
import type { MockBook } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const coverStyles = {
  charcoal: {
    shell: "bg-charcoal text-cream",
    accent: "bg-brand-orange",
    label: "text-brand-orange",
    rule: "bg-cream/20",
    author: "text-cream/70",
    icon: "brightness-0 invert",
  },
  orange: {
    shell: "bg-brand-orange text-ink",
    accent: "bg-charcoal",
    label: "text-ink/70",
    rule: "bg-ink/20",
    author: "text-ink/65",
    icon: "brightness-0",
  },
  paper: {
    shell: "bg-cream text-ink",
    accent: "bg-brand-orange",
    label: "text-brand-orange-deep",
    rule: "bg-ink/15",
    author: "text-ink/65",
    icon: "brightness-0",
  },
} as const;

export function BookCoverPlaceholder({
  book,
  className,
}: {
  book: MockBook;
  className?: string;
}) {
  const styles = coverStyles[book.coverTone];

  return (
    <div
      className={cn("relative mx-auto aspect-[2/3] w-full max-w-64", className)}
    >
      <div
        className={cn(
          "border-ink shadow-paper absolute inset-0 overflow-hidden rounded-l-md rounded-r-2xl border-2 p-6",
          styles.shell,
        )}
      >
        <div
          aria-hidden="true"
          className={cn("absolute top-0 right-0 h-full w-2", styles.accent)}
        />
        <p
          className={cn(
            "text-xs font-extrabold tracking-[0.16em] uppercase",
            styles.label,
          )}
        >
          {book.coverLabel}
        </p>
        <p className="font-display mt-8 text-3xl leading-[1.05] font-semibold text-balance">
          {book.title}
        </p>
        <div className={cn("my-5 h-px", styles.rule)} />
        <p className={cn("text-sm leading-6", styles.author)}>{book.author}</p>
        <Image
          src={assets.icons.notebook}
          alt=""
          width={180}
          height={180}
          className={cn(
            "pointer-events-none absolute right-5 bottom-5 w-20 opacity-75",
            styles.icon,
          )}
        />
      </div>
      <div
        aria-hidden="true"
        className="border-ink/30 absolute top-2 bottom-2 left-2 w-px border-l"
      />
    </div>
  );
}
