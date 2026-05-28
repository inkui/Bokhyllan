import type { Variants } from "framer-motion";

export const doorHover = {
  y: -3,
  transition: { duration: 0.28, ease: "easeOut" },
};

export const slowReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};
