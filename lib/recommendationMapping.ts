import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";
import { getBookById } from "@/data/library/books/books";
import { resolveRecommendation } from "@/data/library/intelligence/recommendationResolver";
import type { CuratorRevealCopy } from "@/data/library/intelligence/recommendationResolver";

export type RecommendationId = string;

export type RecommendationChoice = {
  id: RecommendationId;
  revealNote: string;
  curatorCopy: CuratorRevealCopy;
};

export function chooseRecommendationId(
  flow: FlowKind,
  answers: FlowAnswers,
): RecommendationId {
  return chooseRecommendation(flow, answers).id;
}

export function chooseRecommendation(
  flow: FlowKind,
  answers: FlowAnswers,
): RecommendationChoice {
  const resolution = resolveRecommendation(flow, answers);

  return {
    id: resolution.book.id,
    revealNote: resolution.revealNote,
    curatorCopy: resolution.curatorCopy,
  };
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
