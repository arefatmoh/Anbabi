import Link from "next/link";

import { BookCoverPlaceholder } from "@/components/cycle/book-cover-placeholder";
import { Chip } from "@/components/ui/chip";
import type { MockBook } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export function BookCard({
  book,
  relatedVoices = 0,
  className,
}: {
  book: MockBook;
  relatedVoices?: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "border-ink bg-cream group relative rounded-[1.75rem] border-2 p-5 shadow-[4px_4px_0_#111]",
        className,
      )}
    >
      <div className="bg-paper paper-grain relative overflow-hidden rounded-[1.35rem] p-6">
        <BookCoverPlaceholder
          book={book}
          className="duration-standard max-w-44 transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:-rotate-1"
        />
      </div>
      <div className="pt-6">
        <div className="flex flex-wrap gap-2">
          <Chip tone={book.status === "current" ? "success" : "paper"}>
            {book.statusLabel}
          </Chip>
          <Chip>{book.category}</Chip>
        </div>
        <h2 className="font-display mt-4 text-3xl leading-tight font-semibold tracking-tight">
          <Link
            href={`/books/${book.slug}`}
            className="focus-visible:outline-brand-orange rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4"
          >
            {book.title}
          </Link>
        </h2>
        <p className="text-ink/60 mt-1 text-sm">by {book.author}</p>
        <p className="text-ink/72 mt-4 line-clamp-3 text-sm leading-7">
          {book.description}
        </p>
        <div className="text-ink/55 mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <span>{book.readingTime}</span>
          {relatedVoices > 0 ? (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {relatedVoices} {relatedVoices === 1 ? "Voice" : "Voices"}
              </span>
            </>
          ) : null}
        </div>
        <Link
          href={`/books/${book.slug}`}
          className="text-brand-orange-deep focus-visible:outline-brand-orange mt-5 inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-4 focus-visible:rounded focus-visible:outline-3"
        >
          Explore this book →
        </Link>
      </div>
    </article>
  );
}
