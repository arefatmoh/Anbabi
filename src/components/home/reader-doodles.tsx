import type { ReactNode } from "react";

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
  return (
    <div className="reader-doodles pointer-events-none relative mx-auto aspect-[1173/1050] w-full max-w-[36rem] select-none" aria-hidden="true">
      <DoodleLayer className="doodle-friend-left">
        <path d="M288 440C232 482 199 541 222 597c24 61 111 108 183 104 76-4 125-56 113-134-13-83-95-148-172-197" />
        <path d="m322 470 29 29c13 15-24 6-38 1m115 43c-17 1-45 5-46 12-2 7 18 13 35 19" />
        <path d="M281 572c-4 39 33 62 71 46" />
        <path d="M59 895c45-90 123-151 212-156 77-5 141 18 159 65 19 48-13 106-54 143" />
      </DoodleLayer>
      <DoodleLayer className="doodle-friend-right">
        <path d="M899 456c-72 5-138 60-156 124-17 63 19 118 88 139 67 20 141-2 174-55 32-52-1-111-30-150" />
        <circle cx="828" cy="581" r="15" fill="currentColor" stroke="none" />
        <circle cx="872" cy="574" r="15" fill="currentColor" stroke="none" />
        <path d="M857 645c26 23 61 15 80-17" />
        <path d="M688 780c-17 62 8 119 63 114 48-4 68-46 83-88 24-65 49-22 79 19 47 65 90 146 120 210" />
      </DoodleLayer>
      <DoodleLayer className="doodle-floating-book">
        <path d="M678 1049c54-28 99-60 139-96 22 32 39 62 60 96-56 17-99 44-138 82-20-27-40-55-61-82Z" fill="currentColor" stroke="none" />
        <g stroke="white" strokeWidth="5">
          <path d="m766 1024 27 42m-41-18-19 14m34 4-21 16m46-59 19-14m-8 31 20-14" />
        </g>
      </DoodleLayer>
      <DoodleLayer className="doodle-floating-confetti">
        <path d="M188 242c24-14 54-28 81-36 4-2 7 3 8 7l13 48c-33 9-60 27-86 57l-20-70c-1-3 1-5 4-6Z" fill="currentColor" stroke="none" />
        <circle cx="696" cy="372" r="28" fill="currentColor" stroke="none" />
        <path d="m1092 455 42 24-18 33-40-23 16-34Z" strokeWidth="9" />
        <path d="m144 1012 27 22 35-13-13 37 22 28-36-3-22 29-8-36-33-10 29-20-1-34Z" strokeWidth="14" />
      </DoodleLayer>
    </div>
  );
}
