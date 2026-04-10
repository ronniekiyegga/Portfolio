"use client";

import { useEffect } from "react";
import { useLoading } from "@/shared/contexts/LoadingContext";
import LoadingScreen from "./LoadingScreen";

function scrollToHero() {
  requestAnimationFrame(() => {
    document.getElementById("work")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

export default function LoadingScreenGate({ disabled = false }: { disabled?: boolean }) {
  const { isAppReady, setAppReady } = useLoading();

  useEffect(() => {
    if (disabled) setAppReady();
  }, [disabled, setAppReady]);

  const handleComplete = () => {
    setAppReady();
    scrollToHero();
  };

  if (disabled || isAppReady) return null;

  return <LoadingScreen onComplete={handleComplete} />;
}
