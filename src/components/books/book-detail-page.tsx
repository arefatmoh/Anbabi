import Image from "next/image";
import Link from "next/link";

import { BookCard } from "@/components/books/book-card";
import { BookCoverPlaceholder } from "@/components/cycle/book-cover-placeholder";
import { VoiceCard } from "@/components/voices/voice-card";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { DecorativeAsset, DoodleDecoration } from "@/components/ui/doodle-decoration";
import { SectionDivider } from "@/components/ui/section-divider";
import { NumberBadge } from "@/components/ui/number-badge";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type { MockBook, MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

export function BookDetailPage({
  book,
  relatedCycle,
  relatedVoices,
  recommendations,
  currentCycle,
}: {
  book: MockBook;
  relatedCycle: ReadingCycle | null;
  relatedVoices: readonly MockVoice[];
  recommendations: readonly MockBook[];
  currentCycle: ReadingCycle;
}) {
  return (
    <>
      <Section className="relative overflow-hidden pt-8 sm:pt-12">
        <Container>
          <Link
            href="/books"
            className="text-brand-orange-deep focus-visible:outline-brand-orange inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-4 focus-visible:rounded focus-visible:outline-3"
          >
            ← Back to Books
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="relative order-2 mx-auto w-full max-w-sm lg:order-1">
              <BookCoverPlaceholder book={book} className="max-w-80" />
              <Image
                src={assets.books.readingRays}
                alt=""
                width={126}
                height={75}
                className="pointer-events-none absolute -top-5 -right-6 hidden w-20 sm:block"
              />
              <div className="pointer-events-none absolute right-0 -bottom-5 hidden size-24 rotate-6 items-center justify-center sm:flex">
                <Image
                  src={assets.books.starburst}
                  alt=""
                  width={139}
                  height={117}
                  className="absolute inset-0 size-full"
                />
                <span className="font-note relative z-10 max-w-16 text-center text-sm leading-4 font-bold">
                  Open a thought
                </span>
              </div>
            </div>

            <header className="order-1 lg:order-2">
              <div className="flex flex-wrap gap-2">
                <Chip tone={book.status === "current" ? "success" : "orange"}>
                  {book.statusLabel}
                </Chip>
                <Chip>{book.category}</Chip>
                <Chip>{book.language}</Chip>
              </div>
              <h1 className="font-display mt-5 text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
                {book.title}
              </h1>
              <p className="text-ink/65 mt-4 text-lg">by {book.author}</p>
              <p className="text-ink/75 mt-6 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
                {book.longDescription}
              </p>
              <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
                <DoodleDecoration
                  asset="arrowCurveAlt"
                  width={170}
                  height={110}
                  className="absolute -right-2 -bottom-12 hidden w-24 rotate-12 opacity-55 lg:block"
                />
                {relatedCycle ? (
                  <>
                    <LinkButton
                      href={siteConfig.telegramUrl}
                      external
                      size="lg"
                    >
                      Join Current Reading Cycle <ArrowIcon />
                    </LinkButton>
                    <LinkButton
                      href={`/cycles/${relatedCycle.slug}`}
                      variant="secondary"
                      size="lg"
                    >
                      View the Reading Plan
                    </LinkButton>
                  </>
                ) : (
                  <LinkButton href={`/cycles/${currentCycle.slug}`} size="lg">
                    Explore Current Cycle <ArrowIcon />
                  </LinkButton>
                )}
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {book.themes.map((theme) => (
                  <Chip key={theme}>{theme}</Chip>
                ))}
              </div>
              <p className="text-ink/55 mt-5 text-sm">
                {book.readingTime}
              </p>{" "}
            </header>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-brand-orange-deep text-xs font-extrabold tracking-[0.14em] uppercase">
                Why it belongs on the shelf
              </p>
              <h2 className="font-display mt-3 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                A book becomes more useful when its ideas meet other minds.
              </h2>
              <p className="text-ink/75 mt-6 max-w-3xl text-lg leading-9">
                {book.whyFeatured}
              </p>
            </div>
            <div className="relative order-2 mx-auto w-full max-w-sm lg:order-1">
              <Image
                src={assets.books.pageTurn}
                alt="An open book with a page turning"
                width={246}
                height={203}
                className="mx-auto w-full"
              />
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider variant="openBook" className="bg-cream/45" />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Themes to carry"
            title="Three paths into the book."
            description="Use these themes as starting points, not final answers. Each one can open a different conversation."
          />
          <ol className="journey-line relative z-10 mt-12 grid gap-6 md:grid-cols-3">
            {book.themes.map((theme, index) => (
              <li
                key={theme}
                className="border-ink bg-cream rounded-[1.75rem] border-2 p-6 shadow-[4px_4px_0_#111]"
              >
                <NumberBadge
                  value={index + 1}
                  shape={index % 2 === 0 ? "sticker" : "dashed"}
                  tilted={index % 2 === 1}
                />
                <h3 className="font-display mt-5 text-3xl font-semibold">
                  {theme}
                </h3>
                <p className="text-ink/68 mt-3 leading-7">
                  Follow where this idea appears, changes, and meets your own
                  experience.
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-peach/55">
        <Container className="grid gap-8 lg:grid-cols-2">
          <PaperPanel
            surface="cream"
            className="relative overflow-hidden p-7 sm:p-9"
          >
            <Image
              src={assets.books.bookshelfPlant}
              alt=""
              width={240}
              height={120}
              className="pointer-events-none absolute top-5 right-5 hidden w-28 opacity-55 sm:block"
            />
            <p className="font-note text-brand-orange-deep text-2xl">
              Who may enjoy this book?
            </p>
            <ul className="mt-7 space-y-4">
              {book.readerFit.map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span
                    aria-hidden="true"
                    className="bg-brand-orange mt-2 size-2 shrink-0 rounded-full"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PaperPanel>

          <PaperPanel
            surface="paper"
            className="relative overflow-hidden p-7 sm:p-9"
          >
            <DecorativeAsset
              src={assets.books.tagScribble}
              width={160}
              height={80}
              className="absolute top-5 left-6 hidden w-24 -rotate-6 opacity-55 sm:block"
            />
            <Image
              src={assets.books.pageCurl}
              alt=""
              width={120}
              height={120}
              className="pointer-events-none absolute top-0 right-0 hidden w-20 opacity-60 sm:block"
            />
            <p className="font-note text-brand-orange-deep relative z-10 text-2xl">
              Questions before you begin
            </p>
            <ol className="mt-7 space-y-5">
              {book.discussionPrompts.map((prompt, index) => (
                <li
                  key={prompt}
                  className="border-ink/15 flex gap-4 border-b pb-5 last:border-0 last:pb-0"
                >
                  <NumberBadge
                    value={index + 1}
                    size="sm"
                    shape={index % 2 === 0 ? "double" : "circle"}
                  />
                  <p className="text-ink/75 leading-7">{prompt}</p>
                </li>
              ))}
            </ol>
          </PaperPanel>
        </Container>
      </Section>

      {relatedVoices.length > 0 ? (
        <Section>
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                eyebrow="Voices from this book"
                title="What the circle kept thinking about."
                description="Reflections that began with the same pages and travelled in different directions."
              />
              <LinkButton href="/voices" variant="ghost">
                View all voices <ArrowIcon />
              </LinkButton>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {relatedVoices.slice(0, 3).map((voice) => (
                <VoiceCard key={voice.slug} voice={voice} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Keep exploring"
            title="Other books, other questions."
            description="Move across focus, habit, fiction, and purpose without losing the thread back to reflection."
          />
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {recommendations.slice(0, 2).map((item) => (
              <BookCard key={item.slug} book={item} />
            ))}
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="books"
        eyebrow="Read. Reflect. Bring a question."
        title="The current reading circle is the next place to begin."
        action={{
          label: "Join Current Reading Cycle",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
