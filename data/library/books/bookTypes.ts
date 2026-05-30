import type { AffiliateLinkRequest } from "@/lib/affiliate/affiliateTypes";
import type { EmotionalEffect } from "@/data/library/taxonomy/emotions";
import type { ReadingPacing } from "@/data/library/taxonomy/pacing";
import type { ReadingState } from "@/data/library/taxonomy/readingStates";
import type {
  BookAtmosphere,
  EmotionalTone,
} from "@/data/library/taxonomy/tones";

export type ReadingEnergy = "very_low" | "low" | "medium" | "high";

export type LengthCategory = "short" | "medium" | "long";

export type Book = {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  shortDescription: string;
  emotionalDescription: string;
  curatorConnection: string;
  voiceNote?: string;
  practicalNotes?: string[];
  emotionalTone: EmotionalTone[];
  readingState: ReadingState[];
  pacing: ReadingPacing[];
  emotionalEffects: EmotionalEffect[];
  readingEnergy: ReadingEnergy;
  lengthCategory: LengthCategory;
  atmosphere: BookAtmosphere;
  affiliateRequest?: AffiliateLinkRequest;
};
