import type { Book as RuntimeBook } from "@/data/library/books/bookTypes";
import type {
  Book,
  BookMood,
  BookPace,
} from "@/lib/library/book";

const supportedMoods: BookMood[] = [
  "still",
  "warm",
  "clear",
  "melancholic",
  "immersive",
  "hopeful",
  "dark",
  "restless",
  "tender",
  "other",
];

export function mapRuntimeBookToFoundationBook(book: RuntimeBook): Book {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    originalTitle: book.originalTitle,
    // The current curated corpus is Swedish-facing, but runtime books do not
    // carry language metadata yet. Keep this as a minimal validation default.
    language: "sv",
    firstPublishedYear: book.firstPublishedYear,
    isbn13: book.isbn13,
    genres: book.genres ?? [],
    tags: [
      ...book.emotionalTone,
      ...book.pacing,
      book.readingEnergy,
      book.lengthCategory,
    ],
    themes: [...book.readingState, ...book.emotionalEffects],
    mood: mapRuntimeMood(book),
    pace: mapRuntimePace(book),
    bokusUrl: book.bokusUrl,
    coverImageUrl: book.coverImage,
    description: book.shortDescription,
    enrichmentStatus: "published",
  };
}

export function mapRuntimeBooksToFoundationBooks(
  books: RuntimeBook[],
): Book[] {
  return books.map(mapRuntimeBookToFoundationBook);
}

function mapRuntimeMood(book: RuntimeBook): BookMood {
  if (isSupportedMood(book.atmosphere)) {
    return book.atmosphere;
  }

  for (const tone of book.emotionalTone) {
    if (isSupportedMood(tone)) {
      return tone;
    }
  }

  return "other";
}

function mapRuntimePace(book: RuntimeBook): BookPace | undefined {
  const primaryPace = book.pacing[0];

  switch (primaryPace) {
    case "slow":
    case "steady":
    case "absorbing":
    case "demanding":
      return primaryPace;
    case "lightweight":
      return "light";
    default:
      return undefined;
  }
}

function isSupportedMood(value: string): value is BookMood {
  return supportedMoods.includes(value as BookMood);
}
