"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ArrowIcon } from "@/components/ui/button";
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

function HeaderActions({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <div className={cn("header-actions", className)}>
      <button
        type="button"
        disabled
        title="Member sign-in is not connected yet"
        aria-label="Log in (member sign-in is not available yet)"
        className="header-action header-action-login"
      >
        Log in
      </button>
      <a
        href={siteConfig.telegramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Become a member on Telegram"
        onClick={onNavigate}
        className="header-action header-action-member group"
      >
        Become a member
        <span className="text-brand-orange" aria-hidden="true"><ArrowIcon /></span>
      </a>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={cn("bg-paper/95 sticky top-0 z-50 border-b backdrop-blur-md", isHome ? "border-transparent" : "border-ink/10")}>
      <Container className={cn("flex min-h-[4.75rem] items-center justify-between gap-5", isHome && "lg:min-h-[6.25rem]")}>
        <BrandLogo />

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-4 xl:gap-6 2xl:gap-8">
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
                      "hover:bg-peach/65 focus-visible:outline-brand-orange inline-flex min-h-11 items-center whitespace-nowrap rounded-xl px-2 text-base font-bold transition focus-visible:outline-3 focus-visible:outline-offset-2",
                      isHome && "font-display rounded-none hover:bg-transparent hover:underline hover:decoration-brand-orange hover:decoration-2 hover:underline-offset-4",
                      active && (isHome ? "underline decoration-brand-orange decoration-2 underline-offset-4" : "bg-peach text-brand-orange-deep"),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden xl:block">
          <HeaderActions />
        </div>

        <button
          type="button"
          className="border-ink bg-cream focus-visible:outline-brand-orange inline-flex size-11 items-center justify-center rounded-xl border-2 shadow-[2px_2px_0_#111] focus-visible:outline-3 focus-visible:outline-offset-2 xl:hidden"
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
          "border-ink/10 bg-paper border-t xl:hidden",
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
            <HeaderActions className="header-actions-mobile" onNavigate={() => setMenuOpen(false)} />
          </nav>
        </Container>
      </div>
    </header>
  );
}
