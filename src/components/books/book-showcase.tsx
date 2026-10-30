"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { ArrowIcon, LinkButton } from "@/components/ui/button";
import type { MockBook } from "@/lib/content-types";
import { assets } from "@/lib/assets";
import "./book-showcase.css";

const spineColors = {
  charcoal: { background: "#d39a21", color: "#17150e" },
  paper: { background: "#eee7d4", color: "#26251e" },
  orange: { background: "#9c421e", color: "#fff5e7" },
} as const;

export function BookShowcase({
  books,
  currentBook,
  cycleSlug,
}: {
  books: readonly MockBook[];
  currentBook: MockBook;
  cycleSlug: string;
}) {
  const otherBooks = books
    .filter((book) => book.slug !== currentBook.slug)
    .sort((a, b) => Number(b.status === "completed-cycle") - Number(a.status === "completed-cycle"))
    .slice(0, 4);
  const middle = Math.ceil(otherBooks.length / 2);
  const shelfBooks = [...otherBooks.slice(0, middle), currentBook, ...otherBooks.slice(middle)];
  const [selectedSlug, setSelectedSlug] = useState(currentBook.slug);
  const [notesOpen, setNotesOpen] = useState(false);
  const bookButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedBook = shelfBooks.find((book) => book.slug === selectedSlug) ?? currentBook;

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
    <div className="book-showcase">
      <p className="book-showcase-hint">
        <span className="book-showcase-hint-desktop">Hover to discover. Click to open.</span>
        <span className="book-showcase-hint-touch">Tap a book. Find your next idea.</span>
      </p>
      <div className="book-showcase-stage">
        <Image src={assets.books.sparks} alt="" width={178} height={88} className="book-showcase-sparks" />
        <div className="book-showcase-row" role="group" aria-label="Choose a book to explore">
          {shelfBooks.map((book, index) => {
            const isSelected = selectedBook.slug === book.slug;
            const colors = spineColors[book.coverTone];
            return (
              <button
                key={book.slug}
                ref={(node) => { bookButtons.current[index] = node; }}
                type="button"
                className="book-showcase-book"
                data-selected={isSelected}
                data-current={book.slug === currentBook.slug}
                style={{ "--spine-color": colors.background, "--spine-ink": colors.color, "--book-order": index } as CSSProperties}
                aria-label={`Open reading notes for ${book.title} by ${book.author}${book.slug === currentBook.slug ? ", current reading cycle" : ""}`}
                aria-pressed={isSelected}
                aria-controls="book-showcase-notes"
                aria-expanded={isSelected && notesOpen}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") selectBook(book); }}
                onFocus={() => selectBook(book)}
                onKeyDown={(event) => navigateShelf(event, index)}
                onClick={() => { selectBook(book); setNotesOpen(true); }}
              >
                <span className="book-showcase-volume" aria-hidden="true">
                  <span className="book-showcase-pages" />
                  <span className="book-showcase-front">
                    {book.coverImage ? (
                      <Image src={book.coverImage.src} alt="" fill sizes="(max-width: 639px) 150px, 220px" className="object-cover" priority={book.slug === currentBook.slug} />
                    ) : (
                      <span className="book-showcase-cover-fallback"><strong>{book.title}</strong><span>{book.author}</span></span>
                    )}
                  </span>
                </span>
                <span className="book-showcase-spine" aria-hidden="true">
                  <span>{book.title}</span>
                  <small>{book.author}</small>
                </span>
                {book.slug === currentBook.slug ? <span className="book-showcase-current" aria-hidden="true">Reading now</span> : null}
              </button>
            );
          })}
        </div>
        <div className="book-showcase-shelf" aria-hidden="true" />
      </div>

      <div className="book-showcase-caption" key={selectedBook.slug}>
        <p className="book-showcase-category">{selectedBook.status === "current" ? "The book in the circle now" : selectedBook.category}</p>
        <h2 className="font-display">{selectedBook.title}</h2>
        <p className="book-showcase-author">by {selectedBook.author}</p>
        <p className="book-showcase-description">{selectedBook.description}</p>
        <div className="book-showcase-actions">
          <button type="button" className="book-showcase-notes-toggle" aria-expanded={notesOpen} aria-controls="book-showcase-notes" onClick={() => setNotesOpen(!notesOpen)}>
            {notesOpen ? "Close reading notes" : "Open reading notes"} <span aria-hidden="true">{notesOpen ? "−" : "+"}</span>
          </button>
          <LinkButton href={`/books/${selectedBook.slug}`} variant="ghost">Explore this book <ArrowIcon /></LinkButton>
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
