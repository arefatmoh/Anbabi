"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowIcon, LinkButton } from "@/components/ui/button";

export function MobileJoinBar({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);
  const hasSeenPrimaryAction = useRef(false);

  useEffect(() => {
    const target = document.getElementById("cycle-primary-cta");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasSeenPrimaryAction.current = true;
          setVisible(false);
          return;
        }

        if (hasSeenPrimaryAction.current) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="border-ink bg-paper/95 fixed right-0 bottom-0 left-0 z-40 border-t p-3 backdrop-blur-md md:hidden">
      <LinkButton href={href} external className="w-full">
        Join Current Reading Cycle <ArrowIcon />
      </LinkButton>
    </div>
  );
}
