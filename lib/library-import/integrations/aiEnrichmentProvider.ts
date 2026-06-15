import type { BookEnrichmentDraft } from "@/lib/library-import/enrichment/bookEnrichmentDraft";
import type { BookMetadata } from "@/lib/library-import/metadata/bookMetadata";

export type EnrichmentProviderId = "ai_enrichment";

export type EnrichmentProvider = {
  id: EnrichmentProviderId;
  createDraft: (
    metadata: BookMetadata,
  ) => Promise<Partial<Omit<BookEnrichmentDraft, "metadata">> | undefined>;
};

export const aiEnrichmentProvider: EnrichmentProvider = {
  id: "ai_enrichment",
  async createDraft() {
    return undefined;
  },
};
