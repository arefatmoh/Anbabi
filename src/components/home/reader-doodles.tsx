"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function DoodleLayer({ children, className }: { children: ReactNode; className: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg viewBox="0 150 1173 1050" fill="none" style={{ color: "#ff5b0b" }} className="h-full w-full overflow-visible">
        <g stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
          {children}
        </g>
      </svg>
    </div>
  );
}

export function ReaderDoodles() {
  const [greeting, setGreeting] = useState(false);
  const greetingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
  }, []);

  function greet() {
    if (greeting) return;
    setGreeting(true);
    greetingTimer.current = setTimeout(() => setGreeting(false), 1800);
  }

  return (
    <div className="reader-doodles relative mx-auto aspect-[1173/1050] w-full max-w-[36rem] select-none" data-greeting={greeting}>
      <div className="doodle-scene absolute inset-0 pointer-events-none" aria-hidden="true">
      <DoodleLayer className="doodle-friend-left">
        <g className="doodle-left-head">
        <path className="doodle-ink-draw" pathLength="1" d="M288 440C232 482 199 541 222 597c24 61 111 108 183 104 76-4 125-56 113-134-13-83-95-148-172-197" />
        <g className="doodle-left-face">
        <g className="doodle-left-eyes">
        <path d="m322 470 29 29c13 15-24 6-38 1m115 43c-17 1-45 5-46 12-2 7 18 13 35 19" />
        </g>
        <path className="doodle-smile doodle-left-smile" d="M281 572c-4 39 33 62 71 46" />
        </g>
        </g>
        <path className="doodle-ink-draw doodle-body-draw" pathLength="1" d="M59 895c45-90 123-151 212-156 77-5 141 18 159 65 19 48-13 106-54 143" />
      </DoodleLayer>
      <DoodleLayer className="doodle-friend-right">
        <g className="doodle-right-head">
        <path className="doodle-ink-draw doodle-right-draw" pathLength="1" d="M899 456c-72 5-138 60-156 124-17 63 19 118 88 139 67 20 141-2 174-55 32-52-1-111-30-150" />
        <g className="doodle-right-face">
        <g className="doodle-eye doodle-eye-first"><circle cx="828" cy="581" r="15" fill="currentColor" stroke="none" /></g>
        <g className="doodle-eye doodle-eye-second"><circle cx="872" cy="574" r="15" fill="currentColor" stroke="none" /></g>
        <path className="doodle-smile" d="M857 645c26 23 61 15 80-17" />
        </g>
        </g>
        <path className="doodle-ink-draw doodle-body-draw" pathLength="1" d="M688 780c-17 62 8 119 63 114 48-4 68-46 83-88 24-65 49-22 79 19 47 65 90 146 120 210" />
      </DoodleLayer>
      <DoodleLayer className="doodle-floating-book">
        <g className="doodle-book-open">
        <path d="M678 1049c54-28 99-60 139-96 22 32 39 62 60 96-56 17-99 44-138 82-20-27-40-55-61-82Z" fill="currentColor" stroke="none" />
        <g stroke="white" strokeWidth="5">
          <path d="m766 1024 27 42m-41-18-19 14m34 4-21 16m46-59 19-14m-8 31 20-14" />
        </g>
        <path className="doodle-turning-page" d="m766 1024 38-29 29 45-40 26Z" fill="#fffdf9" fillOpacity="0.8" stroke="white" strokeWidth="4" />
        </g>
      </DoodleLayer>
      <DoodleLayer className="doodle-floating-confetti">
        <path d="M188 242c24-14 54-28 81-36 4-2 7 3 8 7l13 48c-33 9-60 27-86 57l-20-70c-1-3 1-5 4-6Z" fill="currentColor" stroke="none" />
        <circle cx="696" cy="372" r="28" fill="currentColor" stroke="none" />
        <path d="m1092 455 42 24-18 33-40-23 16-34Z" strokeWidth="9" />
        <path className="doodle-star" d="m144 1012 27 22 35-13-13 37 22 28-36-3-22 29-8-36-33-10 29-20-1-34Z" strokeWidth="14" />
        <g className="doodle-book-sparks" strokeWidth="9">
          <path d="m917 953 17-19m-7 51 27-3m-79-72 2-24" />
        </g>
      </DoodleLayer>
      </div>
      <button type="button" className="doodle-greet-button absolute inset-0 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange" aria-label="Say hello to the reading friends" onPointerEnter={greet} onFocus={greet} onClick={greet} />
    </div>
  );
}
