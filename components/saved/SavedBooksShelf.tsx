"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  readSavedBooks,
  removeSavedBook,
  type SavedBook,
} from "@/lib/savedBooks";

export function SavedBooksShelf() {
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSavedBooks(readSavedBooks());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!savedBooks) {
    return null;
  }

  if (savedBooks.length === 0) {
    return (
      <div className="max-w-xl border-t border-brass/30 pt-7">
        <p className="font-serif text-2xl leading-9 text-ink-soft">
          Inga böcker vilar här än.
        </p>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          När en bok känns värd att återvända till kan du låta den vila här.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center rounded-quiet text-base text-ink-soft underline decoration-brass/60 underline-offset-8 transition-colors duration-calm hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          Börja med en bok
        </Link>
      </div>
    );
  }

  return (
    <ul className="mt-10 grid gap-7 sm:grid-cols-2" aria-label="Sparade böcker">
      {savedBooks.map((book) => (
        <li
          key={book.id}
          className="grid grid-cols-[92px_1fr] gap-5 border-t border-brass/30 pt-5 sm:grid-cols-[104px_1fr]"
        >
          <Link
            href={`/recommend/reveal?id=${book.id}`}
            className="relative aspect-[0.68] overflow-hidden rounded-quiet bg-walnut-deep shadow-door ring-1 ring-brass/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            <Image
              src={book.coverImage}
              alt={`Omslag för ${book.title} av ${book.author}`}
              fill
              sizes="104px"
              className="object-cover"
            />
          </Link>
          <div className="flex min-w-0 flex-col items-start">
            <p className="font-serif text-xl italic leading-snug text-brass-muted">
              {book.emotionalDescriptor}
            </p>
            <Link
              href={`/recommend/reveal?id=${book.id}`}
              className="mt-2 font-serif text-3xl leading-tight text-ink transition-colors duration-calm hover:text-walnut focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            >
              {book.title}
            </Link>
            <p className="mt-1 text-sm text-ink-soft">av {book.author}</p>
            <button
              type="button"
              onClick={() => setSavedBooks(removeSavedBook(book.id))}
              className="mt-auto min-h-11 rounded-quiet pt-4 text-left text-sm text-ink-muted underline decoration-brass/40 underline-offset-4 transition-colors duration-calm hover:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            >
              Låt den lämna hyllan
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
