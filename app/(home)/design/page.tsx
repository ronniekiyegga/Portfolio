import type { Metadata } from "next";

import { DesignArchiveSection } from "../_features/design-archive/DesignArchiveSection";

export const metadata: Metadata = {
  title: "Design | Ronnie Kiyegga",
  description:
    "A growing collection of interfaces, components, interactions and small, unfinished ideas.",
};

export default function DesignPage() {
  return (
    <div className="page subpage designPage">
      <DesignArchiveSection />
    </div>
  );
}
