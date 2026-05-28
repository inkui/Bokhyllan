import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";
import { getBookById } from "@/data/library/books/books";
import { chooseBookForRecommendation } from "@/data/library/mappings/recommendationRules";

export type RecommendationId = string;

export function chooseRecommendationId(
  flow: FlowKind,
  answers: FlowAnswers,
): RecommendationId {
  return chooseBookForRecommendation({ flow, answers }).id;
}

export function getRecommendationIdFromParams(
  value: string | string[] | undefined,
): RecommendationId {
  const id = Array.isArray(value) ? value[0] : value;

  if (!id) {
    return "handelser-vid-vatten";
  }

  return getBookById(id).id;
}
