import type { Recommendation } from "@/data/sampleRecommendations";
import type { CuratorRevealCopy } from "@/data/library/intelligence/recommendationResolver";

type RecommendationExplanationProps = {
  recommendation: Recommendation;
  curatorCopy?: CuratorRevealCopy;
};

export function RecommendationExplanation({
  recommendation,
  curatorCopy,
}: RecommendationExplanationProps) {
  if (curatorCopy) {
    const callout = [curatorCopy.readingExperienceNote, curatorCopy.placement]
      .filter(Boolean)
      .join(" ");
    return (
      <div className="mt-8 space-y-6">
        <p className="font-serif text-[1.18rem] leading-8 text-ink sm:text-[1.35rem] sm:leading-9">
          {curatorCopy.whyThisBook}
        </p>
        {callout ? (
          <p className="border-l border-brass/50 pl-5 text-[0.98rem] leading-7 text-ink-soft sm:text-base">
            {callout}
          </p>
        ) : null}
      </div>
    );
  }

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
