import type { Book } from "@/lib/library/book";
import type {
  EnrichmentDraft,
  EnrichmentSource,
} from "@/lib/library/enrichment";

export type CreateEnrichmentDraftOptions = {
  version?: number;
  source?: EnrichmentSource;
  now?: string;
};

export type EnrichmentDraftTransitionOptions = {
  now?: string;
  reason?: string;
  warnings?: string[];
};

export function createPendingEnrichmentDraft(
  book: Book,
  options: CreateEnrichmentDraftOptions = {},
): EnrichmentDraft {
  const version = options.version ?? 1;
  const now = options.now ?? new Date().toISOString();

  return {
    id: createEnrichmentDraftId(book.id, version),
    bookId: book.id,
    version,
    status: "pending",
    source: options.source ?? "manual",
    recommendationAngles: [],
    readerNeeds: [],
    giftUseCases: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function createPendingEnrichmentDraftsForBooks(
  books: Book[],
  options: CreateEnrichmentDraftOptions = {},
): EnrichmentDraft[] {
  return books.map((book) => createPendingEnrichmentDraft(book, options));
}

export function markEnrichmentDraftEnriched(
  draft: EnrichmentDraft,
  options: EnrichmentDraftTransitionOptions = {},
): EnrichmentDraft {
  return updateDraftStatus(draft, "enriched", options);
}

export function markEnrichmentDraftFailed(
  draft: EnrichmentDraft,
  options: EnrichmentDraftTransitionOptions = {},
): EnrichmentDraft {
  return updateDraftStatus(draft, "failed", options);
}

export function markEnrichmentDraftRejected(
  draft: EnrichmentDraft,
  options: EnrichmentDraftTransitionOptions = {},
): EnrichmentDraft {
  return updateDraftStatus(draft, "rejected", options);
}

export function getBooksMissingEnrichmentDrafts(
  books: Book[],
  drafts: EnrichmentDraft[],
): Book[] {
  const draftedBookIds = new Set(drafts.map((draft) => draft.bookId));

  return books.filter((book) => !draftedBookIds.has(book.id));
}

function updateDraftStatus(
  draft: EnrichmentDraft,
  status: EnrichmentDraft["status"],
  options: EnrichmentDraftTransitionOptions,
): EnrichmentDraft {
  return {
    ...draft,
    status,
    warnings: mergeWarnings(draft.warnings, options),
    updatedAt: options.now ?? new Date().toISOString(),
  };
}

function mergeWarnings(
  existingWarnings: string[] | undefined,
  options: EnrichmentDraftTransitionOptions,
) {
  const warnings = [
    ...(existingWarnings ?? []),
    ...(options.reason ? [options.reason] : []),
    ...(options.warnings ?? []),
  ];

  return warnings.length > 0 ? warnings : existingWarnings;
}

function createEnrichmentDraftId(bookId: string, version: number) {
  return `enrichment:${bookId}:v${version}`;
}
