import Image from "next/image";
import Link from "next/link";

import { BookCoverPlaceholder } from "@/components/cycle/book-cover-placeholder";
import { VoiceCard } from "@/components/voices/voice-card";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { DecorativeAsset, DoodleDecoration } from "@/components/ui/doodle-decoration";
import { SectionDivider } from "@/components/ui/section-divider";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { assets } from "@/lib/assets";
import type { MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

const coverAssets = {
  voices: assets.illustrations.voicesFromCircle,
  notebook: assets.illustrations.writingReflection,
  reader: assets.illustrations.singleReader,
} as const;

function ShareActions({ article }: { article: MockVoice }) {
  const url = `${siteConfig.siteUrl}/voices/${article.slug}`;
  const telegram = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`;
  const email = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`;

  return (
    <div
      className="flex flex-wrap items-center gap-3"
      aria-label="Share article"
    >
      <span className="text-sm font-bold">Share</span>
      <a
        href={telegram}
        target="_blank"
        rel="noreferrer"
        className="border-ink bg-cream focus-visible:outline-brand-orange hover:bg-peach inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold focus-visible:outline-3 focus-visible:outline-offset-2"
      >
        Telegram
      </a>
      <a
        href={email}
        className="border-ink bg-cream focus-visible:outline-brand-orange hover:bg-peach inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold focus-visible:outline-3 focus-visible:outline-offset-2"
      >
        Email
      </a>
    </div>
  );
}

export function ArticleDetailPage({
  article,
  currentCycle,
  relatedVoices,
}: {
  article: MockVoice;
  currentCycle: ReadingCycle;
  relatedVoices: readonly MockVoice[];
}) {
  return (
    <>
      <article>
        <Section className="relative overflow-hidden pt-8 sm:pt-12">
          <Container>
            <Link
              href="/voices"
              className="text-brand-orange-deep focus-visible:outline-brand-orange inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-4 focus-visible:rounded focus-visible:outline-3"
            >
              ← Back to Voices
            </Link>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <header>
                <div className="flex flex-wrap gap-2">
                  <Chip tone="orange">Voices from the Circle</Chip>
                  <Chip>{article.category}</Chip>
                </div>
                <h1 className="font-display mt-5 text-[clamp(3rem,7vw,6.5rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-balance">
                  {article.title}
                </h1>
                <p className="text-ink/70 mt-6 max-w-3xl text-lg leading-8">
                  {article.subtitle}
                </p>
                <div className="border-ink/10 bg-paper/70 text-ink/60 relative mt-7 inline-flex flex-wrap gap-x-3 gap-y-2 rounded-2xl border px-4 py-3 text-sm">
                  <Image
                    src={assets.voices.paperNote}
                    alt=""
                    width={96}
                    height={86}
                    className="pointer-events-none absolute -top-8 -right-8 hidden w-14 rotate-6 opacity-70 sm:block"
                  />
                  <span className="text-ink font-bold">{article.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>
                <div className="relative mt-6">
                  <DoodleDecoration
                    asset="emphasisArrow"
                    width={140}
                    height={80}
                    className="absolute -right-8 -top-8 hidden w-20 rotate-12 opacity-55 lg:block"
                  />
                  <ShareActions article={article} />
                </div>
              </header>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="bg-peach border-ink paper-grain shadow-paper overflow-hidden rounded-[2.5rem] border-2 p-6">
                  <Image
                    src={coverAssets[article.cover]}
                    alt="A visual reflection on reading and focused attention"
                    width={1213}
                    height={880}
                    className="w-full"
                    priority
                  />
                </div>
                <Image
                  src={assets.voices.emphasisRays}
                  alt=""
                  width={132}
                  height={49}
                  className="pointer-events-none absolute -top-4 -right-3 hidden w-20 sm:block"
                />
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-cream">
          <Container>
            <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,760px)_280px]">
              <div className="article-prose">
                {article.sections.map((section, index) => (
                  <section
                    key={section.heading ?? `opening-${index}`}
                    className="mb-12"
                  >
                    {section.heading ? (
                      <h2 className="font-display mb-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {section.heading}
                      </h2>
                    ) : null}
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-ink/82 mb-6 text-lg leading-[1.85]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.pullQuote ? (
                      <blockquote className="border-brand-orange relative my-10 border-l-4 py-2 pl-7">
                        <Image
                          src={assets.voices.quoteOrange}
                          alt=""
                          width={103}
                          height={82}
                          className="pointer-events-none absolute -top-6 -left-2 w-12 -translate-x-full"
                        />
                        <p className="font-display text-2xl leading-snug font-semibold sm:text-3xl">
                          {section.pullQuote}
                        </p>
                      </blockquote>
                    ) : null}
                  </section>
                ))}

                <div className="border-ink/15 border-t pt-7">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                  <PaperPanel surface="paper" className="mt-7 p-6">
                    <p className="text-xs font-extrabold tracking-[0.12em] uppercase">
                      About this voice
                    </p>
                    <p className="text-ink/70 mt-3 leading-7">
                      {article.authorNote}
                    </p>
                  </PaperPanel>
                </div>
              </div>

              <aside
                className="lg:sticky lg:top-28"
                aria-label="Related reading"
              >
                <PaperPanel
                  surface="peach"
                  className="relative overflow-hidden p-6"
                >
                  <DecorativeAsset
                    src={assets.stickers.tapeStripedOrange}
                    width={132}
                    height={58}
                    className="absolute -top-2 left-1/2 hidden w-20 -translate-x-1/2 rotate-2 opacity-85 lg:block"
                  />
                  <Image
                    src={assets.voices.starCluster}
                    alt=""
                    width={202}
                    height={61}
                    className="pointer-events-none absolute top-3 right-3 w-20 opacity-70"
                  />
                  <p className="font-note text-brand-orange-deep text-2xl">
                    Related reading
                  </p>
                  <div className="mt-5">
                    <BookCoverPlaceholder
                      book={currentCycle.book}
                      className="max-w-40"
                    />
                  </div>
                  <h2 className="font-display mt-7 text-2xl font-semibold">
                    {currentCycle.book.title}
                  </h2>
                  <p className="text-ink/65 mt-2 text-sm leading-6">
                    This voice grew from the current reading circle.
                  </p>
                  <div className="mt-5 grid gap-3">
                    <LinkButton
                      href={`/cycles/${currentCycle.slug}`}
                      variant="secondary"
                      className="w-full"
                    >
                      View the cycle
                    </LinkButton>
                    <LinkButton
                      href={`/books/${article.relatedBookSlug}`}
                      variant="ghost"
                      className="w-full"
                    >
                      Explore the book
                    </LinkButton>
                  </div>
                </PaperPanel>
              </aside>
            </div>
          </Container>
        </Section>
      </article>

      <SectionDivider variant="openBookPlain" className="bg-cream/45" compact />

      <Section>
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-brand-orange-deep text-xs font-extrabold tracking-[0.14em] uppercase">
                Keep following the thought
              </p>
              <h2 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">
                More from the circle
              </h2>
            </div>
            <LinkButton href="/voices" variant="ghost">
              View all voices <ArrowIcon />
            </LinkButton>
          </div>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {relatedVoices.slice(0, 2).map((voice) => (
              <VoiceCard key={voice.slug} voice={voice} />
            ))}
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="voices"
        eyebrow="Read. Reflect. Add your voice."
        title="The next reflection can begin in the current cycle."
        action={{
          label: "Join Current Reading Cycle",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
