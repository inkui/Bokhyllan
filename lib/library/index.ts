export type {
  Book,
  BookEnrichmentStatus,
  BookLanguage,
  BookMood,
  BookPace,
  GiftFit,
  LiteraryWarmth,
} from "@/lib/library/book";
export type { Curator, CuratorTone } from "@/lib/library/curator";
export type {
  CreateRecommendationReasonOptions,
  CuratorBookScore,
  TopCuratorsByBook,
} from "@/lib/library/curator-system";
export type {
  EnrichmentDraft,
  EnrichmentDraftStatus,
  EnrichmentSource,
} from "@/lib/library/enrichment";
export type {
  CreateEnrichmentDraftOptions,
  EnrichmentDraftTransitionOptions,
} from "@/lib/library/enrichment-pipeline";
export type {
  RecommendationConfidence,
  RecommendationReason,
} from "@/lib/library/recommendation";
export type {
  SavedShelfItem,
  SavedShelfItemStatus,
  SavedShelfSource,
  SavedShelfState,
  SavedShelfUpdateOptions,
} from "@/lib/library/saved-shelf";
export type {
  AffiliateLinkProvider,
  AffiliateLinkTarget,
} from "@/lib/library/affiliate";
export type {
  AffiliateProvider,
  AffiliateProviderId,
  AffiliateUrlOptions,
  AffiliateUrlResult,
} from "@/lib/library/affiliate-provider";
export type {
  LibraryValidationIssue,
  LibraryValidationIssueCode,
  LibraryValidationResult,
  LibraryValidationSeverity,
} from "@/lib/library/validation";
export {
  loadBooksFromJsonFile,
  writeBooksToJsonFile,
} from "@/lib/library/io";
export {
  mapRuntimeBookToFoundationBook,
  mapRuntimeBooksToFoundationBooks,
} from "@/lib/library/runtime-book-mapper";
export {
  affiliateProviders,
  createBokusSearchUrl,
  getAffiliateUrl,
} from "@/lib/library/affiliate-provider";
export {
  createRecommendationReasonForBook,
  getCuratorsForBook,
  getTopCuratorsForBooks,
  scoreCuratorForBook,
} from "@/lib/library/curator-system";
export {
  createPendingEnrichmentDraft,
  createPendingEnrichmentDraftsForBooks,
  getBooksMissingEnrichmentDrafts,
  markEnrichmentDraftEnriched,
  markEnrichmentDraftFailed,
  markEnrichmentDraftRejected,
} from "@/lib/library/enrichment-pipeline";
export {
  dismissBookFromShelf,
  getSavedShelfItems,
  isBookSaved,
  removeBookFromShelf,
  saveBookToShelf,
} from "@/lib/library/saved-shelf";
export { validateLibraryBooks } from "@/lib/library/validation";
