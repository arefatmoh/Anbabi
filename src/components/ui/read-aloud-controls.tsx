"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ReadAloudControlsProps = {
  title: string;
  text: string;
  className?: string;
};

type ReadState = "idle" | "playing" | "paused" | "unsupported";

export function ReadAloudControls({
  title,
  text,
  className,
}: ReadAloudControlsProps) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [state, setState] = useState<ReadState>("idle");

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function browserCanReadAloud() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function createUtterance() {
    const utterance = new SpeechSynthesisUtterance(`${title}. ${text}`);
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");
    utteranceRef.current = utterance;
    return utterance;
  }

  function play() {
    if (!browserCanReadAloud()) {
      setState("unsupported");
      return;
    }

    if (state === "unsupported") return;

    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      return;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(createUtterance());
    setState("playing");
  }

  function pause() {
    window.speechSynthesis.pause();
    setState("paused");
  }

  function stop() {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setState("idle");
  }

  const isPlaying = state === "playing";
  const isPaused = state === "paused";

  return (
    <div
      className={cn(
        "border-ink bg-paper paper-grain relative overflow-hidden rounded-[1.5rem] border-2 p-4 shadow-[3px_3px_0_#111]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "read-aloud-pulse bg-brand-orange/25 absolute -top-10 -right-8 size-24 rounded-full blur-xl",
          isPlaying && "is-reading",
        )}
      />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold tracking-[0.14em] uppercase">
            Listen to this voice
          </p>
          <p className="text-ink/65 mt-1 text-sm">
            {state === "unsupported"
              ? "Read aloud is not supported in this browser."
              : isPlaying
                ? "Reading now ? pause anytime."
                : isPaused
                  ? "Paused. Continue when you are ready."
                  : "Let the browser read the reflection aloud."}
          </p>
        </div>
        {state !== "unsupported" ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={play}
              className="border-ink bg-brand-orange focus-visible:outline-brand-orange inline-flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-extrabold shadow-[2px_2px_0_#111] focus-visible:outline-3 focus-visible:outline-offset-2"
            >
              {isPaused ? "Resume" : "Read aloud"}
            </button>
            {isPlaying ? (
              <button
                type="button"
                onClick={pause}
                className="border-ink bg-cream focus-visible:outline-brand-orange inline-flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-bold focus-visible:outline-3 focus-visible:outline-offset-2"
              >
                Pause
              </button>
            ) : null}
            {isPlaying || isPaused ? (
              <button
                type="button"
                onClick={stop}
                className="border-ink/25 bg-cream/80 focus-visible:outline-brand-orange inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold focus-visible:outline-3 focus-visible:outline-offset-2"
              >
                Stop
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
