"use client";

import { motion } from "framer-motion";
import type { AnswerOption } from "@/data/recommendationFlow";
import { doorHover } from "@/lib/motion";

type AnswerCardProps = {
  answer: AnswerOption;
  onSelect: (answerId: string) => void;
};

export function AnswerCard({ answer, onSelect }: AnswerCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={doorHover}
      whileFocus={doorHover}
      onClick={() => onSelect(answer.id)}
      className="min-h-16 rounded-quiet border border-brass/30 bg-paper-soft px-5 py-4 text-left font-serif text-[1.42rem] leading-snug text-ink shadow-sm transition-colors duration-calm hover:border-brass hover:bg-paper-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass sm:min-h-20 sm:px-6 sm:text-2xl"
    >
      {answer.label}
    </motion.button>
  );
}
