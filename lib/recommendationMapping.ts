import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";

export type RecommendationId =
  | "handelser-vid-vatten"
  | "gilead"
  | "gentleman-i-moskva";

export function chooseRecommendationId(
  flow: FlowKind,
  answers: FlowAnswers,
): RecommendationId {
  if (flow === "self") {
    if (
      answers.longing === "stillsamt" ||
      answers.energy === "valdigt-lite" ||
      answers.pace === "mjuk"
    ) {
      return "gilead";
    }

    if (
      answers.longing === "varmt" ||
      answers.longing === "uppslukande" ||
      answers.energy === "nagot-stort"
    ) {
      return "gentleman-i-moskva";
    }

    return "handelser-vid-vatten";
  }

  if (
    answers.person === "behover-vila" ||
    answers.gift === "trost" ||
    answers.tone === "varm"
  ) {
    return "gilead";
  }

  if (
    answers.person === "rastlos" ||
    answers.person === "soker-nytt" ||
    answers.gift === "energi"
  ) {
    return "gentleman-i-moskva";
  }

  return "handelser-vid-vatten";
}

export function getRecommendationIdFromParams(
  value: string | string[] | undefined,
): RecommendationId {
  const id = Array.isArray(value) ? value[0] : value;

  if (
    id === "gilead" ||
    id === "gentleman-i-moskva" ||
    id === "handelser-vid-vatten"
  ) {
    return id;
  }

  return "handelser-vid-vatten";
}
