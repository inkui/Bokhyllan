import type { BookCandidate } from "@/lib/library-import/candidate/bookCandidate";
import type { BookMetadata } from "@/lib/library-import/metadata/bookMetadata";

export type MetadataProviderId = "google_books" | "open_library";

export type MetadataProvider = {
  id: MetadataProviderId;
  fetchMetadata: (candidate: BookCandidate) => Promise<BookMetadata | undefined>;
};
