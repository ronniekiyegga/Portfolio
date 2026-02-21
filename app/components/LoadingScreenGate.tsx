"use client";

import { useLoading } from "@/app/contexts/LoadingContext";
import LoadingScreen from "./LoadingScreen";

export default function LoadingScreenGate() {
  const { isAppReady, setAppReady } = useLoading();

  if (isAppReady) return null;

  return <LoadingScreen onComplete={setAppReady} />;
}
