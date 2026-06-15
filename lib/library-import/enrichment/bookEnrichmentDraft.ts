import type { EmotionalEffect } from "@/data/library/taxonomy/emotions";
import type { ReadingPacing } from "@/data/library/taxonomy/pacing";
import type { ReadingState } from "@/data/library/taxonomy/readingStates";
import type {
  BookAtmosphere,
  EmotionalTone,
} from "@/data/library/taxonomy/tones";
import type { ReadingEnergy } from "@/data/library/books/bookTypes";
import type { BookMetadata } from "@/lib/library-import/metadata/bookMetadata";

export type BookEnrichmentDraft = {
  metadata: BookMetadata;
  readingState: ReadingState[];
  readingEnergy: ReadingEnergy;
  emotionalTone: EmotionalTone[];
  atmosphere: BookAtmosphere;
  emotionalEffects: EmotionalEffect[];
  pacing: ReadingPacing[];
  emotionalDescription?: string;
  curatorConnection?: string;
  voiceNote?: string;
};
