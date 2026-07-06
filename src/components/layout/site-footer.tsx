import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { assets } from "@/lib/assets";
import { footerNavigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-cream relative overflow-hidden py-12 sm:py-16">
      <Image
        src={assets.doodles.starOrange}
        alt=""
        aria-hidden="true"
        width={102}
        height={102}
        className="pointer-events-none absolute top-14 left-[8%] hidden w-10 rotate-12 opacity-45 sm:block"
      />
      <Container>
        <div className="border-cream/20 grid gap-10 border-b pb-10 md:grid-cols-[1.25fr_0.75fr_1fr]">
          <div>
            <BrandLogo inverse />
            <p className="text-cream/70 mt-5 max-w-md text-sm leading-7 sm:text-base">
              A reading circle where books lead to reflection, discussion, and
              voices worth sharing.
            </p>
            <p className="font-note text-brand-orange mt-4 text-2xl">
              Reading · Sharing · Connecting
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-sm font-extrabold tracking-[0.12em] uppercase">
              Keep exploring
            </p>
            <ul className="mt-4 grid gap-2">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/75 hover:text-brand-orange focus-visible:outline-brand-orange inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-3 focus-visible:outline-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative">
            <Image
              src={assets.cta.arrowUp}
              alt=""
              aria-hidden="true"
              width={132}
              height={132}
              className="pointer-events-none absolute -top-3 right-4 hidden w-12 rotate-12 opacity-35 lg:block"
            />
            <p className="text-sm font-extrabold tracking-[0.12em] uppercase">
              Enter the circle
            </p>
            <p className="text-cream/70 mt-4 text-sm leading-7">
              Telegram is the confirmed home for reading prompts, discussion,
              and cycle updates.
            </p>
            <LinkButton
              href={siteConfig.telegramUrl}
              external
              variant="inverse"
              className="mt-5"
            >
              Open Telegram
              <ArrowIcon />
            </LinkButton>
          </div>
        </div>

        <div className="text-cream/55 flex flex-col gap-4 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Read & Revive / አንባቢ.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-cream hover:underline">
              Privacy
            </Link>
            <Link
              href="/community-guidelines"
              className="hover:text-cream hover:underline"
            >
              Community guidelines
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
