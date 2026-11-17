"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import type { MockBook } from "@/lib/content-types";
import { assets } from "@/lib/assets";
import "./book-showcase.css";

const spineColors = {
  charcoal: { background: "#d39a21", color: "#17150e" },
  paper: { background: "#eee7d4", color: "#26251e" },
  orange: { background: "#9c421e", color: "#fff5e7" },
} as const;

const bookSpines: Record<string, { background: string; color: string }> = {
  "animal-farm": { background: "#8f3222", color: "#fff4dc" },
  "eat-that-frog": { background: "#d69c23", color: "#201704" },
  "who-moved-my-cheese": { background: "#d9c9aa", color: "#342b21" },
  "the-productive-muslim": { background: "#dba426", color: "#291900" },
  "atomic-habits": { background: "#879071", color: "#fff8e8" },
  "deep-work": { background: "#e5aa28", color: "#1a150c" },
  "the-daily-stoic": { background: "#293b45", color: "#fff4dd" },
  "the-courage-to-be-disliked": { background: "#788363", color: "#fff4dd" },
  "the-art-of-thinking-clearly": { background: "#d9cbb2", color: "#33291d" },
  "dopamine-nation": { background: "#a55239", color: "#fff4dd" },
  "digital-minimalism": { background: "#263943", color: "#fff4dd" },
  "the-psychology-of-money": { background: "#d7c3a7", color: "#33291d" },
  essentialism: { background: "#984b32", color: "#fff4dd" },
};

const shelfCategories = ["All books", "Productivity", "Fiction", "Personal Growth", "Faith & Growth"] as const;
type ShelfCategory = (typeof shelfCategories)[number];
const shelfOrder = ["atomic-habits", "the-daily-stoic", "eat-that-frog", "who-moved-my-cheese", "the-courage-to-be-disliked", "the-psychology-of-money", "the-productive-muslim", "the-art-of-thinking-clearly", "dopamine-nation", "digital-minimalism", "deep-work", "essentialism"];
const faceOutBooks = new Set(["eat-that-frog", "the-productive-muslim"]);
const stackBookSlugs = ["the-psychology-of-money", "essentialism"];

function inCategory(book: MockBook, category: ShelfCategory) {
  if (category === "All books") return true;
  return book.category.toLowerCase() === category.toLowerCase() ||
    book.themes.some((theme) => theme.toLowerCase() === category.toLowerCase());
}

