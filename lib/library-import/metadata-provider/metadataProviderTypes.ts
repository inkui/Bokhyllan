export type MetadataLookupRequest = {
  title: string;
  author?: string;
  isbn?: string;
};

export type MetadataConfidence = "high" | "medium" | "low";

export type MetadataLookupResult = {
  title?: string;
  author?: string;
  isbn13?: string;
  description?: string;
  publisher?: string;
  publicationYear?: number;
  coverImageUrl?: string;
  source?: string;
  confidence?: MetadataConfidence;
};

export type MetadataProvider = {
  id: string;
  lookup: (
    request: MetadataLookupRequest,
  ) => Promise<MetadataLookupResult | undefined>;
};
