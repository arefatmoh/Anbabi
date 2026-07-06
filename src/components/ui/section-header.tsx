import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-brand-orange-deep mb-3 text-xs font-extrabold tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="text-ink/70 mt-5 text-base leading-8 sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
