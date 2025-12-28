"use client";

import { useEffect, useState } from "react";

export function useResize() {
    const MOBILE = 768;
    const TABLET = 1024;

    const [isMobile, setIsMobile] = useState(false);
    const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkScreen = () => {
            const width = window.innerWidth;

            if (width <= MOBILE) {
                setIsMobile(true);
                setDevice("mobile");
            } else if (width <= TABLET) {
                setIsMobile(false);
                setDevice("tablet");
            } else {
                setIsMobile(false);
                setDevice("desktop");
            }
        };

        // Initial check
        checkScreen();

        // Listen for resize
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return { isMobile, device };
}
