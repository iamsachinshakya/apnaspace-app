"use client";

import { useIntersectionObserver } from "@/app/shared/hooks/useIntersectionObserver";
import React, { ReactNode, CSSProperties } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "scale" | "none";
type AnimationDelay = "none" | "short" | "medium" | "long";
type AnimationDuration = "fast" | "normal" | "slow";

interface FadeInOnScrollProps {
  children: ReactNode;
  /** Animation direction */
  direction?: AnimationDirection;
  /** Animation delay timing */
  delay?: AnimationDelay;
  /** Animation duration speed */
  duration?: AnimationDuration;
  /** Additional CSS classes */
  className?: string;
  /** Threshold for triggering animation (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Trigger animation only once */
  triggerOnce?: boolean;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Distance for slide animations in pixels */
  distance?: number;
}

/**
 * Animation class mapping based on direction and delay
 */
const getAnimationClass = (
  direction: AnimationDirection,
  delay: AnimationDelay
): string => {
  const animationMap: Record<
    AnimationDirection,
    Record<AnimationDelay, string>
  > = {
    up: {
      none: "animate-fade-in-up",
      short: "animate-fade-in-up",
      medium: "animate-fade-in-up-delayed",
      long: "animate-fade-in-up-delayed-2",
    },
    down: {
      none: "animate-fade-in-down",
      short: "animate-fade-in-down",
      medium: "animate-fade-in-down-delayed",
      long: "animate-fade-in-down-delayed-2",
    },
    left: {
      none: "animate-fade-in-left",
      short: "animate-fade-in-left",
      medium: "animate-fade-in-left-delayed",
      long: "animate-fade-in-left-delayed-2",
    },
    right: {
      none: "animate-fade-in-right",
      short: "animate-fade-in-right",
      medium: "animate-fade-in-right-delayed",
      long: "animate-fade-in-right-delayed-2",
    },
    scale: {
      none: "animate-fade-in-scale",
      short: "animate-fade-in-scale",
      medium: "animate-fade-in-scale-delayed",
      long: "animate-fade-in-scale-delayed-2",
    },
    none: {
      none: "animate-fade-in",
      short: "animate-fade-in-delayed",
      medium: "animate-fade-in-delayed-2",
      long: "animate-fade-in-delayed-2",
    },
  };

  return animationMap[direction][delay];
};

/**
 * Duration class mapping
 */
const getDurationClass = (duration: AnimationDuration): string => {
  const durationMap: Record<AnimationDuration, string> = {
    fast: "duration-500",
    normal: "duration-1000",
    slow: "duration-1500",
  };
  return durationMap[duration];
};

/**
 * Production-ready fade-in animation component with full directional support
 *
 * @example
 * // Basic usage - fade up
 * <FadeInOnScroll>
 *   <div>Content</div>
 * </FadeInOnScroll>
 *
 * @example
 * // Fade from right with medium delay
 * <FadeInOnScroll direction="right" delay="medium">
 *   <div>Content</div>
 * </FadeInOnScroll>
 *
 * @example
 * // Scale effect with custom threshold
 * <FadeInOnScroll direction="scale" threshold={0.3}>
 *   <div>Content</div>
 * </FadeInOnScroll>
 */
export function FadeInOnScroll({
  children,
  direction = "up",
  delay = "short",
  duration = "normal",
  className = "",
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  style,
}: FadeInOnScrollProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
    enabled: true,
  });

  const animationClass = getAnimationClass(direction, delay);
  const durationClass = getDurationClass(duration);

  return (
    <div
      ref={ref}
      className={`transition-opacity ${durationClass} ${
        isVisible ? animationClass : "opacity-0"
      } ${className}`}
      style={style}
      // Accessibility: Remove animation for users who prefer reduced motion
      data-reduce-motion={isVisible ? "false" : "true"}
    >
      {children}
    </div>
  );
}

/**
 * Batch animation wrapper for staggered animations
 *
 * @example
 * <FadeInOnScroll.Group>
 *   <FadeInOnScroll delay="short">Item 1</FadeInOnScroll>
 *   <FadeInOnScroll delay="medium">Item 2</FadeInOnScroll>
 *   <FadeInOnScroll delay="long">Item 3</FadeInOnScroll>
 * </FadeInOnScroll.Group>
 */
FadeInOnScroll.Group = function FadeInGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
};
