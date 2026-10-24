import { CurrentCycleHero } from "@/components/cycle/current-cycle-hero";
import { HomeImpactStats, HomePrograms } from "@/components/home/home-impact-programs";
import { ReaderDoodles } from "@/components/home/reader-doodles";
import { ReadingValues } from "@/components/home/reading-values";
import { VoiceCard } from "@/components/voices/voice-card";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionDivider } from "@/components/ui/section-divider";
import { NumberBadge } from "@/components/ui/number-badge";
import { MobileSwipeRail } from "@/components/ui/mobile-swipe-rail";
import { DecorativeAsset, DoodleDecoration } from "@/components/ui/doodle-decoration";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type { HomeImpactStat, HomeProgram, JourneyStep, MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

type HomePageContentProps = {
  cycle: ReadingCycle;
  voices: readonly MockVoice[];
  journey: readonly JourneyStep[];
  impactStats: readonly HomeImpactStat[];
  programs: readonly HomeProgram[];
};

export function HomePageContent({
  cycle,
  voices,
  journey,
  impactStats,
  programs,
}: HomePageContentProps) {
  return (
    <>
      <section className="home-hero relative overflow-hidden bg-paper">
        <Container className="grid items-center gap-6 md:grid-cols-[1.3fr_1fr] md:gap-4 lg:gap-10">
          <div className="relative z-10">
            <h1 className="home-hero-heading font-display font-semibold">
              <span className="block">Reviving</span>{" "}
              <span className="mt-2 block whitespace-nowrap">
                Reading <span className="home-hero-culture font-note text-brand-orange">Culture</span>
              </span>
            </h1>
            <p className="home-hero-tagline mt-6 font-semibold">
              Reading, Sharing, and Connecting.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-5">
              <LinkButton href="/books" className="home-hero-button home-hero-button-orange">
                Explore Books <ArrowIcon />
              </LinkButton>
              <LinkButton href="/voices" variant="secondary" className="home-hero-button home-hero-button-ink">
                Browse Voices <ArrowIcon />
              </LinkButton>
            </div>
          </div>
          <div className="mx-auto -mb-8 w-full max-w-[22rem] md:mb-0 md:max-w-none">
            <ReaderDoodles />
          </div>
        </Container>
        <Container className="mt-16 sm:mt-20">
          <ReadingValues />
        </Container>
        <div className="mt-8 sm:mt-10">
          <HomeImpactStats stats={impactStats} />
        </div>
      </section>

      <Section className="relative overflow-hidden bg-cream">
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
          />
          <div className="mt-10">
            <CurrentCycleHero cycle={cycle} compact showStatusBadge={false} />
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
                  shape="sticker"
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

      <HomePrograms programs={programs} />

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
            />
            <LinkButton href="/voices" variant="ghost">
              Explore Voices <ArrowIcon />
            </LinkButton>
          </div>
          <MobileSwipeRail
            label="Swipe through Voices from the Circle"
            hint="Swipe voices"
            className="mt-10"
          >
            <VoiceCard voice={voices[0]} mobileSwipe />
            <VoiceCard voice={voices[1]} mobileSwipe />
            <VoiceCard voice={voices[2]} mobileSwipe />
          </MobileSwipeRail>

          <div className="home-voices-grid mt-10 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
            <VoiceCard voice={voices[0]} />
            <VoiceCard voice={voices[1]} />
            <VoiceCard voice={voices[2]} />
          </div>
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
