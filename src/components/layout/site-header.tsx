"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNavigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
      {open ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="border-ink/10 bg-paper/95 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex min-h-[4.75rem] items-center justify-between gap-5">
        <BrandLogo />

        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNavigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "hover:bg-peach/65 focus-visible:outline-brand-orange inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-bold transition focus-visible:outline-3 focus-visible:outline-offset-2",
                      active && "bg-peach text-brand-orange-deep",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <LinkButton
            href={siteConfig.telegramUrl}
            external
            aria-label="Join the current reading cycle on Telegram"
          >
            Join Current Cycle
            <ArrowIcon />
          </LinkButton>
        </div>

        <button
          type="button"
          className="border-ink bg-cream focus-visible:outline-brand-orange inline-flex size-11 items-center justify-center rounded-xl border-2 shadow-[2px_2px_0_#111] focus-visible:outline-3 focus-visible:outline-offset-2 lg:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </Container>

      <div
        id="mobile-navigation"
        className={cn(
          "border-ink/10 bg-paper border-t lg:hidden",
          !menuOpen && "hidden",
        )}
      >
        <Container>
          <nav aria-label="Mobile navigation" className="py-5">
            <ul className="grid gap-1">
              {primaryNavigation.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "focus-visible:outline-brand-orange flex min-h-12 items-center rounded-xl px-4 font-bold focus-visible:outline-3 focus-visible:outline-offset-2",
                        active && "bg-peach text-brand-orange-deep",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <LinkButton
              href={siteConfig.telegramUrl}
              external
              className="mt-4 w-full"
            >
              Join Current Reading Cycle
              <ArrowIcon />
            </LinkButton>
          </nav>
        </Container>
      </div>
    </header>
  );
}
