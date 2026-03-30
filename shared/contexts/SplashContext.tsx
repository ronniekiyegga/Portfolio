"use client";

import React, { createContext, useContext, useState } from "react";

type SplashContextType = {
  splashActive: boolean;
  setSplashActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const SplashContext = createContext<SplashContextType | null>(null);

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [splashActive, setSplashActive] = useState(false);
  return (
    <SplashContext.Provider value={{ splashActive, setSplashActive }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) {
    return { splashActive: false, setSplashActive: () => {} };
  }
  return ctx;
}
