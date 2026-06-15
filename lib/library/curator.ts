export type CuratorTone =
  | "calm"
  | "warm"
  | "precise"
  | "literary"
  | "conversational";

export type Curator = {
  id: string;
  name: string;
  description: string;
  tasteTags: string[];
  preferredGenres: string[];
  avoidedGenres?: string[];
  tone: CuratorTone;
  createdAt?: string;
  updatedAt?: string;
};
