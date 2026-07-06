import Image from "next/image";

import { Container } from "@/components/ui/container";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { NumberBadge } from "@/components/ui/number-badge";
import { SectionDivider } from "@/components/ui/section-divider";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { assets } from "@/lib/assets";
import type { PolicyPageContent } from "@/lib/content-types";

export function PolicyPage({ content }: { content: PolicyPageContent }) {
  return (
    <>
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <header>
            <p className="text-brand-orange-deep mb-4 text-xs font-extrabold tracking-[0.16em] uppercase">
              {content.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3.25rem,7vw,6.4rem)] leading-[0.92] font-semibold tracking-[-0.055em] text-balance">
              {content.title}
            </h1>
            <p className="text-ink/72 mt-6 max-w-3xl text-lg leading-8">
              {content.description}
            </p>
          </header>
          <PaperPanel
            surface="peach"
            className="relative overflow-hidden p-7 sm:p-9"
          >
            <Image
              src={assets.policy.linedPaper}
              alt=""
              width={286}
              height={308}
              className="pointer-events-none absolute -top-5 -right-4 hidden w-32 rotate-6 opacity-80 sm:block"
            />
            <p className="font-note text-brand-orange-deep text-2xl">
              Read with trust.
            </p>
            <div className="text-ink/75 mt-5 space-y-4 text-lg leading-8">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </PaperPanel>
        </Container>
      </Section>

      <SectionDivider variant="botanical" className="bg-cream" />

      <Section className="bg-cream">
        <Container className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <PaperPanel surface="paper" className="p-5">
              <p className="text-brand-orange-deep text-xs font-extrabold tracking-[0.14em] uppercase">
                On this page
              </p>
              <ol className="mt-4 grid gap-3 text-sm font-semibold">
                {content.sections.map((section, index) => (
                  <li key={section.title} className="flex items-center gap-3">
                    <NumberBadge
                      value={`0${index + 1}`}
                      size="sm"
                      shape="double"
                    />
                    <span>{section.title}</span>
                  </li>
                ))}
              </ol>
            </PaperPanel>
          </aside>

          <div className="grid gap-6">
            {content.sections.map((section, index) => (
              <article
                key={section.title}
                className="border-ink bg-paper rounded-[1.75rem] border-2 p-6 shadow-[3px_3px_0_#111] sm:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <NumberBadge
                    value={index + 1}
                    shape={index % 2 === 0 ? "double" : "dashed"}
                  />
                  <div>
                    <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                      {section.title}
                    </h2>
                    <div className="text-ink/74 mt-4 space-y-4 leading-8">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-5 grid gap-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-ink/72 flex gap-3 leading-7"
                          >
                            <span className="bg-brand-orange mt-2.5 size-2 shrink-0 rounded-full" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        tone="charcoal"
        accent="policy"
        eyebrow={content.closingTitle}
        title={content.closingBody}
        action={{ label: "Contact Read & Revive", href: "/contact" }}
      />
    </>
  );
}
