import type { MetadataProvider } from "@/lib/library-import/integrations/metadataProvider";

export const googleBooksProvider: MetadataProvider = {
  id: "google_books",
  async fetchMetadata() {
    return undefined;
  },
};
