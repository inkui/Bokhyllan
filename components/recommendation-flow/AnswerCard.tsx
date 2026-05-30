"use client";

import { motion } from "framer-motion";
import type { AnswerOption } from "@/data/recommendationFlow";
import { doorHover } from "@/lib/motion";

type AnswerCardProps = {
  answer: AnswerOption;
  selected?: boolean;
  onSelect: (answerId: string) => void;
};

export function AnswerCard({ answer, selected, onSelect }: AnswerCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={doorHover}
      whileFocus={doorHover}
      onClick={() => onSelect(answer.id)}
      aria-pressed={selected}
      className={[
        "min-h-16 rounded-quiet border px-5 py-4 text-left font-serif text-[1.42rem] leading-snug text-ink shadow-sm transition-colors duration-calm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass sm:min-h-20 sm:px-6 sm:text-2xl",
        selected
          ? "border-brass bg-paper-pale"
          : "border-brass/30 bg-paper-soft hover:border-brass hover:bg-paper-pale",
      ].join(" ")}
    >
      {answer.label}
    </motion.button>
  );
}
