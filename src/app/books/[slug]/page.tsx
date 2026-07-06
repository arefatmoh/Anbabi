import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BookDetailPage } from "@/components/books/book-detail-page";
import { getBookDetailContent, getBookSlugs } from "@/lib/content/repository";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getBookSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getBookDetailContent(slug);

  if (!content) return {};

  return {
    title: content.book.title,
    description: content.book.description,
    alternates: { canonical: `/books/${content.book.slug}` },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getBookDetailContent(slug);

  if (!content) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: content.book.title,
    author: {
      "@type": "Person",
      name: content.book.author,
    },
    inLanguage: content.book.language,
    url: `${siteConfig.siteUrl}/books/${content.book.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BookDetailPage {...content} />
    </>
  );
}
