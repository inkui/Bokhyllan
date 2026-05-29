import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";
import type { Book } from "@/data/library/books/bookTypes";
import { resolveRecommendation } from "@/data/library/intelligence/recommendationResolver";

export type RecommendationRuleContext = {
  flow: FlowKind;
  answers: FlowAnswers;
};

export function chooseBookForRecommendation(
  context: RecommendationRuleContext,
): Book {
  return resolveRecommendation(context.flow, context.answers).book;
}
