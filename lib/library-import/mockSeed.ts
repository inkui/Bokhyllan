import type { BookCandidate } from "@/lib/library-import/candidate/bookCandidate";
import type { BookEnrichmentDraft } from "@/lib/library-import/enrichment/bookEnrichmentDraft";
import type { BookMetadata } from "@/lib/library-import/metadata/bookMetadata";
import {
  createCuratedBookFromEnrichmentDraft,
  createEnrichmentDraftFromMetadata,
  createMetadataFromCandidate,
} from "@/lib/library-import/publish/pipelineMappers";

const createdAt = "2026-06-14T00:00:00.000Z";

export const mockBookCandidates: BookCandidate[] = [
  {
    title: "Gilead",
    author: "Marilynne Robinson",
    isbn: "9780312424404",
    source: "curator",
    createdAt,
    notes: "Already close to Bokhyllan's calm and tender register.",
  },
  {
    title: "Stoner",
    author: "John Williams",
    isbn: "9781590171998",
    source: "library_gap",
    createdAt,
    notes: "Useful for quiet dignity and perspective without sentimentality.",
  },
  {
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    isbn: "9780143110439",
    source: "editorial",
    createdAt,
    curatorSuggestion: "Potential warm immersion candidate.",
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    isbn: "9781635577808",
    source: "user_suggestion",
    createdAt,
    notes: "Possible wonder and solitude placement.",
  },
];

export const mockBookMetadata: BookMetadata[] = [
  createMetadataFromCandidate(mockBookCandidates[0], {
    publicationYear: 2004,
    pageCount: 256,
    language: "en",
    description: "Mock metadata for an epistolary literary novel.",
  }),
  createMetadataFromCandidate(mockBookCandidates[1], {
    publicationYear: 1965,
    pageCount: 288,
    language: "en",
    description: "Mock metadata for a quiet campus and life novel.",
  }),
  createMetadataFromCandidate(mockBookCandidates[2], {
    publicationYear: 2016,
    pageCount: 462,
    language: "en",
    description: "Mock metadata for a warm, contained historical novel.",
  }),
  createMetadataFromCandidate(mockBookCandidates[3], {
    publicationYear: 2020,
    pageCount: 272,
    language: "en",
    description: "Mock metadata for a speculative novel of solitude and wonder.",
  }),
];

export const mockEnrichmentDrafts: BookEnrichmentDraft[] = [
  createEnrichmentDraftFromMetadata(mockBookMetadata[0], {
    readingState: ["emotionally_tired", "searching_for_calm"],
    readingEnergy: "low",
    emotionalTone: ["still", "tender", "hopeful"],
    atmosphere: "hopeful",
    emotionalEffects: ["calms", "comforts", "restores_attention"],
    pacing: ["slow", "steady"],
    emotionalDescription:
      "A quiet draft for a reader who needs stillness without emptiness.",
    curatorConnection:
      "Belongs in the library as a test case for low-energy grace.",
    voiceNote: "A letter held in both hands.",
  }),
  createEnrichmentDraftFromMetadata(mockBookMetadata[1], {
    readingState: ["needs_perspective", "lonely", "ready_for_depth"],
    readingEnergy: "low",
    emotionalTone: ["still", "melancholic", "tender"],
    atmosphere: "still",
    emotionalEffects: ["keeps_company", "deepens_feeling"],
    pacing: ["slow", "steady"],
    emotionalDescription:
      "A draft for ordinary life treated with unusual seriousness.",
    curatorConnection:
      "Useful for readers who want dignity more than consolation.",
  }),
  createEnrichmentDraftFromMetadata(mockBookMetadata[2], {
    readingState: ["wants_immersion", "lonely", "restless"],
    readingEnergy: "medium",
    emotionalTone: ["warm", "immersive", "quietly_funny"],
    atmosphere: "warm",
    emotionalEffects: ["keeps_company", "awakens_wonder"],
    pacing: ["absorbing", "steady"],
    emotionalDescription:
      "A draft for generous companionship inside a bounded world.",
    curatorConnection:
      "Potential placement for readers who want motion without harshness.",
  }),
  createEnrichmentDraftFromMetadata(mockBookMetadata[3], {
    readingState: ["overstimulated", "searching_for_calm", "lonely"],
    readingEnergy: "medium",
    emotionalTone: ["clear", "haunting", "hopeful"],
    atmosphere: "clear",
    emotionalEffects: ["awakens_wonder", "opens_perspective"],
    pacing: ["steady", "deep"],
    emotionalDescription:
      "A draft for solitude that becomes spacious rather than closed.",
    curatorConnection:
      "Promising for readers who need wonder without noise.",
  }),
];

export const mockPublishedBooks = mockEnrichmentDrafts.map(
  createCuratedBookFromEnrichmentDraft,
);

export const mockPipelineExamples = mockBookCandidates.map(
  (candidate, index) => ({
    status: "published" as const,
    candidate,
    metadata: mockBookMetadata[index],
    enrichmentDraft: mockEnrichmentDrafts[index],
    book: mockPublishedBooks[index],
  }),
);
