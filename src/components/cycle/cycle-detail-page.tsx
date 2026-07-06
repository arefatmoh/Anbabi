import Image from "next/image";

import { CurrentCycleHero } from "@/components/cycle/current-cycle-hero";
import { MobileJoinBar } from "@/components/cycle/mobile-join-bar";
import { ReadingTimeline } from "@/components/cycle/reading-timeline";
import { VoiceCard } from "@/components/voices/voice-card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { DecorativeAsset } from "@/components/ui/doodle-decoration";
import { NumberBadge } from "@/components/ui/number-badge";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type { MockVoice, ReadingCycle } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

type CycleDetailPageProps = {
  cycle: ReadingCycle;
  voices: readonly MockVoice[];
};

export function CycleDetailPage({ cycle, voices }: CycleDetailPageProps) {
  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              One book. A shared rhythm. Deeper thought.
            </p>
            <h1 className="font-display mt-3 text-5xl leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
              A reading mission with room to think.
            </h1>
            <p className="text-ink/65 mt-5 leading-8">
              Deep Work asks what becomes possible when we protect our
              attention. This cycle turns that question into four weeks of
              reading, reflection, and focused practice.
            </p>
          </div>
          <CurrentCycleHero cycle={cycle} />
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <PaperPanel className="p-7 sm:p-9">
              <p className="font-note text-brand-orange-deep text-2xl">
                Why this kind of book?
              </p>
              <h2 className="font-display mt-2 text-4xl font-semibold">
                A selection should open a useful question.
              </h2>
              <p className="text-ink/70 mt-5 leading-8">{cycle.whySelected}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {cycle.book.themes.map((theme) => (
                  <Chip key={theme}>{theme}</Chip>
                ))}
              </div>
            </PaperPanel>
            <PaperPanel surface="peach" className="p-7 sm:p-9">
              <p className="font-note text-brand-orange-deep text-2xl">
                Who can join?
              </p>
              <h2 className="font-display mt-2 text-4xl font-semibold">
                Come curious. That is enough.
              </h2>
              <ul className="mt-6 grid gap-4">
                {cycle.readerFit.map((fit) => (
                  <li key={fit} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-brand-orange border-ink mt-0.5 size-7 shrink-0 rounded-full border-2"
                    />
                    <span className="leading-7">{fit}</span>
                  </li>
                ))}
              </ul>
            </PaperPanel>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Reading schedule"
            title="The path stays clear, even when the thinking gets deep."
            description="Move through the book one focused theme at a time, with a practical reading target and a question worth carrying into the circle."
          />
          <div className="mt-12">
            <ReadingTimeline steps={cycle.schedule} />
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <PaperPanel className="relative overflow-hidden p-7 sm:p-9">
            <DecorativeAsset
              src={assets.stickers.tornNoteTaped}
              width={190}
              height={145}
              className="absolute top-4 right-5 hidden w-24 rotate-3 opacity-55 sm:block"
            />
            <DecorativeAsset
              src={assets.stickers.tapeCream}
              width={120}
              height={50}
              className="absolute top-0 left-12 hidden w-20 -rotate-3 opacity-80 sm:block"
            />
            <div className="relative z-10 flex items-start gap-4">
              <Image
                src={assets.icons.discussion}
                alt=""
                width={80}
                height={80}
                className="w-14"
              />
              <div>
                <p className="font-note text-brand-orange-deep text-2xl">
                  This circle might ask…
                </p>
                <h2 className="font-display mt-1 text-4xl font-semibold">
                  Reflection prompts
                </h2>
              </div>
            </div>
            <ol className="relative z-10 mt-7 grid gap-4">
              {cycle.prompts.map((prompt, index) => (
                <li
                  key={prompt}
                  className="border-ink/15 bg-paper flex gap-4 rounded-2xl border p-4"
                >
                  <NumberBadge
                    value={index + 1}
                    size="sm"
                    shape={index % 2 === 0 ? "dashed" : "circle"}
                  />
                  <p className="leading-7">{prompt}</p>
                </li>
              ))}
            </ol>
          </PaperPanel>

          <div className="grid gap-6">
            <PaperPanel surface="charcoal" className="p-7">
              <p className="font-note text-brand-orange text-2xl">
                Closing reflection
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold">
                Bring the book together.
              </h2>
              <p className="text-cream/70 mt-4 leading-7">
                Return to the strongest ideas, compare what readers tried in
                practice, and shape one reflection to carry beyond the final
                chapter.
              </p>
            </PaperPanel>
            <PaperPanel className="relative overflow-hidden p-7">
              <Image
                src={assets.gamification.rewardMini}
                alt=""
                width={160}
                height={160}
                className="pointer-events-none absolute -right-6 -bottom-7 hidden w-24 rotate-6 opacity-55 sm:block"
              />
              <div className="relative z-10 flex items-center gap-4">
                <Image
                  src={assets.icons.trophy}
                  alt=""
                  width={80}
                  height={80}
                  className="w-14"
                />
                <div>
                  <p className="font-note text-brand-orange-deep text-2xl">
                    Recognition
                  </p>
                  <h2 className="font-display text-3xl font-semibold">
                    Meaningful effort matters.
                  </h2>
                </div>
              </div>
              <p className="text-ink/70 relative z-10 mt-4 leading-7">
                The circle values consistency, thoughtful questions, generous
                discussion, and reflections that help another reader see the
                book differently.
              </p>
            </PaperPanel>
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        accent="cycle"
        eyebrow="Discussion platform"
        title="Continue the conversation on Telegram."
        description="Follow the weekly reading rhythm, respond to prompts, and bring your own questions into the group discussion."
        action={{
          label: "Join on Telegram",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Voices from the Circle"
            title="The reading continues in words of your own."
            description="Three reflections that carry the Deep Work ideas into attention, habit, and everyday digital life."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {voices.map((voice) => (
              <VoiceCard key={voice.slug} voice={voice} />
            ))}
          </div>
        </Container>
      </Section>

      <MobileJoinBar href={siteConfig.telegramUrl} />
    </>
  );
}
