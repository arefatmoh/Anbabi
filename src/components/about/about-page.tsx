import Image from "next/image";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecorativeAsset, DoodleDecoration } from "@/components/ui/doodle-decoration";
import { SectionDivider } from "@/components/ui/section-divider";
import { NumberBadge } from "@/components/ui/number-badge";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type {
  AboutCopy,
  AboutTrustMarker,
  AboutValue,
  JourneyStep,
  ReadingCycle,
} from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

export function AboutPage({
  copy,
  values,
  trustMarkers,
  journey,
  currentCycle,
}: {
  copy: AboutCopy;
  values: readonly AboutValue[];
  trustMarkers: readonly AboutTrustMarker[];
  journey: readonly JourneyStep[];
  currentCycle: ReadingCycle;
}) {
  return (
    <>
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <header className="relative z-10">
            <DecorativeAsset
              src={assets.about.tornStrip}
              width={260}
              height={82}
              className="absolute -top-8 left-0 hidden w-44 -rotate-2 opacity-45 md:block"
            />
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              About Read & Revive / አንባቢ
            </p>
            <h1 className="font-display mt-3 text-[clamp(3.5rem,7.5vw,6.8rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
              Books become circles. Circles become{" "}
              <span className="text-brand-orange-deep">voices.</span>
            </h1>
            <p className="text-ink/72 mt-6 max-w-2xl text-lg leading-8">
              {copy.definition}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={siteConfig.telegramUrl} external size="lg">
                Join Current Reading Cycle <ArrowIcon />
              </LinkButton>
              <LinkButton href="/books" variant="secondary" size="lg">
                Explore Books
              </LinkButton>
            </div>
          </header>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="bg-peach border-ink paper-grain shadow-paper overflow-hidden rounded-[2.5rem] border-2 p-5 sm:p-8">
              <Image
                src={assets.illustrations.heroReadingGroup}
                alt="Young readers sharing books and ideas together"
                width={1200}
                height={994}
                className="w-full"
                loading="eager"
                priority
              />
            </div>
            <Image
              src={assets.about.sparkles}
              alt=""
              width={134}
              height={118}
              className="pointer-events-none absolute -top-5 -right-4 hidden w-20 sm:block"
            />
          </div>
        </Container>
      </Section>

      <Section
        className="bg-cream bg-blend-multiply"
        style={{ backgroundImage: `linear-gradient(rgba(255, 250, 239, 0.88), rgba(255, 250, 239, 0.88)), url(${assets.textures.warmPaper})` }}
      >
        <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-brand-orange-deep text-xs font-extrabold tracking-[0.14em] uppercase">
              The problem we are working on
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              The desire to read needs a structure strong enough to survive a
              distracted week.
            </h2>
            <div className="text-ink/74 mt-7 max-w-3xl space-y-5 text-lg leading-9">
              {copy.problem.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src={assets.illustrations.bookStackGrowth}
              alt="A plant growing from a stack of books"
              width={1024}
              height={912}
              className="w-full"
            />
          </div>
        </Container>
      </Section>

      <SectionDivider variant="botanical" className="bg-cream/45" />

      <Section className="relative overflow-hidden">
        <Container className="relative">
          <Image
            src={assets.about.arrowForward}
            alt=""
            width={155}
            height={74}
            className="pointer-events-none absolute top-8 right-8 hidden w-28 opacity-60 lg:block"
          />
          <SectionHeader
            eyebrow="The reading-cycle model"
            title="A book is the beginning, not the finish line."
            description="Read & Revive follows a clear loop that helps an idea move from a page into reflection, conversation, expression, and another reader’s beginning."
          />
          <ol className="journey-line relative z-10 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {journey.map((step, index) => (
              <li
                key={step.title}
                className="border-ink bg-cream rounded-[1.6rem] border-2 p-6 shadow-[3px_3px_0_#111]"
              >
                <NumberBadge
                  value={index + 1}
                  shape={index % 2 === 0 ? "sticker" : "dashed"}
                  tilted={index % 2 === 1}
                />
                <h3 className="font-display mt-5 text-3xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-ink/68 mt-3 leading-7">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-peach/55 overflow-hidden">
        <Container className="grid gap-8 lg:grid-cols-2">
          <PaperPanel
            surface="cream"
            className="relative overflow-hidden p-7 sm:p-10"
          >
            <Image
              src={assets.about.openBook}
              alt=""
              width={148}
              height={89}
              className="pointer-events-none absolute top-6 right-6 hidden w-24 opacity-60 sm:block"
            />
            <p className="font-note text-brand-orange-deep text-2xl">
              Our mission
            </p>
            <h2 className="font-display mt-4 max-w-xl text-4xl leading-tight font-semibold">
              Make reading easier to begin and richer to continue.
            </h2>
            <p className="text-ink/72 mt-5 max-w-xl text-lg leading-8">
              {copy.mission}
            </p>
          </PaperPanel>
          <PaperPanel
            surface="charcoal"
            className="relative overflow-hidden p-7 sm:p-10"
          >
            <Image
              src={assets.about.readers}
              alt=""
              width={120}
              height={81}
              className="pointer-events-none absolute top-6 right-6 hidden w-20 opacity-50 brightness-0 invert sm:block"
            />
            <p className="font-note text-brand-orange text-2xl">Our vision</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl leading-tight font-semibold">
              A culture where thoughtful reading creates thoughtful voices.
            </h2>
            <p className="text-cream/72 mt-5 max-w-xl text-lg leading-8">
              {copy.vision}
            </p>
          </PaperPanel>
        </Container>
      </Section>

      <Section>
        <Container className="relative">
          <DoodleDecoration
            asset="circleScribble"
            width={145}
            height={120}
            className="absolute top-10 right-10 hidden w-20 opacity-35 lg:block"
          />
          <SectionHeader
            eyebrow="Values in practice"
            title="What matters while we read together."
            description="The movement is broad and welcoming, guided by knowledge, purpose, sincerity, discipline, character, service, and respect."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <PaperPanel
                key={value.title}
                surface={index === 2 ? "peach" : "cream"}
                className="relative overflow-hidden p-7"
              >
                {index === 0 ? (
                  <DecorativeAsset
                    src={assets.stickers.tapeCream}
                    width={120}
                    height={50}
                    className="absolute top-3 right-8 hidden w-16 rotate-6 opacity-60 sm:block"
                  />
                ) : null}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  <NumberBadge
                    value={`0${index + 1}`}
                    shape={index % 2 === 0 ? "double" : "circle"}
                    size="lg"
                  />
                  <div>
                    <h3 className="font-display text-3xl font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-ink/70 mt-3 leading-7">
                      {value.description}
                    </p>
                  </div>
                </div>
              </PaperPanel>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Trust through clarity"
            title="Look at the work, not a wall of claims."
            description="The clearest trust markers are the parts of the reading experience visitors can inspect directly."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {trustMarkers.map((marker, index) => (
              <PaperPanel
                key={marker.title}
                surface={index === 1 ? "peach" : "paper"}
                className="flex h-full flex-col p-7"
              >
                <h3 className="font-display text-3xl font-semibold">
                  {marker.title}
                </h3>
                <p className="text-ink/70 mt-4 leading-7">
                  {marker.description}
                </p>
                <div className="mt-auto pt-6">
                  <LinkButton href={marker.href} variant="ghost">
                    {marker.actionLabel} <ArrowIcon />
                  </LinkButton>
                </div>
              </PaperPanel>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-charcoal text-cream overflow-hidden">
        <Container className="relative grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <DoodleDecoration
            asset="emphasisRays"
            width={145}
            height={92}
            className="absolute top-10 right-12 hidden w-20 opacity-70 lg:block"
          />
          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src={assets.illustrations.writingReflection}
              alt="A notebook and writing tools representing reflection becoming expression"
              width={1131}
              height={834}
              className="w-full"
            />
          </div>
          <div>
            <p className="font-note text-brand-orange text-2xl">
              Youth-led means participation, not decoration.
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
              Young readers should have room to question, contribute, and shape
              the conversation.
            </h2>
            <p className="text-cream/72 mt-6 max-w-3xl text-lg leading-8">
              The cycle is designed to move readers from receiving ideas to
              responding to them. That means discussion matters, consent
              matters, and a reader’s own clear voice matters.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/voices" variant="inverse" size="lg">
                Read Voices from the Circle
              </LinkButton>
              <LinkButton
                href="/contact"
                variant="ghost"
                size="lg"
                className="text-cream decoration-brand-orange"
              >
                Start a conversation <ArrowIcon />
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="about"
        eyebrow={`The current chapter is ${currentCycle.book.title}.`}
        title="Read together. Reflect deeply. Revive your mind."
        action={{
          label: "Join Current Reading Cycle",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
