import type { Book, LengthCategory } from "@/data/library/books/bookTypes";
import type { EmotionalEffect } from "@/data/library/taxonomy/emotions";
import type { ReadingPacing } from "@/data/library/taxonomy/pacing";
import type { ReadingState } from "@/data/library/taxonomy/readingStates";
import type {
  BookAtmosphere,
  EmotionalTone,
} from "@/data/library/taxonomy/tones";
import type { BookCandidate } from "@/lib/library-import/candidate/bookCandidate";
import type { BookEnrichmentDraft } from "@/lib/library-import/enrichment/bookEnrichmentDraft";
import type { BookMetadata } from "@/lib/library-import/metadata/bookMetadata";
import type { LibraryImportRecord } from "@/lib/library-import/review/importRecord";

const placeholderReadingState: ReadingState[] = ["ready_for_depth"];
const placeholderEmotionalTone: EmotionalTone[] = ["still"];
const placeholderEmotionalEffects: EmotionalEffect[] = ["opens_perspective"];
const placeholderPacing: ReadingPacing[] = ["steady"];
const placeholderAtmosphere: BookAtmosphere = "still";

export function createCandidateRecord(
  candidate: BookCandidate,
): LibraryImportRecord {
  return {
    status: "candidate",
    candidate,
    updatedAt: candidate.createdAt,
  };
}

export function createMetadataFromCandidate(
  candidate: BookCandidate,
  metadata?: Partial<BookMetadata>,
): BookMetadata {
  return {
    title: metadata?.title ?? candidate.title,
    author: metadata?.author ?? candidate.author,
    isbn: metadata?.isbn ?? candidate.isbn,
    publicationYear: metadata?.publicationYear,
    coverImage: metadata?.coverImage,
    pageCount: metadata?.pageCount,
    language: metadata?.language,
    description: metadata?.description,
  };
}

export function createMetadataRecord(
  record: LibraryImportRecord,
  metadata?: Partial<BookMetadata>,
): LibraryImportRecord {
  return {
    ...record,
    status: "metadata_ready",
    metadata: createMetadataFromCandidate(record.candidate, metadata),
    updatedAt: new Date().toISOString(),
  };
}

export function createEnrichmentDraftFromMetadata(
  metadata: BookMetadata,
  draft?: Partial<Omit<BookEnrichmentDraft, "metadata">>,
): BookEnrichmentDraft {
  return {
    metadata,
    readingState: draft?.readingState ?? placeholderReadingState,
    readingEnergy: draft?.readingEnergy ?? "medium",
    emotionalTone: draft?.emotionalTone ?? placeholderEmotionalTone,
    atmosphere: draft?.atmosphere ?? placeholderAtmosphere,
    emotionalEffects: draft?.emotionalEffects ?? placeholderEmotionalEffects,
    pacing: draft?.pacing ?? placeholderPacing,
    emotionalDescription: draft?.emotionalDescription,
    curatorConnection: draft?.curatorConnection,
    voiceNote: draft?.voiceNote,
  };
}

export function createEnrichmentRecord(
  record: LibraryImportRecord,
  draft?: Partial<Omit<BookEnrichmentDraft, "metadata">>,
): LibraryImportRecord {
  if (!record.metadata) {
    throw new Error("Metadata is required before enrichment.");
  }

  return {
    ...record,
    status: "enrichment_ready",
    enrichmentDraft: createEnrichmentDraftFromMetadata(record.metadata, draft),
    updatedAt: new Date().toISOString(),
  };
}

export function approveImportRecord(
  record: LibraryImportRecord,
): LibraryImportRecord {
  if (!record.enrichmentDraft) {
    throw new Error("Enrichment draft is required before approval.");
  }

  return {
    ...record,
    status: "approved",
    updatedAt: new Date().toISOString(),
  };
}

export function createCuratedBookFromEnrichmentDraft(
  draft: BookEnrichmentDraft,
): Book {
  return {
    id: createBookId(draft.metadata.title, draft.metadata.author),
    title: draft.metadata.title,
    author: draft.metadata.author,
    coverImage: draft.metadata.coverImage,
    shortDescription: createShortDescription(draft),
    emotionalDescription:
      draft.emotionalDescription ?? "Curator description pending review.",
    curatorConnection:
      draft.curatorConnection ?? "Curator connection pending review.",
    voiceNote: draft.voiceNote,
    practicalNotes: createPracticalNotes(draft.metadata),
    emotionalTone: draft.emotionalTone,
    readingState: draft.readingState,
    pacing: draft.pacing,
    emotionalEffects: draft.emotionalEffects,
    readingEnergy: draft.readingEnergy,
    lengthCategory: getLengthCategory(draft.metadata.pageCount),
    atmosphere: draft.atmosphere,
    affiliateRequest: {
      retailer: "bokus",
      isbn: draft.metadata.isbn,
      title: draft.metadata.title,
      author: draft.metadata.author,
    },
  };
}

export function publishImportRecord(record: LibraryImportRecord): {
  record: LibraryImportRecord;
  book: Book;
} {
  if (!record.enrichmentDraft) {
    throw new Error("Enrichment draft is required before publishing.");
  }

  return {
    record: {
      ...record,
      status: "published",
      updatedAt: new Date().toISOString(),
    },
    book: createCuratedBookFromEnrichmentDraft(record.enrichmentDraft),
  };
}

function createBookId(title: string, author: string) {
  return `${title}-${author}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createShortDescription(draft: BookEnrichmentDraft) {
  return draft.emotionalDescription?.split(".")[0] || "Curator draft pending.";
}

function createPracticalNotes(metadata: BookMetadata) {
  const notes: string[] = [];

  if (metadata.pageCount) {
    notes.push(`ca ${metadata.pageCount} sidor`);
  }

  if (metadata.language) {
    notes.push(`sprak: ${metadata.language}`);
  }

  return notes.length > 0 ? notes : undefined;
}

function getLengthCategory(pageCount?: number): LengthCategory {
  if (!pageCount) {
    return "medium";
  }

  if (pageCount < 220) {
    return "short";
  }

  if (pageCount > 420) {
    return "long";
  }

  return "medium";
}
