"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useTransform, useReducedMotion, type SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  color?: string;
}

/**
 * Motion Primitive: Pointer-tracked radial spotlight glow.
 * Stays strictly on compositor (opacity + transform) and disables under reduced motion.
 */
export function Spotlight({
  className,
  size = 280,
  springOptions = { bounce: 0, duration: 240 },
  color = "rgba(19, 162, 160, 0.22)",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement || prefersReduced) return;

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    parentElement.addEventListener("mousemove", handleMouseMove, { passive: true });
    parentElement.addEventListener("mouseenter", handleEnter);
    parentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeEventListener("mouseenter", handleEnter);
      parentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [parentElement, handleMouseMove, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-2xl transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: `radial-gradient(circle at center, ${color}, transparent 72%)`,
      }}
    />
  );
}
