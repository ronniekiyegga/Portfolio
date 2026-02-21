"use client";

import React, { createContext, useContext, useState } from "react";

type LoadingContextType = {
  isAppReady: boolean;
  setAppReady: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isAppReady, setIsAppReady] = useState(false);

  const setAppReady = () => setIsAppReady(true);

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
