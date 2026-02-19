"use client";

import React from "react";
import Header from "./header";
import ThemeToggle from "./ThemeToggle";
import SplashCursor from "./SplashCursor";

const SCROLL_THRESHOLD = 20;

/**
 * Wrapper that coordinates header visibility and floating controls.
 * - Header (with right pill: theme + SplashCursor) shows when at top
 * - Floating div (ThemeToggle + SplashCursor) shows only when header is hidden (scrolled)
 */
export default function HeaderWithFloatingControls() {
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const [splashActive, setSplashActive] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsHeaderVisible(window.scrollY <= SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header
        isHeaderVisible={isHeaderVisible || isMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuChange={setIsMobileMenuOpen}
        splashActive={splashActive}
        setSplashActive={setSplashActive}
      />
      <ThemeToggle
        isVisible={!isHeaderVisible}
        splashActive={splashActive}
        setSplashActive={setSplashActive}
      />
      {splashActive && <SplashCursor />}
    </>
  );
}
