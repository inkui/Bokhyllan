"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { RecommendationId } from "@/lib/recommendationMapping";
import { slowReveal } from "@/lib/motion";

type RecommendationTransitionProps = {
  recommendationId: RecommendationId;
};

export function RecommendationTransition({
  recommendationId,
}: RecommendationTransitionProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace(`/recommend/reveal?id=${recommendationId}`);
    }, 1650);

    return () => window.clearTimeout(timer);
  }, [recommendationId, router]);

  return (
    <motion.section
      variants={slowReveal}
      initial="hidden"
      animate="show"
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-14 sm:py-16"
      aria-live="polite"
    >
      <p className="mb-5 text-sm uppercase tracking-[0.18em] text-brass-muted">
        ett ögonblick
      </p>
      <h1 className="font-serif text-[2.25rem] leading-[1.1] tracking-normal text-ink sm:text-5xl">
        Jag tror att jag vet vilken bok vi ska lägga fram.
      </h1>
    </motion.section>
  );
}
