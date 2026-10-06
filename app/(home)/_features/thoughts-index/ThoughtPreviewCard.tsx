import Link from "next/link";

import { GradientDot } from "./GradientDot";
import { thoughtCategoryTitle, type ThoughtPost } from "./thoughts";

export function ThoughtPreviewCard({
  thought,
  cover,
}: {
  thought: ThoughtPost;
  cover: "featured" | "grid";
}) {
  const isFeatured = cover === "featured";

  return (
    <article className="thoughtsFeature">
      <Link
        className={isFeatured ? "featuredCard" : "thoughtsGridCard"}
        href={thought.href}
        aria-label={`Read ${thought.overlayTitle}`}
      >
        <span className="thoughtsCardCopy">
          <span className="featuredDate">
            {thoughtCategoryTitle(thought.category)}
          </span>
          <h3>
            {isFeatured && thought.overlayLines
              ? thought.overlayLines.map((line) => (
                  <span className="featuredTitleLine" key={line}>
                    {line}
                  </span>
                ))
              : thought.overlayTitle}
          </h3>
        </span>
      </Link>

      <div className="thoughtsFeatureText">
        <div className="thoughtsFeatureBody">
          <p className="thoughtsFeatureMeta">
            <strong>{thoughtCategoryTitle(thought.category)}</strong>
            <GradientDot />
            <time dateTime={thought.dateTime}>{thought.date}</time>
          </p>
          <h3>
            <Link href={thought.href} title={thought.title}>
              {thought.title}
            </Link>
          </h3>
          <p className="thoughtsFeatureCopy">{thought.description}</p>
        </div>

        <div className="thoughtsFeatureFooter">
          <Link href={thought.href}>
            Read more
            <span className="thoughtCardPlay" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
