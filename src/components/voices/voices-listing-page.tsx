import Image from "next/image";

import { VoiceCard } from "@/components/voices/voice-card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { DecorativeAsset } from "@/components/ui/doodle-decoration";
import { SectionDivider } from "@/components/ui/section-divider";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type { MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

export function VoicesListingPage({
  voices,
  currentCycle,
}: {
  voices: readonly MockVoice[];
  currentCycle: ReadingCycle;
}) {
  const featured = voices.find((voice) => voice.featured) ?? voices[0];
  const stream = voices.filter((voice) => voice.slug !== featured.slug);
  const categories = [...new Set(voices.map((voice) => voice.category))];

  return (
    <>
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="relative z-10">
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              From reading to reflection.
            </p>
            <h1 className="font-display mt-3 text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
              Voices from the{" "}
              <span className="text-brand-orange-deep">Circle</span>
            </h1>
            <p className="text-ink/70 mt-6 max-w-2xl text-lg leading-8">
              Reflections, reader stories, and practical ideas that began with a
              book and grew through conversation.
            </p>
            <div
              className="relative mt-7 flex flex-wrap gap-2"
              aria-label="Voice categories"
            >
              <DecorativeAsset
                src={assets.voices.paperNote}
                width={96}
                height={86}
                className="absolute -right-2 -top-12 hidden w-14 rotate-6 opacity-60 md:block"
              />
              <Chip tone="orange">All voices</Chip>
              {categories.map((category) => (
                <Chip key={category}>{category}</Chip>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="bg-peach border-ink paper-grain shadow-paper relative overflow-hidden rounded-[2.5rem] border-2 p-6">
              <Image
                src={assets.illustrations.voicesFromCircle}
                alt="A reader shaping ideas into writing"
                width={1213}
                height={880}
                className="w-full"
                loading="eager"
                priority
              />
            </div>
            <Image
              src={assets.voices.quoteOrange}
              alt=""
              width={103}
              height={82}
              className="pointer-events-none absolute -top-5 -left-4 hidden w-16 rotate-[-8deg] sm:block"
            />
            <Image
              src={assets.voices.starCluster}
              alt=""
              width={202}
              height={61}
              className="pointer-events-none absolute -right-7 -bottom-5 hidden w-28 sm:block"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Featured reflection"
            title="One voice can reopen a familiar idea."
            description="Start with a reflection from the current reading circle, then follow the questions it leaves behind."
          />
          <div className="mt-10">
            <VoiceCard voice={featured} featured />
          </div>
        </Container>
      </Section>

      <SectionDivider variant="leafDot" className="bg-cream/45" compact />

      <Section id="article-stream">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Keep reading"
              title="More from the circle"
              description="Different readers notice different doors in the same book."
            />
            <Image
              src={assets.voices.readersAndBook}
              alt=""
              width={307}
              height={67}
              className="pointer-events-none hidden w-48 lg:block"
            />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {stream.map((voice) => (
              <VoiceCard key={voice.slug} voice={voice} />
            ))}
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="voices"
        eyebrow="The book behind these voices"
        title={`${currentCycle.book.title} is still moving through the circle.`}
        description="Join the current cycle, follow the reading rhythm, and bring your own question into the conversation."
        action={{
          label: "Join Current Reading Cycle",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
