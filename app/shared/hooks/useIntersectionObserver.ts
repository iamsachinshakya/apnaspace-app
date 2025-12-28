"use client";

import { useEffect, useState, useCallback } from "react";

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    triggerOnce?: boolean;
    enabled?: boolean; // Allow disabling the observer
}

interface UseIntersectionObserverReturn {
    ref: (node: Element | null) => void;
    isVisible: boolean;
    entry: IntersectionObserverEntry | null;
}

/**
 * Production-ready Intersection Observer hook
 * Uses callback ref pattern for maximum flexibility and proper cleanup
 * 
 * @param options - Configuration options for the observer
 * @returns Object with ref callback, visibility state, and entry data
 */
export function useIntersectionObserver(
    options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
    const {
        threshold = 0.1,
        rootMargin = "0px",
        triggerOnce = true,
        enabled = true,
    } = options;

    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const [element, setElement] = useState<Element | null>(null);
    const [hasIntersected, setHasIntersected] = useState(false);

    // Memoized callback ref to prevent unnecessary re-renders
    const ref = useCallback((node: Element | null) => {
        setElement(node);
    }, []);

    useEffect(() => {
        // Early returns for disabled or missing element
        if (!enabled || !element) return;

        // Skip if already intersected and triggerOnce is enabled
        if (triggerOnce && hasIntersected) return;

        // Check if IntersectionObserver is supported
        if (typeof IntersectionObserver === "undefined") {
            console.warn("IntersectionObserver is not supported in this browser");
            return;
        }

        const observer = new IntersectionObserver(
            ([observerEntry]) => {
                setEntry(observerEntry);

                if (observerEntry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            {
                threshold,
                rootMargin,
                // Use document viewport as root
                root: null,
            }
        );

        observer.observe(element);

        // Cleanup function
        return () => {
            observer.disconnect();
        };
    }, [element, threshold, rootMargin, triggerOnce, hasIntersected, enabled]);

    const isVisible = triggerOnce ? hasIntersected : entry?.isIntersecting ?? false;

    return { ref, isVisible, entry };
}
