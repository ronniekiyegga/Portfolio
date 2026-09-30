"use client";

import { useEffect, useRef, useState } from "react";

export const VISITOR_POLL_INTERVAL_MS = 30_000;

const VISITS_ENDPOINT = "/api/visits";

type VisitsResponse = { count: number | null };

async function requestVisitorCount(method: "GET" | "POST"): Promise<number | null> {
  try {
    const response = await fetch(VISITS_ENDPOINT, { method });
    if (!response.ok) return null;
    const body = (await response.json()) as VisitsResponse;
    return typeof body.count === "number" ? body.count : null;
  } catch {
    return null;
  }
}

function keepHighest(current: number | null, next: number | null): number | null {
  if (next === null) return current;
  if (current === null) return next;
  return Math.max(current, next);
}

export function useLiveVisitorCount(initialCount: number | null): number | null {
  const [count, setCount] = useState(initialCount);
  const hasRecordedVisit = useRef(false);

  useEffect(() => {
    if (hasRecordedVisit.current) return;
    hasRecordedVisit.current = true;

    void requestVisitorCount("POST").then((next) => {
      setCount((current) => keepHighest(current, next));
    });
  }, []);

  useEffect(() => {
    let intervalId: number | undefined;

    const refresh = () => {
      void requestVisitorCount("GET").then((next) => {
        setCount((current) => keepHighest(current, next));
      });
    };

    const startPolling = () => {
      if (intervalId === undefined) {
        intervalId = window.setInterval(refresh, VISITOR_POLL_INTERVAL_MS);
      }
    };

    const stopPolling = () => {
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
        startPolling();
      } else {
        stopPolling();
      }
    };

    if (document.visibilityState === "visible") startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return count;
}
