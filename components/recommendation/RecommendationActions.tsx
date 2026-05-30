"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Recommendation } from "@/data/sampleRecommendations";
import { isBookSaved, saveBook } from "@/lib/savedBooks";

type RecommendationActionsProps = {
  recommendation: Recommendation;
  quietCta?: string;
};

export function RecommendationActions({
  recommendation,
  quietCta,
}: RecommendationActionsProps) {
  const [saved, setSaved] = useState(false);
  const affiliateLink = recommendation.affiliateLink ?? {
    label: "Hitta boken",
    url: "#",
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSaved(isBookSaved(recommendation.id));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [recommendation.id]);

  return (
    <div className="mt-9">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={affiliateLink.url}
          className="inline-flex min-h-11 items-center justify-center rounded-quiet bg-green-literary px-5 py-3 text-base text-paper-soft transition-colors duration-calm hover:bg-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          {quietCta ?? affiliateLink.label}
        </Link>
        <button
          type="button"
          onClick={() => {
            saveBook(recommendation);
            setSaved(true);
          }}
          className="min-h-11 rounded-quiet px-4 py-3 text-left text-base text-ink-soft transition-colors duration-calm hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass sm:text-center"
        >
          {saved ? "Boken vilar här nu" : "Låt den vila här så länge"}
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-quiet px-4 py-3 text-base text-ink-soft transition-colors duration-calm hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          Visa något annat
        </Link>
      </div>
      {!saved ? (
        <p className="mt-3 text-sm leading-6 text-ink-muted">
          Kanske inte idag. Låt den vila här så länge.
        </p>
      ) : (
        <Link
          href="/saved"
          className="mt-3 inline-flex min-h-11 items-center rounded-quiet text-sm text-ink-muted underline decoration-brass/50 underline-offset-4 transition-colors duration-calm hover:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          Gå till böckerna som vilar
        </Link>
      )}
    </div>
  );
}
