import { googleBooksProvider } from "@/lib/library-import/metadata-provider/googleBooksProvider";
import { mockMetadataProvider } from "@/lib/library-import/metadata-provider/mockMetadataProvider";
import { openLibraryProvider } from "@/lib/library-import/metadata-provider/openLibraryProvider";
import type {
  MetadataLookupRequest,
  MetadataLookupResult,
  MetadataProvider,
} from "@/lib/library-import/metadata-provider/metadataProviderTypes";

export const metadataProviders = {
  mock: mockMetadataProvider,
  googleBooks: googleBooksProvider,
  openLibrary: openLibraryProvider,
} as const;

export async function resolveMetadata(
  request: MetadataLookupRequest,
  provider: MetadataProvider = mockMetadataProvider,
): Promise<MetadataLookupResult | undefined> {
  return provider.lookup(request);
}

export { googleBooksProvider, mockMetadataProvider, openLibraryProvider };
export type {
  MetadataConfidence,
  MetadataLookupRequest,
  MetadataLookupResult,
  MetadataProvider,
} from "@/lib/library-import/metadata-provider/metadataProviderTypes";
