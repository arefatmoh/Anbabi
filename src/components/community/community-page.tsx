import Image from "next/image";

import { CommunityPlatformCard } from "@/components/community/community-platform-card";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NumberBadge } from "@/components/ui/number-badge";
import { DecorativeAsset, DoodleDecoration } from "@/components/ui/doodle-decoration";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type {
  CommunityPlatform,
  CommunityPrinciple,
  CommunityRhythmStep,
  ReadingCycle,
} from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

export function CommunityPage({
  platforms,
  rhythm,
  principles,
  recognition,
  currentCycle,
}: {
  platforms: readonly CommunityPlatform[];
  rhythm: readonly CommunityRhythmStep[];
  principles: readonly CommunityPrinciple[];
  recognition: readonly string[];
  currentCycle: ReadingCycle;
}) {
  return (
    <>
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <header className="relative z-10">
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              Welcome to the circle.
            </p>
            <h1 className="font-display mt-3 text-[clamp(3.5rem,7.5vw,6.8rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
              You do not have to build your reading habit{" "}
              <span className="text-brand-orange-deep">alone.</span>
            </h1>
            <p className="text-ink/72 mt-6 max-w-2xl text-lg leading-8">
              Read & Revive turns a private reading goal into a shared rhythm of
              thoughtful prompts, honest check-ins, focused discussion, and
              voices worth carrying forward.
            </p>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
              <DecorativeAsset
                src={assets.community.heartRays}
                width={123}
                height={118}
                className="absolute -right-4 -top-14 hidden w-14 rotate-12 opacity-65 md:block"
              />
              <LinkButton href={siteConfig.telegramUrl} external size="lg">
                Join Current Reading Cycle <ArrowIcon />
              </LinkButton>
              <LinkButton
                href="/community-guidelines"
                variant="secondary"
                size="lg"
              >
                Read Community Guidelines
              </LinkButton>
            </div>
          </header>

          <div className="relative mx-auto w-full max-w-2xl">
            <Image
              src={assets.illustrations.communityDiscussion}
              alt="Young readers sitting in a circle with books and discussing ideas"
              width={1417}
              height={882}
              className="w-full"
              loading="eager"
              priority
            />
            <Image
              src={assets.community.bubbleOrange}
              alt=""
              width={167}
              height={107}
              className="pointer-events-none absolute -top-3 right-2 hidden w-24 rotate-6 sm:block"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-cream relative overflow-hidden">
        <DoodleDecoration
          asset="arrowDashedLoop"
          width={220}
          height={160}
          className="absolute top-8 right-8 hidden w-32 rotate-12 opacity-45 lg:block"
        />
        <DecorativeAsset
          src={assets.community.connectionPath}
          width={500}
          height={141}
          className="absolute bottom-10 left-[8%] hidden w-80 opacity-20 xl:block"
        />
        <Container>
          <SectionHeader
            eyebrow="Choose the right space"
            title="One movement, three clear roles."
            description="Each space does a different job. The active reading practice stays in Telegram; the website holds the official journey; public sharing carries selected ideas further."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {platforms.map((platform) => (
              <CommunityPlatformCard
                key={platform.id}
                platform={platform}
                className={platform.featured ? "lg:row-span-2" : undefined}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Container className="relative">
          <Image
            src={assets.community.connectionPath}
            alt=""
            width={500}
            height={141}
            className="pointer-events-none absolute top-6 right-5 hidden w-72 opacity-60 lg:block"
          />
          <SectionHeader
            eyebrow="The weekly rhythm"
            title="A steady pattern makes reading easier to return to."
            description="The circle repeats a simple sequence so readers know what comes next without turning reading into a race."
          />
          <ol className="journey-line relative z-10 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rhythm.map((step, index) => (
              <li
                key={step.id}
                className="border-ink bg-cream rounded-[1.6rem] border-2 p-6 shadow-[3px_3px_0_#111]"
              >
                <div className="flex items-center gap-3">
                  <NumberBadge
                    value={index + 1}
                    shape={index % 2 === 0 ? "sticker" : "dashed"}
                    tilted={index % 2 === 1}
                  />
                  <span className="text-brand-orange-deep text-xs font-extrabold tracking-[0.12em] uppercase">
                    {step.label}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-3xl leading-tight font-semibold">
                  {step.title}
                </h3>
                <p className="text-ink/68 mt-3 leading-7">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-peach/55 overflow-hidden">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-xl">
            <Image
              src={assets.illustrations.closingSession}
              alt="Readers gathering around a table for a guided book discussion"
              width={1399}
              height={1024}
              className="w-full"
            />
          </div>
          <div className="relative">
            <DecorativeAsset
              src={assets.stickers.tornNotePeachPinned}
              width={190}
              height={150}
              className="absolute -top-12 right-0 hidden w-28 rotate-6 opacity-65 lg:block"
            />
            <p className="font-note text-brand-orange-deep text-2xl">
              The closing session
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              Finish by gathering the questions, not pretending every question
              is finished.
            </h2>
            <p className="text-ink/72 mt-6 text-lg leading-8">
              At the end of a cycle, readers return to the book’s central ideas,
              compare what changed, and identify reflections worth developing
              further. Session details belong to the active cycle and are shared
              through Telegram.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={`/cycles/${currentCycle.slug}`} size="lg">
                View the Reading Plan <ArrowIcon />
              </LinkButton>
              <LinkButton href="/voices" variant="secondary" size="lg">
                Read Voices from the Circle
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="How we hold the circle"
            title="Warm, thoughtful, and clear enough to feel safe."
            description="Good conversation needs more than enthusiasm. These principles protect curiosity, consent, and a reader’s ability to begin again."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {principles.map((principle, index) => (
              <PaperPanel
                key={principle.title}
                surface={index === 1 ? "peach" : "cream"}
                className="relative overflow-hidden p-7"
              >
                {index % 2 === 0 ? (
                  <DecorativeAsset
                    src={assets.stickers.tapeCream}
                    width={120}
                    height={50}
                    className="absolute top-2 right-8 hidden w-16 rotate-6 opacity-60 sm:block"
                  />
                ) : (
                  <DecorativeAsset
                    src={assets.stickers.stampOrangeBorder}
                    width={130}
                    height={130}
                    className="absolute -right-4 -bottom-4 hidden w-16 -rotate-12 opacity-45 sm:block"
                  />
                )}
                <NumberBadge
                  value={`0${index + 1}`}
                  shape={index % 2 === 0 ? "double" : "circle"}
                  size="lg"
                />
                <h3 className="font-display mt-4 text-3xl font-semibold">
                  {principle.title}
                </h3>
                <p className="text-ink/70 mt-3 leading-7">
                  {principle.description}
                </p>
              </PaperPanel>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/community-guidelines" variant="secondary">
              Read the full guidelines
            </LinkButton>
            <LinkButton href="/contact" variant="ghost">
              Ask a community question <ArrowIcon />
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section className="bg-charcoal text-cream overflow-hidden">
        <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <DecorativeAsset
            src={assets.gamification.rewardSticker}
            width={180}
            height={180}
            className="absolute top-10 right-[42%] hidden w-24 rotate-12 opacity-35 lg:block"
          />
          <div>
            <p className="font-note text-brand-orange text-2xl">
              Recognition without competition.
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
              The circle notices effort that helps reading become meaningful.
            </h2>
            <p className="text-cream/70 mt-5 max-w-2xl leading-8">
              Recognition can name a useful contribution without turning
              participation into a score. What matters is the quality of
              participation.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {recognition.map((item) => (
                <li
                  key={item}
                  className="border-cream/20 bg-cream/5 rounded-2xl border p-4 leading-7"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src={assets.illustrations.mobileCommunity}
              alt="A phone, books, and notes representing an active reading discussion"
              width={1274}
              height={925}
              className="w-full"
            />
            <Image
              src={assets.community.heartRays}
              alt=""
              width={123}
              height={118}
              className="pointer-events-none absolute -right-3 -bottom-3 hidden w-20 sm:block"
            />
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="community"
        eyebrow="Bring a book. Bring a question. Bring your voice."
        title="Enter the current reading circle on Telegram."
        action={{
          label: "Open Telegram",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
