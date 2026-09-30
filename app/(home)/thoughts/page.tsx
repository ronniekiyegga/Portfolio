import type { Metadata } from "next";

import { AllPostsSection } from "../_features/all-posts/AllPostsSection";
import { ThoughtsIndexSection } from "../_features/thoughts-index/ThoughtsIndexSection";

export const metadata: Metadata = {
  title: "Thoughts | Ronnie Kiyegga",
  description: "Writing about concrete software engineering problems.",
};

export default function ThoughtsPage() {
  return (
    <div className="page subpage">
      <ThoughtsIndexSection />
      <AllPostsSection />
    </div>
  );
}
