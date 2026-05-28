import { RecommendationTransition } from "@/components/recommendation-flow/RecommendationTransition";
import { SiteShell } from "@/components/layout/SiteShell";
import type { FlowAnswers, FlowKind } from "@/data/recommendationFlow";
import { chooseRecommendationId } from "@/lib/recommendationMapping";

type ResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const flow: FlowKind = params.flow === "gift" ? "gift" : "self";
  const answers: FlowAnswers = {};

  Object.entries(params).forEach(([key, value]) => {
    if (key !== "flow" && typeof value === "string") {
      answers[key] = value;
    }
  });

  const recommendationId = chooseRecommendationId(flow, answers);

  return (
    <SiteShell>
      <RecommendationTransition recommendationId={recommendationId} />
    </SiteShell>
  );
}
