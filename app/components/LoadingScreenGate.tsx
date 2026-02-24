"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/app/contexts/LoadingContext";
import LoadingScreen from "./LoadingScreen";

const STORAGE_KEY = "appLoadingComplete";

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
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setAppReady();
    }
    setHasCheckedStorage(true);
  }, [setAppReady]);

  const handleComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
    setAppReady();
    scrollToHero();
  };

  if (!hasCheckedStorage) return null;
  if (isAppReady) return null;

  return <LoadingScreen onComplete={handleComplete} />;
}
