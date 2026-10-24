type ValueKind = "reading" | "sharing" | "connecting";

function ValueDoodle({ kind }: { kind: ValueKind }) {
  return (
    <svg
      viewBox="0 0 100 78"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none mx-auto h-16 w-20"
      style={{ color: "#ff5b0b" }}
    >
      {kind === "reading" ? (
        <>
          <path d="M10 14c14 0 27 5 40 11 13-7 27-11 40-12l-2 49c-13-1-26 2-38 8-13-7-26-10-39-10l-1-46Z" fill="currentColor" />
          <g stroke="white" strokeWidth="3" strokeLinecap="round">
            <path d="m50 26-1 34M21 27l13 3m-12 9 13 3m-12 9 12 3m29-25 14-3m-14 15 13-3m-13 15 12-3" />
          </g>
        </>
      ) : kind === "sharing" ? (
        <>
          <path d="M14 13c17-3 34-4 49-3l-1 31-23 2-19 13 2-15-9-1 1-27Z" fill="currentColor" />
          <path d="m53 49 26 3 5 20-13-8-19-3 1-12Z" fill="currentColor" />
        </>
      ) : (
        <g stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 9c18 4 28 17 25 30-3 12-17 17-29 11C8 44 7 28 14 19m8 10h.2m13 4h.2M19 36c4 7 10 9 15 4" />
          <path d="M68 34c13 5 22 16 17 27-4 11-17 15-28 8-11-6-12-17-6-26m10 7h.2m12 4h.2M59 58c3 7 9 8 14 4" />
        </g>
      )}
    </svg>
  );
}

const values: readonly { kind: ValueKind; description: string }[] = [
  {
    kind: "reading",
    description: "Read to discover yourself, challenge your thinking, and open new worlds.",
  },
  {
    kind: "sharing",
    description: "Bring your questions and ideas into conversations that help everyone grow.",
  },
  {
    kind: "connecting",
    description: "Find your circle through books, shared curiosity, and a love of learning.",
  },
];

export function ReadingValues() {
  return (
    <ul className="reading-values grid gap-9 rounded-[1.5rem] px-6 py-9 md:grid-cols-3 md:gap-10 md:px-8 md:py-10" aria-label="Reading, sharing, and connecting">
      {values.map(({ kind, description }) => (
        <li key={kind} className="text-center">
          <ValueDoodle kind={kind} />
          <h2 className="font-display mt-3 text-2xl font-semibold lg:text-3xl">{kind}</h2>
          <p className="text-ink/75 mx-auto mt-3 max-w-xs text-sm leading-7 lg:text-base">
            {description}
          </p>
        </li>
      ))}
    </ul>
  );
}
