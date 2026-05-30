import type { Recommendation } from "@/data/sampleRecommendations";

export const SAVED_BOOKS_STORAGE_KEY = "bokhyllan:saved-books";

export type SavedBook = Pick<
  Recommendation,
  "id" | "title" | "author" | "coverImage" | "emotionalDescriptor"
>;

function isSavedBook(value: unknown): value is SavedBook {
  if (!value || typeof value !== "object") {
    return false;
  }

  const book = value as Record<string, unknown>;

  return (
    typeof book.id === "string" &&
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    typeof book.coverImage === "string" &&
    typeof book.emotionalDescriptor === "string"
  );
}

export function readSavedBooks(): SavedBook[] {
  try {
    const stored = window.localStorage.getItem(SAVED_BOOKS_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed.filter(isSavedBook) : [];
  } catch {
    return [];
  }
}

function writeSavedBooks(books: SavedBook[]) {
  window.localStorage.setItem(SAVED_BOOKS_STORAGE_KEY, JSON.stringify(books));
}

export function saveBook(recommendation: Recommendation) {
  const savedBooks = readSavedBooks();

  if (savedBooks.some((book) => book.id === recommendation.id)) {
    return savedBooks;
  }

  const nextBooks = [
    ...savedBooks,
    {
      id: recommendation.id,
      title: recommendation.title,
      author: recommendation.author,
      coverImage: recommendation.coverImage,
      emotionalDescriptor: recommendation.emotionalDescriptor,
    },
  ];

  writeSavedBooks(nextBooks);
  return nextBooks;
}

export function removeSavedBook(bookId: string) {
  const nextBooks = readSavedBooks().filter((book) => book.id !== bookId);
  writeSavedBooks(nextBooks);
  return nextBooks;
}

export function isBookSaved(bookId: string) {
  return readSavedBooks().some((book) => book.id === bookId);
}
