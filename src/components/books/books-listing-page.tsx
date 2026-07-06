import Image from "next/image";
import Link from "next/link";

import { BookCard } from "@/components/books/book-card";
import { BookCoverPlaceholder } from "@/components/cycle/book-cover-placeholder";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { DecorativeAsset } from "@/components/ui/doodle-decoration";
import { SectionDivider } from "@/components/ui/section-divider";
import { NumberBadge } from "@/components/ui/number-badge";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { EmptyState } from "@/components/ui/empty-state";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type { MockBook, MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export type BooksFilter = "all" | "current" | "focus" | "habits" | "purpose";

const filters: readonly { value: BooksFilter; label: string }[] = [
  { value: "all", label: "All books" },
  { value: "current", label: "Current cycle" },
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
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="relative z-10">
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              Books that move through the circle.
            </p>
            <h1 className="font-display mt-3 text-[clamp(3.6rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
              Explore books that{" "}
              <span className="text-brand-orange-deep">inspire change.</span>
            </h1>
            <p className="text-ink/70 mt-6 max-w-2xl text-lg leading-8">
              Discover the books behind our reading cycles, reflections, and
              conversations—then follow the idea that feels worth carrying.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <DecorativeAsset
              src={assets.books.arrowPair}
              width={210}
              height={118}
              className="absolute top-5 -left-10 hidden w-28 -rotate-12 opacity-65 md:block"
            />
            <Image
              src={assets.illustrations.bookStackGrowth}
              alt="A growing plant rising from a stack of books"
              width={1024}
              height={912}
              className="w-full"
              loading="eager"
              priority
            />
            <Image
              src={assets.books.sparks}
              alt=""
              width={178}
              height={88}
              className="pointer-events-none absolute top-8 -right-5 hidden w-24 sm:block"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-cream py-10 sm:py-14">
        <Container>
          <PaperPanel
            surface="paper"
            className="paper-grain relative overflow-hidden p-6 sm:p-9 lg:p-11"
          >
            <Image
              src={assets.books.bookmarkOrange}
              alt=""
              width={89}
              height={136}
              className="pointer-events-none absolute top-0 right-8 hidden w-14 sm:block"
            />
            <DecorativeAsset
              src={assets.stickers.tapeOrange}
              width={116}
              height={52}
              className="absolute top-6 left-8 hidden w-20 -rotate-6 opacity-80 sm:block"
            />
            <div className="grid items-center gap-9 lg:grid-cols-[0.55fr_1.45fr]">
              <BookCoverPlaceholder book={currentBook} className="max-w-56" />
              <div>
                <div className="flex flex-wrap gap-2">
                  <Chip tone="success">{currentBook.statusLabel}</Chip>
                  {currentBook.themes.map((theme) => (
                    <Chip key={theme}>{theme}</Chip>
                  ))}
                </div>
                <p className="font-note text-brand-orange-deep mt-5 text-2xl">
                  The book in the circle now
                </p>
                <h2 className="font-display mt-2 text-5xl leading-none font-semibold tracking-tight sm:text-6xl">
                  {currentBook.title}
                </h2>
                <p className="text-ink/60 mt-2">by {currentBook.author}</p>
                <p className="text-ink/72 mt-5 max-w-3xl leading-8">
                  {currentBook.description}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href={`/cycles/${currentCycle.slug}`} size="lg">
                    View Current Cycle <ArrowIcon />
                  </LinkButton>
                  <LinkButton
                    href={`/books/${currentBook.slug}`}
                    variant="secondary"
                    size="lg"
                  >
                    Explore This Book
                  </LinkButton>
                </div>
              </div>
            </div>
          </PaperPanel>
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
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {visibleBooks.map((book, index) => (
                <BookCard
                  key={book.slug}
                  book={book}
                  relatedVoices={voiceCount(book)}
                  className={index === 1 ? "lg:translate-y-6" : undefined}
                />
              ))}
            </div>
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
