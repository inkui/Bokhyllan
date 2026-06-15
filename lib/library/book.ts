export type BookLanguage =
  | "sv"
  | "en"
  | "no"
  | "da"
  | "fi"
  | "fr"
  | "de"
  | "es"
  | "other";

export type BookMood =
  | "still"
  | "warm"
  | "clear"
  | "melancholic"
  | "immersive"
  | "hopeful"
  | "dark"
  | "restless"
  | "tender"
  | "other";

export type BookPace = "slow" | "steady" | "absorbing" | "demanding" | "light";

export type LiteraryWarmth = "cool" | "restrained" | "warm" | "generous";

export type GiftFit = "low" | "medium" | "high";

export type BookEnrichmentStatus =
  | "not_started"
  | "draft"
  | "review_ready"
  | "approved"
  | "published";

export type Book = {
  id: string;
  title: string;
  author: string;
  originalTitle?: string;
  language: BookLanguage;
  firstPublishedYear?: number;
  isbn13?: string;
  genres: string[];
  tags: string[];
  themes: string[];
  mood: BookMood;
  pace?: BookPace;
  literaryWarmth?: LiteraryWarmth;
  giftFit?: GiftFit;
  bokusUrl?: string;
  coverImageUrl?: string;
  description?: string;
  enrichmentStatus: BookEnrichmentStatus;
  createdAt?: string;
  updatedAt?: string;
};
