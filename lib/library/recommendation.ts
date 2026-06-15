export type RecommendationConfidence = "low" | "medium" | "high";

export type RecommendationReason = {
  bookId: string;
  reason: string;
  matchedNeeds: string[];
  confidence?: RecommendationConfidence;
  curatorId?: string;
};
