"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type ReactionType = "like" | "love";

type ReactionState = {
  selected?: ReactionType;
  likes: number;
  loves: number;
};

type ReactionBarProps = {
  contentId: string;
  label?: string;
  compact?: boolean;
  className?: string;
};

function seededCount(seed: string, offset: number) {
  let hash = offset;

  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) % 997;
  }

  return 12 + (hash % 38);
}

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
  const initialState = useMemo<ReactionState>(
    () => ({
      likes: seededCount(contentId, 17),
      loves: seededCount(contentId, 43),
    }),
    [contentId],
  );
  const [state, setState] = useState<ReactionState>(initialState);
  const [burst, setBurst] = useState<ReactionType | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const stored = window.localStorage.getItem(storageKey);

      if (!stored) return;

      try {
        const parsed = JSON.parse(stored) as ReactionState;
        setState({ ...initialState, ...parsed });
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [initialState, storageKey]);

  function react(type: ReactionType) {
    setState((current) => {
      const wasSelected = current.selected === type;
      const nextSelected = wasSelected ? undefined : type;
      let likes = current.likes;
      let loves = current.loves;

      if (current.selected === "like") likes -= 1;
      if (current.selected === "love") loves -= 1;
      if (nextSelected === "like") likes += 1;
      if (nextSelected === "love") loves += 1;

      const next = { selected: nextSelected, likes, loves };
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });

    setBurst(type);
    window.setTimeout(() => setBurst(null), 620);
  }

  const reactions = [
    { type: "like" as const, label: "Like", Icon: LikeIcon, count: state.likes },
    { type: "love" as const, label: "Love", Icon: LoveIcon, count: state.loves },
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
          const active = state.selected === reaction.type;
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
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs tabular-nums",
                  active ? "bg-cream/70" : "bg-ink/8",
                )}
              >
                {reaction.count}
              </span>
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
