"use client";

import { useLiveVisitorCount } from "./use-live-visitor-count";
import { VisitorCount } from "./VisitorCount";

type LiveVisitorCountProps = {
  initialCount: number | null;
};

export function LiveVisitorCount({ initialCount }: LiveVisitorCountProps) {
  const count = useLiveVisitorCount(initialCount);

  return <VisitorCount count={count} ticked={count !== initialCount} />;
}
