"use client";

import { useEffect, useState, useRef } from "react";

interface UseScrollPositionOptions {
    throttle?: number;
    enabled?: boolean;
}

/**
 * Production-optimized scroll position tracker
 * Uses requestAnimationFrame and throttling for optimal performance
 * 
 * @param options - Configuration options
 * @returns Current scroll Y position
 */
export function useScrollPosition(
    options: UseScrollPositionOptions = {}
): number {
    const { throttle = 16, enabled = true } = options; // 16ms ≈ 60fps
    const [scrollY, setScrollY] = useState(0);
    const tickingRef = useRef(false);
    const lastScrollRef = useRef(0);

    useEffect(() => {
        if (!enabled || typeof window === "undefined") return;

        // Set initial scroll position
        setScrollY(window.scrollY);

        const handleScroll = () => {
            const now = Date.now();

            // Throttle scroll events
            if (now - lastScrollRef.current < throttle) return;

            lastScrollRef.current = now;

            if (!tickingRef.current) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    tickingRef.current = false;
                });
                tickingRef.current = true;
            }
        };

        // Use passive listener for better performance
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [throttle, enabled]);

    return scrollY;
}

/**
 * Calculate parallax transform value
 * 
 * @param scrollY - Current scroll position
 * @param speed - Parallax speed multiplier
 * @returns Transform style object
 */
export function useParallax(scrollY: number, speed: number = 0.1) {
    return {
        transform: `translateY(${scrollY * speed}px)`,
        willChange: "transform", // Hint to browser for optimization
    };
}