export function BookShowcase({
  books,
  currentBook,
  cycleSlug,
}: {
  books: readonly MockBook[];
  currentBook: MockBook;
  cycleSlug: string;
}) {
  const [category, setCategory] = useState<ShelfCategory>("All books");
  const categoryBooks = books.filter((book) => inCategory(book, category));
  const otherBooks = categoryBooks
    .filter((book) => book.slug !== currentBook.slug)
    .sort((a, b) => {
      const aIndex = shelfOrder.indexOf(a.slug);
      const bIndex = shelfOrder.indexOf(b.slug);
      return (aIndex < 0 ? shelfOrder.length : aIndex) - (bIndex < 0 ? shelfOrder.length : bIndex);
    });
  const hasStackCandidates = category === "All books" && stackBookSlugs.every((slug) => otherBooks.some((book) => book.slug === slug));
  const middle = Math.max(0, Math.ceil(otherBooks.length / 2) - (hasStackCandidates ? 3 : 0));
  const arrangedBooks = categoryBooks.some((book) => book.slug === currentBook.slug)
    ? [...otherBooks.slice(0, middle), currentBook, ...otherBooks.slice(middle)]
    : otherBooks;
  const stackBooks = category === "All books"
    ? stackBookSlugs.map((slug) => arrangedBooks.find((book) => book.slug === slug)).filter((book): book is MockBook => Boolean(book))
    : [];
  const hasStack = stackBooks.length === stackBookSlugs.length;
  const standingBooks = hasStack ? arrangedBooks.filter((book) => !stackBookSlugs.includes(book.slug)) : arrangedBooks;
  const shelfBooks = hasStack ? [...stackBooks, ...standingBooks] : standingBooks;
  const [selectedSlug, setSelectedSlug] = useState(currentBook.slug);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const bookButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const shelfViewport = useRef<HTMLDivElement>(null);
  const selectedBook = shelfBooks.find((book) => book.slug === selectedSlug) ?? shelfBooks[0];

  useEffect(() => {
    const viewport = shelfViewport.current;
    const selected = viewport?.querySelector<HTMLElement>('[data-selected="true"]');
    if (viewport && selected) {
      viewport.scrollLeft += selected.getBoundingClientRect().left + selected.offsetWidth / 2 - (viewport.getBoundingClientRect().left + viewport.clientWidth / 2);
    }
  }, [category]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      const viewport = shelfViewport.current;
      const selected = viewport?.querySelector<HTMLElement>('[data-selected="true"]');
      if (!viewport || !selected) return;
      const bounds = viewport.getBoundingClientRect();
      const bookBounds = selected.getBoundingClientRect();
      const offset = bookBounds.left < bounds.left + 8
        ? bookBounds.left - bounds.left - 8
        : bookBounds.right > bounds.right - 8
          ? bookBounds.right - bounds.right + 8
          : 0;
      if (offset) viewport.scrollTo({ left: viewport.scrollLeft + offset, behavior: reduceMotion ? "auto" : "smooth" });
    }, reduceMotion ? 0 : 720);
    return () => window.clearTimeout(timer);
  }, [selectedSlug]);

  function chooseCategory(next: ShelfCategory) {
    const filtered = books.filter((book) => inCategory(book, next));
    const nextBook = filtered.find((book) => book.slug === currentBook.slug) ?? filtered[0];
    if (!nextBook) return;
    setCategory(next);
    setSelectedSlug(nextBook.slug);
    setPreviewSlug(null);
    setNotesOpen(false);
  }

  function selectBook(book: MockBook) {
    if (book.slug !== selectedSlug) setNotesOpen(false);
    setSelectedSlug(book.slug);
  }

  function navigateShelf(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % shelfBooks.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + shelfBooks.length) % shelfBooks.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = shelfBooks.length - 1;
    else return;
    event.preventDefault();
    selectBook(shelfBooks[next]);
    bookButtons.current[next]?.focus();
  }

  return (
    <div className="book-showcase" style={{ "--books-oak": `url(${assets.textures.oakBookshelf})` } as CSSProperties}>
      <p className="book-showcase-hint">
        <span className="book-showcase-hint-desktop">Hover to discover. Click to select.</span>
        <span className="book-showcase-hint-touch">Swipe the shelf. Tap a book to select it.</span>
      </p>
      <div className="book-showcase-stage">
        <div className="book-showcase-viewport" ref={shelfViewport}>
        <div className="book-showcase-row" role="group" aria-label="Choose a book to explore">
          {hasStack ? (
            <div className="book-showcase-stack" aria-label="Books stacked on the shelf">
              {stackBooks.map((book, index) => {
                const colors = bookSpines[book.slug] ?? spineColors[book.coverTone];
                return (
                  <button
                    key={book.slug}
                    ref={(node) => { bookButtons.current[index] = node; }}
                    type="button"
                    className="book-showcase-stack-book"
                    data-selected={selectedBook.slug === book.slug}
                    style={{ "--spine-color": colors.background, "--spine-ink": colors.color } as CSSProperties}
                    aria-label={`Select ${book.title} by ${book.author}`}
                    aria-pressed={selectedBook.slug === book.slug}
                    onFocus={() => setPreviewSlug(book.slug)}
                    onBlur={() => setPreviewSlug(null)}
                    onKeyDown={(event) => navigateShelf(event, index)}
                    onClick={() => selectBook(book)}
                  >
                    <span>{book.title}</span><small>{book.author}</small>
                  </button>
                );
              })}
            </div>
          ) : null}
          {standingBooks.map((book) => {
            const index = shelfBooks.findIndex((item) => item.slug === book.slug);
            const isSelected = selectedBook.slug === book.slug;
            const colors = bookSpines[book.slug] ?? spineColors[book.coverTone];
            return (
              <button
                key={book.slug}
                ref={(node) => { bookButtons.current[index] = node; }}
                type="button"
                className="book-showcase-book"
                data-selected={isSelected}
                data-previewed={previewSlug === book.slug}
                data-current={book.slug === currentBook.slug}
                data-featured={faceOutBooks.has(book.slug)}
                style={{ "--spine-color": colors.background, "--spine-ink": colors.color, "--book-order": index, "--height-factor": [0.91, 1.02, 0.95, 1.05, 0.97][index % 5], "--spine-factor": [0.92, 1.07, 0.85, 1.12][index % 4], "--book-lean": ["-2deg", "1deg", "-1deg", "2deg", "0deg"][index % 5] } as CSSProperties}
                aria-label={`Select ${book.title} by ${book.author}${book.slug === currentBook.slug ? ", current reading cycle" : ""}`}
                aria-pressed={isSelected}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setPreviewSlug(book.slug); }}
                onPointerLeave={(event) => { if (event.pointerType === "mouse") setPreviewSlug(null); }}
                onFocus={() => setPreviewSlug(book.slug)}
                onBlur={() => setPreviewSlug(null)}
                onKeyDown={(event) => navigateShelf(event, index)}
                onClick={() => selectBook(book)}
              >
                <span className="book-showcase-contact" aria-hidden="true" />
                <span className="book-showcase-volume" aria-hidden="true">
                  <span className="book-showcase-pages" />
                  <span className="book-showcase-cover-edge" />
                  <span className="book-showcase-front">
                    {book.coverImage ? (
                      <Image src={book.coverImage.src} alt="" fill sizes="(max-width: 639px) 150px, 220px" className="object-contain" priority={book.slug === currentBook.slug} />
                    ) : (
                      <span className="book-showcase-cover-fallback"><strong>{book.title}</strong><span>{book.author}</span></span>
                    )}
                  </span>
                </span>
                <span className="book-showcase-spine" aria-hidden="true">
                  <span>{book.title}</span>
                  <small>{book.author}</small>
                </span>
                {book.slug === currentBook.slug || isSelected ? <span className="book-showcase-current" aria-hidden="true">{book.slug === currentBook.slug ? "Reading now" : "Selected"}</span> : null}
              </button>
            );
          })}
        </div>
        </div>
        <div className="book-showcase-shelf" aria-hidden="true" />
      </div>

      <div className="book-showcase-filters" role="group" aria-label="Filter the shelf by category">
        {shelfCategories.filter((item) => books.some((book) => inCategory(book, item))).map((item) => (
          <button key={item} type="button" aria-pressed={category === item} onClick={() => chooseCategory(item)}>{item}</button>
        ))}
      </div>

      <div className="book-showcase-caption" key={selectedBook.slug}>
        <div className="book-showcase-caption-cover" aria-hidden="true">
          {selectedBook.coverImage ? <Image src={selectedBook.coverImage.src} alt="" fill sizes="(max-width: 639px) 80px, 120px" className="object-contain" loading="eager" /> : null}
        </div>
        <div className="book-showcase-caption-copy">
        <p className="book-showcase-category">{selectedBook.status === "current" ? "The book in the circle now" : selectedBook.category}</p>
        <h2 className="font-display">{selectedBook.title}</h2>
        <p className="book-showcase-author">by {selectedBook.author}</p>
        <p className="book-showcase-description">{selectedBook.description}</p>
        </div>
        <div className="book-showcase-actions">
          <LinkButton href={`/books/${selectedBook.slug}`} className="book-showcase-primary">Explore book <ArrowIcon /></LinkButton>
          <button type="button" className="book-showcase-notes-toggle" aria-expanded={notesOpen} aria-controls="book-showcase-notes" onClick={() => setNotesOpen(!notesOpen)}>
            {notesOpen ? "Close reading notes" : "Open reading notes"} <span aria-hidden="true">{notesOpen ? "−" : "+"}</span>
          </button>
          {selectedBook.slug === currentBook.slug ? <LinkButton href={`/cycles/${cycleSlug}`} variant="ghost">View current cycle <ArrowIcon /></LinkButton> : null}
        </div>
      </div>

      <div id="book-showcase-notes" className="book-showcase-notes" hidden={!notesOpen}>
        <div className="book-showcase-spread" key={selectedBook.slug}>
          <div className="book-showcase-note-page book-showcase-note-left">
            <span className="book-showcase-page-label">Inside the circle</span>
            <h3 className="font-display">Why this book?</h3>
            <p>{selectedBook.whyFeatured}</p>
            <span className="book-showcase-page-number" aria-hidden="true">01</span>
          </div>
          <div className="book-showcase-note-page book-showcase-note-right">
            <span className="book-showcase-page-label">A question to carry</span>
            <p className="book-showcase-prompt font-display">{selectedBook.discussionPrompts[0]}</p>
            <p className="book-showcase-prompt-credit">A reading prompt from Read &amp; Revive</p>
            <span className="book-showcase-page-number" aria-hidden="true">02</span>
          </div>
        </div>
      </div>
    </div>
  );
}
