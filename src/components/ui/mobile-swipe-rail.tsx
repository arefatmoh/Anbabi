"use client";

import { Children, type ReactNode, useRef, useState } from "react";
import Image from "next/image";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type MobileSwipeRailProps = {
  children: ReactNode;
  label: string;
  hint?: string;
  className?: string;
  itemClassName?: string;
};

export function MobileSwipeRail({
  children,
  label,
  hint = "Swipe sideways",
  className,
  itemClassName,
}: MobileSwipeRailProps) {
  const items = Children.toArray(children);
  const railRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const rail = railRef.current;
    const item = rail?.children[index] as HTMLElement | undefined;

    if (!item) return;

    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setActiveIndex(index);
  }

  function scrollNext() {
    scrollToIndex((activeIndex + 1) % items.length);
  }

  function updateActiveIndex() {
    const rail = railRef.current;

    if (!rail) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(rail.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const itemCenter = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(itemCenter - railCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }

  return (
    <div className={cn("md:hidden", className)}>
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={scrollNext}
          className="border-ink/15 bg-paper focus-visible:outline-brand-orange inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-xs font-extrabold tracking-[0.08em] uppercase shadow-[2px_2px_0_#111] focus-visible:outline-3 focus-visible:outline-offset-2"
          aria-label={`${hint}. Go to next card.`}
        >
          <span className="bg-brand-orange size-2 rounded-full" />
          {hint}
          <span
            aria-hidden="true"
            className="swipe-hint-arrow text-brand-orange-deep text-base leading-none"
          >
            &rarr;
          </span>
        </button>
        <div className="relative h-10 w-16 shrink-0" aria-hidden="true">
          <Image
            src={assets.doodles.arrowLoopOrange}
            alt=""
            fill
            sizes="4rem"
            className="object-contain opacity-75"
          />
        </div>
      </div>

      <div className="relative -mx-4 overflow-hidden pl-4">
        <div
          aria-hidden="true"
          className="from-paper pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r to-transparent"
        />
        <div
          aria-hidden="true"
          className="from-paper pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent"
        />
        <ul
          ref={railRef}
          aria-label={label}
          onScroll={updateActiveIndex}
          className="mobile-swipe-rail flex touch-pan-x snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 pr-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                "mobile-swipe-card flex w-[84vw] min-w-[84vw] max-w-[22rem] shrink-0 snap-center",
                index === 0 && "snap-start",
                itemClassName,
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToIndex(index)}
            className="focus-visible:outline-brand-orange rounded-full p-1 focus-visible:outline-3 focus-visible:outline-offset-2"
            aria-label={`Go to card ${index + 1} of ${items.length}`}
            aria-current={activeIndex === index ? "true" : undefined}
          >
            <span
              className={cn(
                "block h-2 rounded-full border border-ink/20 transition-all",
                activeIndex === index ? "bg-brand-orange w-6" : "bg-ink/20 w-2",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
