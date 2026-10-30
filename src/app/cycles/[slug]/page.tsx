import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CycleDetailPage } from "@/components/cycle/cycle-detail-page";
import {
  getCycleBySlug,
  getCycleSlugs,
  getVoices,
} from "@/lib/content/repository";

export async function generateStaticParams() {
  const slugs = await getCycleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cycle = await getCycleBySlug(slug);

  if (!cycle) return {};

  return {
    title: cycle.title,
    description: cycle.shortDescription,
  };
}

export default async function CyclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cycle, voices] = await Promise.all([
    getCycleBySlug(slug),
    getVoices(),
  ]);

  if (!cycle) notFound();

  return <CycleDetailPage cycle={cycle} voices={voices.filter((voice) => voice.relatedBookSlug === cycle.book.slug)} />;
}
