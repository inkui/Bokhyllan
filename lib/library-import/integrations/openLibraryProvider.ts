import type { MetadataProvider } from "@/lib/library-import/integrations/metadataProvider";

export const openLibraryProvider: MetadataProvider = {
  id: "open_library",
  async fetchMetadata() {
    return undefined;
  },
};
