import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailPage } from "@/components/voices/article-detail-page";
import {
  getCurrentCycleContent,
  getVoiceBySlug,
  getVoiceSlugs,
  getVoices,
} from "@/lib/content/repository";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getVoiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getVoiceBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/voices/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function VoiceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, voices, cycleContent] = await Promise.all([
    getVoiceBySlug(slug),
    getVoices(),
    getCurrentCycleContent(),
  ]);

  if (!article) notFound();

  const relatedVoices = voices.filter((voice) => voice.slug !== article.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    isPartOf: {
      "@type": "CreativeWorkSeries",
      name: "Voices from the Circle",
      url: `${siteConfig.siteUrl}/voices`,
    },
    mainEntityOfPage: `${siteConfig.siteUrl}/voices/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ArticleDetailPage
        article={article}
        currentCycle={cycleContent.currentCycle}
        relatedVoices={relatedVoices}
      />
    </>
  );
}
