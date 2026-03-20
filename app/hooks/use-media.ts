"use client"

import { useState, useEffect } from "react"

/**
 * SSR-safe media query hook. Defaults to false (mobile) to avoid hydration
 * mismatch on mobile devices and desktop-first flash.
 */
export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = () => setMatches(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [query])

  return matches
}