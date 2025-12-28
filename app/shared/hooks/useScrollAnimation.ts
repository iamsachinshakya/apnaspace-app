"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to track scroll position
 * @returns scrollY - Current vertical scroll position
 */
export function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Passive event listener for better performance
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Set initial scroll position
        setScrollY(window.scrollY);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollY;
}

/**
 * Custom hook for parallax scroll effect
 * @param speed - Multiplier for parallax effect (default: 0.1)
 * @returns transform style object
 */
export function useParallax(scrollY: number, speed: number = 0.1) {
    return {
        transform: `translateY(${scrollY * speed}px)`,
    };
}
