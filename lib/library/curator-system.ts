import type { Book } from "@/lib/library/book";
import type { Curator } from "@/lib/library/curator";
import type {
  RecommendationConfidence,
  RecommendationReason,
} from "@/lib/library/recommendation";

export type CuratorBookScore = {
  curatorId: string;
  bookId: string;
  score: number;
  matchedGenres: string[];
  matchedTasteTags: string[];
  avoidedGenreMatches: string[];
};

export type CreateRecommendationReasonOptions = {
  matchedNeeds?: string[];
  curatorId?: string;
  confidence?: RecommendationConfidence;
};

export type TopCuratorsByBook = Record<string, CuratorBookScore[]>;

export function getCuratorsForBook(book: Book, curators: Curator[]): Curator[] {
  const curatorScores = curators
    .map((curator) => ({
      curator,
      score: scoreCuratorForBook(book, curator),
    }))
    .filter(({ score }) => score.score > 0 && score.avoidedGenreMatches.length === 0)
    .sort((left, right) => compareCuratorScores(left.score, right.score));

  return curatorScores.map(({ curator }) => curator);
}

export function scoreCuratorForBook(
  book: Book,
  curator: Curator,
): CuratorBookScore {
  const matchedGenres = getOverlaps(book.genres, curator.preferredGenres);
  const matchedTasteTags = getOverlaps(
    [...book.tags, ...book.themes],
    curator.tasteTags,
  );
  const avoidedGenreMatches = getOverlaps(book.genres, curator.avoidedGenres ?? []);

  return {
    curatorId: curator.id,
    bookId: book.id,
    score: matchedGenres.length * 2 + matchedTasteTags.length,
    matchedGenres,
    matchedTasteTags,
    avoidedGenreMatches,
  };
}

export function createRecommendationReasonForBook(
  book: Book,
  options: CreateRecommendationReasonOptions = {},
): RecommendationReason {
  const matchedNeeds = options.matchedNeeds ?? deriveMatchedNeeds(book);

  return {
    bookId: book.id,
    reason: createReasonText(book, matchedNeeds),
    matchedNeeds,
    confidence: options.confidence,
    curatorId: options.curatorId,
  };
}

export function getTopCuratorsForBooks(
  books: Book[],
  curators: Curator[],
  limit = 3,
): TopCuratorsByBook {
  return books.reduce<TopCuratorsByBook>((result, book) => {
    result[book.id] = curators
      .map((curator) => scoreCuratorForBook(book, curator))
      .filter((score) => score.score > 0 && score.avoidedGenreMatches.length === 0)
      .sort(compareCuratorScores)
      .slice(0, limit);

    return result;
  }, {});
}

function compareCuratorScores(left: CuratorBookScore, right: CuratorBookScore) {
  if (right.score !== left.score) {
    return right.score - left.score;
  }

  return left.curatorId.localeCompare(right.curatorId);
}

function deriveMatchedNeeds(book: Book) {
  return uniqueStrings([...book.themes, ...book.tags, book.mood]);
}

function createReasonText(book: Book, matchedNeeds: string[]) {
  const needsText =
    matchedNeeds.length > 0 ? matchedNeeds.join(", ") : "general library fit";

  return `Book ${book.id} matches: ${needsText}.`;
}

function getOverlaps(leftValues: string[], rightValues: string[]) {
  const rightSet = new Set(rightValues.map(normalizeValue));

  return uniqueStrings(
    leftValues.filter((value) => rightSet.has(normalizeValue(value))),
  );
}

function uniqueStrings(values: string[]) {
  return Array.from(
    values.reduce<Map<string, string>>((result, value) => {
      const normalizedValue = normalizeValue(value);

      if (normalizedValue && !result.has(normalizedValue)) {
        result.set(normalizedValue, value);
      }

      return result;
    }, new Map()),
  ).map(([, value]) => value);
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}
