import Link from "next/link";
import type { Recommendation } from "@/data/sampleRecommendations";

type RecommendationActionsProps = {
  recommendation: Recommendation;
};

export function RecommendationActions({
  recommendation,
}: RecommendationActionsProps) {
  const affiliateLink = recommendation.affiliateLink ?? {
    label: "Hitta boken",
    url: "#",
  };

  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href={affiliateLink.url}
        className="inline-flex min-h-11 items-center justify-center rounded-quiet bg-green-literary px-5 py-3 text-base text-paper-soft transition-colors duration-calm hover:bg-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
      >
        {affiliateLink.label}
      </Link>
      <button
        type="button"
        className="min-h-11 rounded-quiet px-4 py-3 text-left text-base text-ink-soft transition-colors duration-calm hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass sm:text-center"
      >
        Spara till senare
      </button>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-quiet px-4 py-3 text-base text-ink-soft transition-colors duration-calm hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
      >
        Visa något annat
      </Link>
    </div>
  );
}
