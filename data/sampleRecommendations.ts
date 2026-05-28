import { books, getBookById } from "@/data/library/books/books";
import type { Book } from "@/data/library/books/bookTypes";
import type { AffiliateLinkResult } from "@/lib/affiliate/affiliateTypes";

export type Recommendation = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  emotionalDescriptor: string;
  explanation: string;
  voiceNote?: string;
  practicalNotes?: string[];
  affiliateRequest?: Book["affiliateRequest"];
  affiliateLink?: AffiliateLinkResult;
};

const fallbackCoverImage = "/covers/book-placeholder.svg";

export function recommendationFromBook(book: Book): Recommendation {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    coverImage: book.coverImage ?? fallbackCoverImage,
    emotionalDescriptor: book.shortDescription,
    explanation: book.emotionalDescription,
    voiceNote: book.voiceNote,
    practicalNotes: book.practicalNotes,
    affiliateRequest: book.affiliateRequest,
  };
}

export const sampleRecommendation = recommendationFromBook(books[0]);

export const sampleRecommendations: Record<string, Recommendation> =
  Object.fromEntries(
    books.map((book) => [book.id, recommendationFromBook(book)]),
  );

export function getRecommendationById(id: string) {
  return recommendationFromBook(getBookById(id));
}
