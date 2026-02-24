"use client";

import { useLoading } from "@/app/contexts/LoadingContext";
import LoadingScreen from "./LoadingScreen";

function scrollToHero() {
  requestAnimationFrame(() => {
    document.getElementById("hero-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

export default function LoadingScreenGate() {
  const { isAppReady, setAppReady } = useLoading();

  const handleComplete = () => {
    setAppReady();
    scrollToHero();
  };

  if (isAppReady) return null;

  return <LoadingScreen onComplete={handleComplete} />;
}
