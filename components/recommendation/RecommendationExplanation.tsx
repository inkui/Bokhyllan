import type { Recommendation } from "@/data/sampleRecommendations";

type RecommendationExplanationProps = {
  recommendation: Recommendation;
};

export function RecommendationExplanation({
  recommendation,
}: RecommendationExplanationProps) {
  return (
    <div className="mt-8 space-y-6">
      <p className="font-serif text-[1.18rem] leading-8 text-ink sm:text-[1.35rem] sm:leading-9">
        {recommendation.explanation}
      </p>
      {recommendation.voiceNote ? (
        <p className="border-l border-brass/70 pl-5 text-[0.98rem] leading-7 text-ink-soft sm:text-base">
          {recommendation.voiceNote}
        </p>
      ) : null}
    </div>
  );
}
