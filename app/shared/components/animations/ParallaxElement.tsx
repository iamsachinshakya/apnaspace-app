"use client";

import { useParallax } from "@/app/shared/hooks/useScrollAnimation";
import React, { ReactNode, CSSProperties } from "react";

interface ParallaxElementProps {
  children: ReactNode;
  scrollY: number;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Production-ready parallax scroll component
 * Creates smooth scroll-based transform effect
 */
export function ParallaxElement({
  children,
  scrollY,
  speed = 0.1,
  className = "",
  style = {},
}: ParallaxElementProps) {
  const parallaxStyle = useParallax(scrollY, speed);

  return (
    <div
      className={className}
      style={{
        ...parallaxStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
