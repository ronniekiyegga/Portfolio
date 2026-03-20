"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * On refresh: disables scroll restoration, resets scroll to top, and refreshes
 * ScrollTrigger when the app is ready so all scroll-triggered animations reset properly.
 */
export default function ScrollTriggerReset() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduce scroll callback overhead for smoother performance
    ScrollTrigger.config({ limitCallbacks: true });

    // Disable browser scroll restoration so refresh always starts at top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Reset scroll to top on load (handles refresh when browser might restore position)
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger when DOM is ready
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return null;
}
