import Image from "next/image";

import { CurrentCycleHero } from "@/components/cycle/current-cycle-hero";
import { ProgressPreview } from "@/components/home/progress-preview";
import { VoiceCard } from "@/components/voices/voice-card";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionDivider } from "@/components/ui/section-divider";
import { NumberBadge } from "@/components/ui/number-badge";
import { DecorativeAsset, DoodleDecoration } from "@/components/ui/doodle-decoration";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type { JourneyStep, MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

type HomePageContentProps = {
  cycle: ReadingCycle;
  voices: readonly MockVoice[];
  journey: readonly JourneyStep[];
};

export function HomePageContent({
  cycle,
  voices,
  journey,
}: HomePageContentProps) {
  return (
    <>
      <Section className="relative overflow-hidden pt-8 sm:pt-10 lg:pt-12">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14">
          <div className="relative z-10">
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              Your next chapter is better together.
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.7rem,13.5vw,5.25rem)] leading-[0.92] font-semibold tracking-[-0.055em] text-balance">
              Read together. Reflect deeply.{" "}
              <span className="text-brand-orange-deep relative inline-block">
                Revive
                <Image
                  src={assets.doodles.underlineOrange}
                  alt=""
                  width={266}
                  height={44}
                  className="pointer-events-none absolute -bottom-3 left-0 h-4 w-full object-fill"
                />
              </span>{" "}
              your mind.
            </h1>
            <p className="text-ink/72 mt-7 max-w-2xl text-base leading-8 sm:text-lg">
              Read & Revive / አንባቢ is a welcoming reading movement for young
              people in Ethiopia—built around shared books, honest reflection,
              thoughtful discussion, and emerging voices.
            </p>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DoodleDecoration
                asset="arrowLoopAlt"
                width={175}
                height={128}
                className="absolute -right-6 -bottom-10 hidden w-24 rotate-[-10deg] opacity-55 lg:block lg:right-10"
              />
              <LinkButton href={siteConfig.telegramUrl} external size="lg">
                Join Current Reading Cycle <ArrowIcon />
              </LinkButton>
              <LinkButton href="/books" variant="secondary" size="lg">
                Explore Books
              </LinkButton>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="paper-grain border-ink bg-peach shadow-paper relative overflow-hidden rounded-[2.25rem] border-2 px-5 pt-8 sm:rounded-[3rem] sm:px-8 sm:pt-10">
              <Image
                src={assets.illustrations.heroReadingGroup}
                alt="Young readers sharing books and ideas together"
                width={1393}
                height={819}
                className="relative z-10 h-auto w-full"
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
              />
            </div>
            <Image
              src={assets.doodles.sparkleOrange}
              alt=""
              width={179}
              height={175}
              className="pointer-events-none absolute -top-7 -right-4 hidden w-16 rotate-12 sm:block lg:-right-8 lg:w-20"
            />
            <div className="absolute -bottom-8 left-3 hidden w-52 rotate-[-3deg] sm:block">
              <DecorativeAsset
                src={assets.stickers.stickyNoteCream}
                width={260}
                height={156}
                className="h-auto w-full drop-shadow-[3px_3px_0_rgba(17,17,17,0.25)]"
              />
              <span className="font-note absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-2xl text-ink">
                Books become circles.
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-cream">
        <DoodleDecoration
          asset="sparkleAlt"
          width={132}
          height={128}
          className="absolute top-14 left-[7%] hidden w-14 opacity-55 lg:block"
        />
        <DecorativeAsset
          src={assets.cycle.calendar}
          width={170}
          height={170}
          className="absolute top-10 right-[9%] hidden w-20 rotate-6 opacity-75 lg:block"
        />
        <DecorativeAsset
          src={assets.cycle.flag}
          width={150}
          height={150}
          className="absolute bottom-10 left-[6%] hidden w-16 -rotate-6 opacity-65 xl:block"
        />
        <Container>
          <SectionHeader
            eyebrow="Start here"
            title="The Current Reading Cycle"
            description="Read Deep Work in a clear four-week rhythm, reflect on attention and distraction, and bring the strongest questions back to the circle."
          />
          <div className="mt-10">
            <CurrentCycleHero cycle={cycle} compact />
          </div>
        </Container>
      </Section>

      <SectionDivider variant="openBook" className="bg-cream/45" />

      <Section className="relative overflow-hidden">
        <DoodleDecoration
          asset="readingPath"
          width={488}
          height={64}
          className="absolute top-10 left-1/2 hidden w-80 -translate-x-1/2 opacity-45 lg:block"
        />
        <DoodleDecoration
          asset="arrowLoop"
          width={160}
          height={130}
          className="absolute top-20 right-8 hidden w-24 rotate-12 opacity-65 lg:block"
        />
        <DoodleDecoration
          asset="sparkleRays"
          width={120}
          height={90}
          className="absolute bottom-8 left-10 hidden w-20 opacity-70 lg:block"
        />
        <Container className="relative">
          <SectionHeader
            eyebrow="How the circle works"
            title="A book becomes a shared journey."
            description="Each step moves reading toward thought, conversation, expression, and another person’s beginning."
            align="center"
          />
          <ol className="journey-line mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3 lg:grid-cols-6">
            {journey.map((step, index) => (
              <li
                key={step.title}
                className="border-ink bg-cream relative rounded-[1.5rem] border-2 p-5 shadow-[3px_3px_0_#111]"
              >
                <NumberBadge
                  value={index + 1}
                  shape={index % 2 === 0 ? "sticker" : "dashed"}
                  tilted={index % 2 === 1}
                />
                <h3 className="font-display mt-4 text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-ink/65 mt-2 text-sm leading-6">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <ProgressPreview />
        </Container>
      </Section>

      <Section>
        <Container className="grid items-center gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader
            eyebrow="Why Read & Revive exists"
            title="A reading habit can be personal without being lonely."
            description="The movement makes space for a clear plan, thoughtful peers, and the discipline to turn reading into reflection and service—not another stream of noise."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <PaperPanel className="relative rotate-[-1deg] overflow-visible p-6">
              <DecorativeAsset
                src={assets.stickers.tapeOrange}
                width={116}
                height={52}
                className="absolute -top-4 left-8 hidden w-20 -rotate-6 sm:block"
              />
              <p className="font-note text-brand-orange-deep text-2xl">
                The friction
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold">
                Starting alone is easy. Continuing alone is harder.
              </h3>
              <p className="text-ink/70 mt-3 text-sm leading-7">
                A shared rhythm gives a reader somewhere to return with
                questions, unfinished thoughts, and small signs of progress.
              </p>
            </PaperPanel>
            <PaperPanel surface="peach" className="relative rotate-[1deg] overflow-visible p-6">
              <DecorativeAsset
                src={assets.stickers.stampOrangeBorder}
                width={130}
                height={130}
                className="absolute -top-7 right-2 hidden w-16 rotate-12 opacity-80 sm:block"
              />
              <p className="font-note text-brand-orange-deep text-2xl">
                The circle
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold">
                Reading becomes more useful when ideas move.
              </h3>
              <p className="text-ink/70 mt-3 text-sm leading-7">
                A page leads to reflection, reflection enters discussion, and a
                reader begins to discover their own voice.
              </p>
            </PaperPanel>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container className="relative">
          <DoodleDecoration
            asset="voicesQuote"
            width={140}
            height={120}
            className="absolute top-0 right-8 hidden w-16 rotate-6 opacity-60 lg:block"
          />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Voices from the Circle"
              title="Reading leaves a trace."
              description="Reflections, questions, and experiments that began with the current book and grew through conversation."
            />
            <LinkButton href="/voices" variant="ghost">
              Explore Voices <ArrowIcon />
            </LinkButton>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <VoiceCard voice={voices[0]} featured />
            <div className="grid gap-6">
              <VoiceCard voice={voices[1]} />
              <VoiceCard voice={voices[2]} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <PaperPanel
            surface="charcoal"
            className="relative overflow-hidden p-7 sm:p-10 lg:p-12"
          >
            <DoodleDecoration
              asset="ctaDashedArrow"
              width={200}
              height={110}
              className="absolute top-20 left-[44%] hidden w-28 opacity-45 lg:block"
            />
            <DoodleDecoration
              asset="ctaOpenBookAlt"
              width={180}
              height={150}
              className="absolute right-8 bottom-7 hidden w-24 rotate-6 opacity-45 xl:block"
            />
            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_0.55fr]">
              <div>
                <p className="font-note text-brand-orange text-2xl">
                  Welcome to the circle.
                </p>
                <h2 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
                  Telegram is where the reading conversation continues.
                </h2>
                <p className="text-cream/70 mt-5 max-w-2xl leading-8">
                  Use it for cycle updates, weekly prompts, focused discussion,
                  and the small encouragement that keeps a reading habit moving.
                </p>
                <LinkButton
                  href={siteConfig.telegramUrl}
                  external
                  variant="inverse"
                  size="lg"
                  className="mt-7"
                >
                  Open Telegram <ArrowIcon />
                </LinkButton>
              </div>
              <Image
                src={assets.illustrations.currentReadingCycle}
                alt="Readers moving through a shared reading cycle"
                width={1237}
                height={1012}
                className="mx-auto w-full max-w-sm"
              />
            </div>
          </PaperPanel>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="home"
        eyebrow="You do not have to build your reading habit alone."
        title="Your next chapter can begin in the circle."
        action={{
          label: "Join Current Reading Cycle",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
