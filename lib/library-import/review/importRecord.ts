import type { BookCandidate } from "@/lib/library-import/candidate/bookCandidate";
import type { BookEnrichmentDraft } from "@/lib/library-import/enrichment/bookEnrichmentDraft";
import type { BookMetadata } from "@/lib/library-import/metadata/bookMetadata";
import type { ReviewStatus } from "@/lib/library-import/review/reviewStatus";

export type LibraryImportRecord = {
  status: ReviewStatus;
  candidate: BookCandidate;
  metadata?: BookMetadata;
  enrichmentDraft?: BookEnrichmentDraft;
  updatedAt: string;
};
