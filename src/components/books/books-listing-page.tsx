import Image from "next/image";
import Link from "next/link";

import { BookCard } from "@/components/books/book-card";
import { BookShowcase } from "@/components/books/book-showcase";
import { Container } from "@/components/ui/container";
import { DecorativeAsset } from "@/components/ui/doodle-decoration";
import { SectionDivider } from "@/components/ui/section-divider";
import { NumberBadge } from "@/components/ui/number-badge";
import { MobileSwipeRail } from "@/components/ui/mobile-swipe-rail";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { EmptyState } from "@/components/ui/empty-state";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type { MockBook, MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type BooksFilter = "all" | "current" | "completed" | "focus" | "habits" | "purpose";

const filters: readonly { value: BooksFilter; label: string }[] = [
  { value: "all", label: "All books" },
  { value: "current", label: "Current cycle" },
  { value: "completed", label: "Completed" },
  { value: "focus", label: "Focus" },
  { value: "habits", label: "Habits" },
  { value: "purpose", label: "Purpose" },
];

const readingPath = [
  [
    "Choose with intention",
    "Begin with the question or season you are carrying.",
  ],
  [
    "Read at a steady rhythm",
    "Give the book enough time to become a conversation.",
  ],
  [
    "Reflect beyond the page",
    "Notice what challenges, confirms, or changes your thinking.",
  ],
  ["Bring your voice", "Discuss the idea and shape your own response to it."],
] as const;

function matchesFilter(book: MockBook, filter: BooksFilter) {
  if (filter === "all") return true;
  if (filter === "current") return book.status === "current";
  if (filter === "completed") return book.status === "completed-cycle";
  return book.themes.some((theme) => theme.toLowerCase() === filter);
}

export function BooksListingPage({
  books,
  currentBook,
  currentCycle,
  voices,
  activeFilter,
}: {
  books: readonly MockBook[];
  currentBook: MockBook;
  currentCycle: ReadingCycle;
  voices: readonly MockVoice[];
  activeFilter: BooksFilter;
}) {
  const visibleBooks = books.filter((book) =>
    matchesFilter(book, activeFilter),
  );
  const voiceCount = (book: MockBook) =>
    voices.filter((voice) => voice.relatedBookSlug === book.slug).length;

  return (
    <>
      <Section className="books-discovery-hero relative overflow-hidden pt-10 sm:pt-14">
        <Container>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              Books that move through the circle.
            </p>
            <h1 className="books-discovery-heading font-display mt-3 font-semibold tracking-[-0.045em] text-balance">
              Explore books that{" "}
              <span className="text-brand-orange-deep">inspire change.</span>
            </h1>
            <p className="text-ink/70 mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg">
              Discover the books behind our reading cycles, reflections, and
              conversations—then follow the idea that feels worth carrying.
            </p>
          </div>

          <BookShowcase books={books} currentBook={currentBook} cycleSlug={currentCycle.slug} />
        </Container>
      </Section>

      <SectionDivider variant="leaf" className="bg-cream/55" />

      <Section>
        <Container className="relative">
          <DecorativeAsset
            src={assets.doodles.underlineArrowOrange}
            width={226}
            height={74}
            className="absolute top-20 left-8 hidden w-36 opacity-65 lg:block"
          />
          <SectionHeader
            eyebrow="The reading shelf"
            title="Different books. Different doors into reflection."
            description="Browse by the kind of question you want to explore. The filters stay light so discovery still feels human."
          />
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter books">
            {filters.map((filter) => (
              <Link
                key={filter.value}
                href={
                  filter.value === "all"
                    ? "/books"
                    : `/books?filter=${filter.value}`
                }
                aria-current={
                  activeFilter === filter.value ? "page" : undefined
                }
                className={cn(
                  "focus-visible:outline-brand-orange inline-flex min-h-11 items-center rounded-full border px-4 text-xs font-extrabold tracking-[0.06em] uppercase focus-visible:outline-3 focus-visible:outline-offset-2",
                  activeFilter === filter.value
                    ? "border-brand-orange-deep bg-peach"
                    : "border-ink/20 bg-cream hover:border-ink",
                )}
              >
                {filter.label}
              </Link>
            ))}
          </nav>

          {visibleBooks.length > 0 ? (
            <>
              <MobileSwipeRail
                label="Swipe through The reading shelf"
                hint="Swipe shelf"
                className="mt-10"
              >
                {visibleBooks.map((book) => (
                  <BookCard
                    key={book.slug}
                    book={book}
                    relatedVoices={voiceCount(book)}
                  />
                ))}
              </MobileSwipeRail>

              <div className="mt-10 hidden gap-7 md:grid md:grid-cols-2 lg:grid-cols-3">
                {visibleBooks.map((book, index) => (
                  <BookCard
                    key={book.slug}
                    book={book}
                    relatedVoices={voiceCount(book)}
                    className={index === 1 ? "lg:translate-y-6" : undefined}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-10">
              <EmptyState
                title="No book matches this path yet."
                description="Return to the full shelf and follow another theme."
                actionLabel="Browse all books"
                actionHref="/books"
              />
            </div>
          )}
        </Container>
      </Section>

      <Section className="bg-peach/55 overflow-hidden">
        <Container className="relative">
          <DecorativeAsset
            src={assets.books.pageCurl}
            width={140}
            height={140}
            className="absolute bottom-0 left-0 hidden w-24 -rotate-6 opacity-45 lg:block"
          />
          <Image
            src={assets.books.readingPath}
            alt=""
            width={271}
            height={139}
            className="pointer-events-none absolute top-0 right-8 hidden w-52 opacity-60 lg:block"
          />
          <SectionHeader
            eyebrow="A book is a beginning"
            title="From choosing a book to finding your voice."
            description="The shelf connects back to the same reading-circle rhythm: read, reflect, discuss, and shape what the book changed."
          />
          <ol className="journey-line relative z-10 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {readingPath.map(([title, description], index) => (
              <li
                key={title}
                className="border-ink bg-cream rounded-[1.5rem] border-2 p-5 shadow-[3px_3px_0_#111]"
              >
                <NumberBadge
                  value={index + 1}
                  size="md"
                  shape={index % 2 === 0 ? "sticker" : "dashed"}
                  tilted={index % 2 === 1}
                />
                <h3 className="font-display mt-4 text-2xl font-semibold">
                  {title}
                </h3>
                <p className="text-ink/68 mt-3 text-sm leading-6">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="books"
        eyebrow="One book. Shared questions. Deeper reading."
        title="Ready to read with the circle?"
        action={{
          label: "Join Current Reading Cycle",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
