"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnswerCard } from "@/components/recommendation-flow/AnswerCard";
import { ProgressIndicator } from "@/components/recommendation-flow/ProgressIndicator";
import type { FlowAnswers, FlowKind, Question } from "@/data/recommendationFlow";
import { slowReveal, staggerChildren } from "@/lib/motion";

type QuestionScreenProps = {
  flow: FlowKind;
  questions: Question[];
  intro: string;
};

export function QuestionScreen({ flow, questions, intro }: QuestionScreenProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<FlowAnswers>({});

  const currentQuestion = questions[currentIndex];
  const currentStep = currentIndex + 1;

  function handleSelect(answerId: string) {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: answerId,
    };

    if (currentIndex < questions.length - 1) {
      setAnswers(nextAnswers);
      setCurrentIndex((index) => index + 1);
      return;
    }

    const params = new URLSearchParams({ flow });
    Object.entries(nextAnswers).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`/recommend/result?${params.toString()}`);
  }

  function handleGoTo(step: number) {
    setCurrentIndex(step - 1);
  }

  return (
    <motion.section
      key={currentQuestion.id}
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-8 sm:py-16"
      aria-labelledby="question-title"
    >
      <motion.div variants={slowReveal}>
        <ProgressIndicator
          current={currentStep}
          total={questions.length}
          onGoTo={currentIndex > 0 ? handleGoTo : undefined}
        />
        <p className="mb-5 text-sm uppercase tracking-[0.18em] text-brass-muted">
          {intro}
        </p>
        <h1
          id="question-title"
          className="max-w-2xl font-serif text-[2.2rem] leading-[1.1] tracking-normal text-ink sm:text-5xl"
        >
          {currentQuestion.prompt}
        </h1>
        {currentQuestion.subtext ? (
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
            {currentQuestion.subtext}
          </p>
        ) : null}
      </motion.div>

      <motion.div
        variants={slowReveal}
        className="mt-9 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4"
      >
        {currentQuestion.answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            selected={answers[currentQuestion.id] === answer.id}
            onSelect={handleSelect}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
