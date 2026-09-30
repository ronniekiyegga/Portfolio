import { Fragment } from "react";

import { cn } from "@/lib/utils";

import { GradientDot } from "./GradientDot";
import { thoughtCategoryTitle, type ThoughtPost } from "./thoughts";

export function ThoughtTags({
  thought,
  className,
}: {
  thought: Pick<ThoughtPost, "category" | "tags">;
  className?: string;
}) {
  return (
    <span className={cn("thoughtTags", className)}>
      <span className="thoughtTagCategory">
        <span className="thoughtTagCategoryLabel">
          {thoughtCategoryTitle(thought.category)}
        </span>
      </span>
      {thought.tags.map((tag) => (
        <Fragment key={tag}>
          <GradientDot />
          <span className="thoughtTag">{tag}</span>
        </Fragment>
      ))}
    </span>
  );
}
