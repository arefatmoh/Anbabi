import type { Metadata } from "next";

import {
  BooksListingPage,
  type BooksFilter,
} from "@/components/books/books-listing-page";
import { getBooksContent } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Explore books connected to Read & Revive reading cycles, reflections, and conversations.",
};

const validFilters = new Set<BooksFilter>([
  "all",
  "current",
  "focus",
  "habits",
  "purpose",
]);

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const [{ filter }, content] = await Promise.all([
    searchParams,
    getBooksContent(),
  ]);
  const activeFilter = validFilters.has(filter as BooksFilter)
    ? (filter as BooksFilter)
    : "all";

  return <BooksListingPage {...content} activeFilter={activeFilter} />;
}
