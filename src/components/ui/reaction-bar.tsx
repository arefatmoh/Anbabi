"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ReactionType = "like" | "love";

type ReactionBarProps = {
  contentId: string;
  label?: string;
  compact?: boolean;
  className?: string;
};

function LikeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M7.5 10.5v9M7.5 10.5l4.2-6.2c.8-1.1 2.6-.5 2.5.9l-.3 4.1h4.1c1.7 0 2.9 1.6 2.4 3.2l-1.4 4.7a3 3 0 0 1-2.9 2.1H5.4a2.1 2.1 0 0 1-2.1-2.1v-4.6c0-1.2.9-2.1 2.1-2.1h2.1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoveIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M12 20.2S4.6 15.8 3.1 10.4C2.1 6.8 4.4 4 7.6 4c1.9 0 3.3 1 4.4 2.4C13.1 5 14.5 4 16.4 4c3.2 0 5.5 2.8 4.5 6.4C19.4 15.8 12 20.2 12 20.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReactionBar({
  contentId,
  label = "React to this voice",
  compact = false,
  className,
}: ReactionBarProps) {
  const storageKey = `read-revive:reaction:${contentId}`;
  const [selection, setSelection] = useState<{ key: string; type?: ReactionType }>();
  const selected = selection?.key === storageKey ? selection.type : undefined;
  const [burst, setBurst] = useState<ReactionType | null>(null);
  const burstTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (!stored) return;
        const type: unknown = JSON.parse(stored)?.selected;
        if (type === "like" || type === "love") {
          setSelection({ key: storageKey, type });
        }
      } catch {
        // A blocked or invalid local store should not disable reactions.
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [storageKey]);

  useEffect(() => () => window.clearTimeout(burstTimer.current), []);

  function react(type: ReactionType) {
    const next = selected === type ? undefined : type;
    setSelection({ key: storageKey, type: next });
    try {
      if (next) window.localStorage.setItem(storageKey, JSON.stringify({ selected: next }));
      else window.localStorage.removeItem(storageKey);
    } catch {
      // Keep the current session interactive when local storage is unavailable.
    }

    setBurst(type);
    window.clearTimeout(burstTimer.current);
    burstTimer.current = window.setTimeout(() => setBurst(null), 620);
  }

  const reactions = [
    { type: "like" as const, label: "Like", Icon: LikeIcon },
    { type: "love" as const, label: "Love", Icon: LoveIcon },
  ];

  return (
    <div
      className={cn(
        "relative",
        compact ? "mt-auto pt-5" : "border-ink/15 border-t pt-7",
        className,
      )}
      aria-label={label}
    >
      {!compact ? (
        <p className="font-note text-brand-orange-deep mb-3 text-2xl">
          Leave a small spark
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        {reactions.map((reaction) => {
          const active = selected === reaction.type;
          const Icon = reaction.Icon;

          return (
            <button
              key={reaction.type}
              type="button"
              onClick={() => react(reaction.type)}
              aria-label={`${reaction.label} this voice`}
              aria-pressed={active}
              className={cn(
                "reaction-button border-ink focus-visible:outline-brand-orange relative inline-flex min-h-11 items-center gap-2 rounded-full border-2 font-extrabold transition focus-visible:outline-3 focus-visible:outline-offset-2",
                compact ? "px-3" : "px-4",
                active
                  ? "bg-brand-orange text-ink shadow-[3px_3px_0_#111]"
                  : "bg-cream text-ink hover:bg-peach shadow-[2px_2px_0_#111]",
                burst === reaction.type && "is-bursting",
              )}
            >
              <Icon className="size-5" />
              {burst === reaction.type ? (
                <span className="reaction-confetti" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
