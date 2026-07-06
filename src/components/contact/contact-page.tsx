import Image from "next/image";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecoratedCTASection } from "@/components/ui/decorated-cta-section";
import { PaperPanel } from "@/components/ui/paper-panel";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { assets } from "@/lib/assets";
import type {
  ContactInquiry,
  ContactPrinciple,
  ReadingCycle,
} from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

const inquiryIcons: Record<ContactInquiry["icon"], string> = {
  envelope: assets.icons.envelope,
  discussion: assets.icons.discussion,
  book: assets.icons.openBook,
  notebook: assets.icons.notebook,
};

export function ContactPage({
  inquiries,
  principles,
  currentCycle,
}: {
  inquiries: readonly ContactInquiry[];
  principles: readonly ContactPrinciple[];
  currentCycle: ReadingCycle;
}) {
  return (
    <>
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <header className="relative z-10">
            <p className="font-note text-brand-orange-deep text-2xl sm:text-3xl">
              Start a clear conversation.
            </p>
            <h1 className="font-display mt-3 text-[clamp(3.5rem,7.5vw,6.8rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
              Every good message begins with the right doorway.
            </h1>
            <p className="text-ink/72 mt-6 max-w-2xl text-lg leading-8">
              Choose the path that fits your question: the current reading
              cycle, a book suggestion, article interest, volunteer support, or
              a collaboration conversation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={siteConfig.telegramUrl} external size="lg">
                Open Telegram <ArrowIcon />
              </LinkButton>
              <LinkButton
                href="/community-guidelines"
                variant="secondary"
                size="lg"
              >
                Read Guidelines
              </LinkButton>
            </div>
          </header>

          <div className="relative mx-auto w-full max-w-2xl">
            <PaperPanel
              surface="cream"
              className="relative overflow-hidden p-6 sm:p-8"
            >
              <Image
                src={assets.illustrations.mobileCommunity}
                alt="A phone, books, notes, and conversation bubbles representing community contact"
                width={1274}
                height={925}
                className="w-full"
                loading="eager"
                priority
              />
              <Image
                src={assets.contact.paperClip}
                alt=""
                width={86}
                height={84}
                className="pointer-events-none absolute top-5 left-5 hidden w-14 rotate-[-12deg] sm:block"
              />
            </PaperPanel>
            <Image
              src={assets.contact.bookSpark}
              alt=""
              width={223}
              height={171}
              className="pointer-events-none absolute -right-5 -bottom-6 hidden w-28 rotate-6 sm:block"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Inquiry paths"
            title="Pick the conversation that matches your intention."
            description="These paths keep the circle organized while making room for different kinds of participation. The confirmed public contact doorway is Telegram."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {inquiries.map((inquiry, index) => (
              <PaperPanel
                key={inquiry.id}
                surface={index === 1 || index === 4 ? "peach" : "paper"}
                className="relative flex h-full flex-col overflow-hidden p-6"
              >
                <Image
                  src={
                    index % 2 === 0
                      ? assets.contact.tapeOrange
                      : assets.contact.stamp
                  }
                  alt=""
                  width={120}
                  height={80}
                  className="pointer-events-none absolute top-3 right-4 hidden w-16 rotate-6 opacity-55 sm:block"
                />
                <div className="relative z-10 flex items-start justify-between gap-5">
                  <Image
                    src={inquiryIcons[inquiry.icon]}
                    alt=""
                    width={96}
                    height={96}
                    className="size-14 object-contain"
                  />
                  <span className="bg-brand-orange/15 text-brand-orange-deep border-brand-orange-deep rounded-full border px-3 py-1 text-xs font-extrabold tracking-[0.12em] uppercase">
                    {inquiry.label}
                  </span>
                </div>
                <h2 className="font-display mt-5 text-3xl leading-tight font-semibold">
                  {inquiry.title}
                </h2>
                <p className="text-ink/70 mt-3 leading-7">
                  {inquiry.description}
                </p>
                <ul className="mt-5 grid gap-3">
                  {inquiry.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-ink/72 flex gap-3 text-sm leading-6"
                    >
                      <span className="bg-brand-orange mt-2 size-2 shrink-0 rounded-full" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <LinkButton
                    href={inquiry.actionHref}
                    external={inquiry.external}
                    variant="ghost"
                  >
                    {inquiry.actionLabel} <ArrowIcon />
                  </LinkButton>
                </div>
              </PaperPanel>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src={assets.contact.stickyNote}
              alt=""
              width={286}
              height={291}
              className="pointer-events-none absolute -top-8 -left-4 hidden w-32 rotate-[-7deg] opacity-90 sm:block"
            />
            <PaperPanel surface="peach" className="relative p-7 sm:p-9">
              <Image
                src={assets.icons.envelope}
                alt=""
                width={160}
                height={160}
                className="mx-auto w-28"
              />
              <p className="font-note text-brand-orange-deep mt-5 text-center text-2xl">
                A good message respects attention.
              </p>
            </PaperPanel>
          </div>
          <div>
            <SectionHeader
              eyebrow="Before sending"
              title="Make it easy to understand, route, and protect."
              description="The contact path should help the reading circle, not create confusion around private details, article consent, or public claims."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="border-ink bg-cream rounded-[1.4rem] border-2 p-5 shadow-[3px_3px_0_#111]"
                >
                  <h3 className="font-display text-2xl leading-tight font-semibold">
                    {principle.title}
                  </h3>
                  <p className="text-ink/68 mt-3 text-sm leading-6">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <DecoratedCTASection
        tone="charcoal"
        accent="contact"
        eyebrow={`Current doorway: ${currentCycle.title}`}
        title="For active reading questions, enter the Telegram circle."
        description="Telegram is where reading prompts, discussion, and cycle updates are easiest to follow in the moment."
        action={{
          label: "Open Telegram",
          href: siteConfig.telegramUrl,
          external: true,
        }}
      />
    </>
  );
}
