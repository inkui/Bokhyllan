export type EnrichmentDraftStatus = "pending" | "enriched" | "failed" | "rejected";

export type EnrichmentSource =
  | "manual"
  | "import_pipeline"
  | "curator_review"
  | "future_ai";

export type EnrichmentDraft = {
  id: string;
  bookId: string;
  version: number;
  status: EnrichmentDraftStatus;
  source: EnrichmentSource;
  summary?: string;
  recommendationAngles: string[];
  readerNeeds: string[];
  giftUseCases: string[];
  warnings?: string[];
  createdAt?: string;
  updatedAt?: string;
};
