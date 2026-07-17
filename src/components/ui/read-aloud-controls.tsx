"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ReadAloudControlsProps = {
  title: string;
  text: string;
  className?: string;
};

type ReadState = "idle" | "playing" | "paused" | "unsupported";

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M4 10v4h4l5 4V6l-5 4H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 9.2a4 4 0 0 1 0 5.6M18.7 6.5a7.8 7.8 0 0 1 0 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M7 7h10v10H7z" fill="currentColor" />
    </svg>
  );
}

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
  const hasStarted = isPlaying || isPaused;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={isPlaying ? pause : play}
        aria-label={isPlaying ? "Pause read aloud" : isPaused ? "Resume read aloud" : "Read this voice aloud"}
        aria-pressed={isPlaying}
        className={cn(
          "border-ink focus-visible:outline-brand-orange inline-flex size-12 items-center justify-center rounded-full border-2 shadow-[3px_3px_0_#111] transition focus-visible:outline-3 focus-visible:outline-offset-2",
          isPlaying ? "read-aloud-button is-reading bg-brand-orange text-ink" : "bg-cream text-ink hover:bg-peach",
        )}
      >
        {isPaused ? <PlayIcon className="size-5" /> : isPlaying ? <PauseIcon className="size-5" /> : <SpeakerIcon className="size-6" />}
      </button>

      {hasStarted ? (
        <div className="animate-controls-in flex items-center gap-2">
          {isPlaying ? (
            <button
              type="button"
              onClick={pause}
              aria-label="Pause read aloud"
              className="border-ink bg-cream focus-visible:outline-brand-orange inline-flex size-11 items-center justify-center rounded-full border-2 shadow-[2px_2px_0_#111] focus-visible:outline-3 focus-visible:outline-offset-2"
            >
              <PauseIcon className="size-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={play}
              aria-label="Resume read aloud"
              className="border-ink bg-brand-orange focus-visible:outline-brand-orange inline-flex size-11 items-center justify-center rounded-full border-2 shadow-[2px_2px_0_#111] focus-visible:outline-3 focus-visible:outline-offset-2"
            >
              <PlayIcon className="size-5" />
            </button>
          )}
          <button
            type="button"
            onClick={stop}
            aria-label="Stop read aloud"
            className="border-ink/30 bg-cream/85 focus-visible:outline-brand-orange inline-flex size-11 items-center justify-center rounded-full border-2 text-ink/80 focus-visible:outline-3 focus-visible:outline-offset-2"
          >
            <StopIcon className="size-5" />
          </button>
        </div>
      ) : null}

      {state === "unsupported" ? (
        <span className="text-ink/60 text-xs font-semibold">
          Audio not supported
        </span>
      ) : null}
    </div>
  );
}
