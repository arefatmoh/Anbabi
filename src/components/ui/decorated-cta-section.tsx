import type { ReactNode } from "react";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DoodleDecoration } from "@/components/ui/doodle-decoration";
import type { DoodleAssetKey } from "@/components/ui/doodle-decoration";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type DecoratedCTAAction = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
};

type DecoratedCTASectionProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action: DecoratedCTAAction;
  secondaryAction?: DecoratedCTAAction;
  tone?: "orange" | "charcoal";
  accent?:
    | "home"
    | "cycle"
    | "books"
    | "voices"
    | "community"
    | "about"
    | "contact"
    | "policy";
  className?: string;
  children?: ReactNode;
};

const accentMap = {
  home: ["ctaBookSpark", "ctaCorner", "ctaSparkleSwish", "ctaPageSwish"],
  cycle: ["ctaLoopArrow", "ctaOpenBook", "ctaSparkleSwish", "ctaDashedArrow"],
  books: ["ctaOpenBook", "ctaCorner", "ctaSparkleAlt", "ctaPageSwish"],
  voices: ["voicesQuote", "ctaSparkleSwish", "ctaBookSpark", "voicesUnderline"],
  community: ["ctaLoopArrowAlt", "communityGroup", "communityHeart", "ctaSparkle"],
  about: ["ctaOpenBook", "ctaLoopArrow", "emphasisRays", "ctaPageSwish"],
  contact: ["contactStamp", "ctaBookSpark", "ctaLoopArrow", "contactTape"],
  policy: ["policyPaper", "ctaCorner", "ctaSparkle", "ctaPageSwish"],
} satisfies Record<string, readonly DoodleAssetKey[]>;

export function DecoratedCTASection({
  eyebrow,
  title,
  description,
  action,
  secondaryAction,
  tone = "orange",
  accent = "home",
  className,
  children,
}: DecoratedCTASectionProps) {
  const [primaryAccent, cornerAccent, sparkleAccent, edgeAccent] =
    accentMap[accent];
  const isCharcoal = tone === "charcoal";

  return (
    <Section
      className={cn(
        "relative overflow-hidden",
        isCharcoal ? "bg-charcoal text-cream" : "bg-brand-orange text-ink",
        className,
      )}
    >
      <DoodleDecoration
        asset={primaryAccent}
        width={260}
        height={210}
        mobileHidden
        className={cn(
          "absolute -top-10 right-[7%] hidden w-36 rotate-6 opacity-55 lg:block",
          isCharcoal && "brightness-0 invert",
        )}
      />
      <DoodleDecoration
        asset={cornerAccent}
        width={260}
        height={210}
        mobileHidden
        className={cn(
          "absolute bottom-4 left-5 hidden w-32 -rotate-6 opacity-35 lg:block",
          isCharcoal && "brightness-0 invert",
        )}
      />
      <DoodleDecoration
        asset={sparkleAccent}
        width={220}
        height={120}
        mobileHidden
        className={cn(
          "absolute top-1/2 right-1/3 hidden w-28 -translate-y-1/2 opacity-30 xl:block",
          isCharcoal && "brightness-0 invert",
        )}
      />
      <DoodleDecoration
        asset={edgeAccent}
        width={360}
        height={180}
        mobileHidden
        className={cn(
          "absolute right-0 -bottom-10 hidden w-56 translate-x-10 rotate-[-5deg] opacity-25 xl:block",
          isCharcoal && "brightness-0 invert",
        )}
      />
      <Container className="relative z-10 grid items-center gap-7 lg:grid-cols-[1fr_auto]">
        <div>
          <p
            className={cn(
              "font-note text-2xl font-bold",
              isCharcoal ? "text-brand-orange" : "text-ink/70",
            )}
          >
            {eyebrow}
          </p>
          <h2 className="font-display mt-3 max-w-4xl text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "mt-5 max-w-2xl leading-8",
                isCharcoal ? "text-cream/72" : "text-ink/72",
              )}
            >
              {description}
            </p>
          ) : null}
          {children}
        </div>
        <div className="relative flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <DoodleDecoration
            asset="ctaDashedArrow"
            width={180}
            height={92}
            className={cn(
              "absolute -top-14 -left-14 hidden w-24 -rotate-12 opacity-45 xl:block",
              isCharcoal && "brightness-0 invert",
            )}
          />
          <LinkButton
            href={action.href}
            external={action.external}
            variant={action.variant ?? "inverse"}
            size="lg"
          >
            {action.label} <ArrowIcon />
          </LinkButton>
          {secondaryAction ? (
            <LinkButton
              href={secondaryAction.href}
              external={secondaryAction.external}
              variant={
                secondaryAction.variant ?? (isCharcoal ? "ghost" : "secondary")
              }
              size="lg"
              className={cn(isCharcoal && "text-cream decoration-brand-orange")}
            >
              {secondaryAction.label}
            </LinkButton>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
