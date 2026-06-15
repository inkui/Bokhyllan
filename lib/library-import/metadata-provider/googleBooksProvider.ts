import type { MetadataProvider } from "@/lib/library-import/metadata-provider/metadataProviderTypes";

export const googleBooksProvider: MetadataProvider = {
  id: "google_books",
  async lookup() {
    return undefined;
  },
};
