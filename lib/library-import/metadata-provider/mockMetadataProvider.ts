import type {
  MetadataLookupRequest,
  MetadataLookupResult,
  MetadataProvider,
} from "@/lib/library-import/metadata-provider/metadataProviderTypes";

const mockMetadataRecords: MetadataLookupResult[] = [
  {
    title: "Gilead",
    author: "Marilynne Robinson",
    isbn13: "9780312424404",
    description:
      "A quiet novel shaped as a letter from an aging pastor to his young son, attentive to grace, memory, and ordinary life.",
    publisher: "Picador",
    publicationYear: 2004,
    coverImageUrl: "/covers/placeholder.svg",
    source: "mock",
    confidence: "medium",
  },
  {
    title: "Stoner",
    author: "John Williams",
    isbn13: "9781590171998",
    description:
      "A restrained portrait of a university teacher whose inward life carries more weight than its outward events suggest.",
    publisher: "New York Review Books",
    publicationYear: 1965,
    coverImageUrl: "/covers/placeholder.svg",
    source: "mock",
    confidence: "medium",
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    isbn13: "9781526622426",
    description:
      "A strange and luminous novel about solitude, wonder, memory, and a house that feels larger than the known world.",
    publisher: "Bloomsbury Publishing",
    publicationYear: 2020,
    coverImageUrl: "/covers/placeholder.svg",
    source: "mock",
    confidence: "medium",
  },
  {
    title: "Sommarboken",
    author: "Tove Jansson",
    isbn13: "9789515217828",
    description:
      "A spare, tender island novel about a grandmother and child moving through summer, grief, play, and attention.",
    publisher: "Schildts & Soderstroms",
    publicationYear: 1972,
    coverImageUrl: "/covers/placeholder.svg",
    source: "mock",
    confidence: "medium",
  },
  {
    title: "Factfulness",
    author: "Hans Rosling",
    isbn13: "9781250107817",
    description:
      "A clear, humane nonfiction book about looking at the world with better proportions and fewer reflexive assumptions.",
    publisher: "Flatiron Books",
    publicationYear: 2018,
    coverImageUrl: "/covers/placeholder.svg",
    source: "mock",
    confidence: "medium",
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function createMockMetadataLookup(
  request: MetadataLookupRequest,
): MetadataLookupResult | undefined {
  const requestedTitle = normalize(request.title);
  const requestedAuthor = request.author ? normalize(request.author) : undefined;

  return mockMetadataRecords.find((record) => {
    if (!record.title || normalize(record.title) !== requestedTitle) {
      return false;
    }

    if (!requestedAuthor) {
      return true;
    }

    return record.author ? normalize(record.author) === requestedAuthor : false;
  });
}

export const mockMetadataProvider: MetadataProvider = {
  id: "mock",
  async lookup(request) {
    return createMockMetadataLookup(request);
  },
};

export { mockMetadataRecords };
