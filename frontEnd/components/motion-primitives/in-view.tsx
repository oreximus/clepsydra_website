"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Transition, type Variant } from "framer-motion";

interface InViewProps {
  children: ReactNode;
  className?: string;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  once?: boolean;
  margin?: string;
  delay?: number;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function InView({
  children,
  className,
  variants = defaultVariants,
  transition,
  once = true,
  margin = "-60px",
  delay = 0,
}: InViewProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      transition={
        transition ?? {
          duration: 0.55,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
