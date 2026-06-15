import type { MetadataProvider } from "@/lib/library-import/metadata-provider/metadataProviderTypes";

export const openLibraryProvider: MetadataProvider = {
  id: "open_library",
  async lookup() {
    return undefined;
  },
};
