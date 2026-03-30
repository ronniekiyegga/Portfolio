"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "loading-complete";

type LoadingContextType = {
  isAppReady: boolean;
  setAppReady: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setIsAppReady(true);
    } catch {
      /* ignore */
    }
  }, []);

  const setAppReady = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setIsAppReady(true);
  };

  return (
    <LoadingContext.Provider value={{ isAppReady, setAppReady }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    return { isAppReady: true, setAppReady: () => {} };
  }
  return ctx;
}
