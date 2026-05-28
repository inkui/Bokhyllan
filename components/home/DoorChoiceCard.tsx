"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { doorHover } from "@/lib/motion";

type DoorChoiceCardProps = {
  title: string;
  subtitle?: string;
  tone: "green" | "walnut";
  href: string;
};

export function DoorChoiceCard({
  title,
  subtitle,
  tone,
  href,
}: DoorChoiceCardProps) {
  const classes =
    tone === "green"
      ? "bg-green-literary text-paper-soft border-brass/25"
      : "bg-walnut text-paper-soft border-brass/25";

  return (
    <motion.div whileHover={doorHover} whileFocus={doorHover}>
      <Link
        href={href}
        className={`group block min-h-[210px] rounded-quiet border p-7 shadow-door outline-none transition-colors duration-calm focus-visible:ring-2 focus-visible:ring-brass sm:min-h-[224px] sm:p-8 ${classes}`}
      >
        <span className="mb-10 block h-px w-14 bg-brass/70 transition-all duration-calm group-hover:w-20" />
        <span className="block font-serif text-[1.95rem] leading-tight tracking-normal sm:text-4xl">
          {title}
        </span>
        {subtitle ? (
          <span className="mt-5 block max-w-sm text-base leading-7 text-paper-soft/78">
            {subtitle}
          </span>
        ) : null}
      </Link>
    </motion.div>
  );
}
