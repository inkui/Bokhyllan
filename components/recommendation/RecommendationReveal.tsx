"use client";

import { motion } from "framer-motion";
import { BookCover } from "@/components/recommendation/BookCover";
import { PracticalNotes } from "@/components/recommendation/PracticalNotes";
import { RecommendationActions } from "@/components/recommendation/RecommendationActions";
import { RecommendationExplanation } from "@/components/recommendation/RecommendationExplanation";
import { slowReveal, staggerChildren } from "@/lib/motion";
import type { Recommendation } from "@/data/sampleRecommendations";

type RecommendationRevealProps = {
  recommendation: Recommendation;
};

export function RecommendationReveal({
  recommendation,
}: RecommendationRevealProps) {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-10 py-6 sm:py-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16"
      aria-labelledby="recommendation-title"
    >
      <motion.div variants={slowReveal} className="mx-auto w-full max-w-[280px] sm:max-w-[310px] lg:max-w-[360px]">
        <BookCover recommendation={recommendation} />
      </motion.div>

      <motion.article
        variants={slowReveal}
        className="rounded-quiet border border-brass/25 bg-paper-soft px-6 py-8 text-ink shadow-book sm:px-10 sm:py-11"
      >
        <p className="mb-5 font-serif text-[1.55rem] italic leading-snug text-brass-muted sm:text-3xl">
          {recommendation.emotionalDescriptor}
        </p>
        <h1
          id="recommendation-title"
          className="font-serif text-[2.25rem] leading-[1.06] tracking-normal text-ink sm:text-5xl"
        >
          {recommendation.title}
        </h1>
        <p className="mt-3 text-base text-ink-soft">av {recommendation.author}</p>

        <RecommendationExplanation recommendation={recommendation} />
        <PracticalNotes notes={recommendation.practicalNotes} />
        <RecommendationActions recommendation={recommendation} />
      </motion.article>
    </motion.section>
  );
}
