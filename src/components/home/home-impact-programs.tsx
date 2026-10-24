"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeImpactStat, HomeProgram } from "@/lib/content-types";

function AnimatedMetric({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = counterRef.current;
    if (!node) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    let observer: IntersectionObserver | undefined;

    const animate = () => {
      if (started) return;
      started = true;
      if (motionPreference.matches) {
        setCount(value);
        return;
      }

      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate();
            observer?.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      observer.observe(node);
    } else {
      animate();
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={counterRef} className="font-display text-4xl font-semibold tabular-nums sm:text-5xl" aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{count}{suffix}</span>
    </span>
  );
}

function PencilDoodle() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="h-8 w-8 text-brand-orange">
      <path d="m9 29 16-19 5 4-16 19-7 2 2-6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m22 13 5 4M8 30l5 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function HomeImpactStats({ stats }: { stats: readonly HomeImpactStat[] }) {
  return (
    <section className="home-impact relative overflow-hidden bg-white px-4 py-8 sm:px-6 lg:py-10" aria-label="Read and Revive at a glance">
      <Container className="relative">
        <svg className="home-impact-thread" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M8 75C150 30 248 2 385 20c110 15-36 58 64 75 114 20 212-23 342-32 139-10 244 10 401 20" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <div className="relative z-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="home-impact-stat flex flex-col items-center text-center">
              <AnimatedMetric value={stat.value} suffix={stat.suffix} />
              <span className="mt-1 max-w-32 font-note text-lg leading-tight text-brand-orange-deep sm:text-xl">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="home-impact-pencil" aria-hidden="true"><PencilDoodle /></div>
      </Container>
    </section>
  );
}

export function HomePrograms({ programs }: { programs: readonly HomeProgram[] }) {
  return (
      <section className="home-programs bg-[#fff0e8] py-14 sm:py-16">
        <Container>
          <SectionHeader
            eyebrow="Get involved"
            title="Programs and Workshops"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
            {programs.map((program) => (
              <article key={program.title} className="home-program-card flex min-h-52 flex-col border border-brand-orange/45 bg-white p-5 sm:p-6">
                <span className="home-program-category self-start rounded-full bg-brand-orange px-3 py-1 font-note text-sm leading-none text-white">{program.category}</span>
                <h3 className="font-display mt-4 text-2xl font-semibold leading-tight">{program.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/75">{program.description}</p>
                {program.status === "open" ? (
                  <LinkButton href={program.href} variant="ghost" className="mt-auto self-end px-0 pt-4 text-sm text-brand-orange-deep">
                    {program.action} <ArrowIcon />
                  </LinkButton>
                ) : (
                  <span className="mt-auto self-end px-0 pt-4 text-sm font-semibold text-ink/55" aria-label={`${program.title}: closed`}>
                    {program.action} <span aria-hidden="true">←</span>
                  </span>
                )}
              </article>
            ))}
          </div>
        </Container>
        <div className="home-program-cta mt-12 bg-brand-orange px-5 py-9 text-center text-white sm:mt-14 sm:py-11">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready to Start Reading?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/90">Find your next book, meet thoughtful readers, and bring one good idea into the circle.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LinkButton href="/books" variant="inverse" size="sm">Explore Books</LinkButton>
            <LinkButton href="/community" variant="inverse" size="sm">Browse Community</LinkButton>
          </div>
        </div>
      </section>
  );
}
