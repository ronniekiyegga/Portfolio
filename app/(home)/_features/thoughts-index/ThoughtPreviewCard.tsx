import Link from "next/link";

import { formatDayMonthYear } from "@/lib/format-date";

import { thoughtCategoryTitle, type ThoughtPost } from "./thoughts";

export function ThoughtPreviewCard({
  thought,
  layout,
}: {
  thought: ThoughtPost;
  layout: "featured" | "grid";
}) {
  const isFeaturedLayout = layout === "featured";
  const cardClassName = isFeaturedLayout
    ? "featuredCard"
    : `thoughtsGridCard${thought.isFeatured ? " is-featured" : ""}`;

  return (
    <article className="thoughtsFeature">
      <Link
        className={cardClassName}
        href={thought.href}
        aria-label={`Read ${thought.overlayTitle}`}
      >
        <span className="thoughtsCardCopy">
          <span className="featuredDate">
            {thoughtCategoryTitle(thought.category)}
          </span>
          <h3>{thought.overlayTitle}</h3>
        </span>
      </Link>

      <div className="thoughtsFeatureText">
        <div className="thoughtsFeatureBody">
          <p className="thoughtsFeatureMeta">
            <strong>{thoughtCategoryTitle(thought.category)}</strong>
            <span aria-hidden>•</span>
            <time dateTime={thought.dateTime}>
              {formatDayMonthYear(thought.dateTime)}
            </time>
          </p>
          {isFeaturedLayout ? (
            <h3>
              <Link href={thought.href} title={thought.title}>
                {thought.title}
              </Link>
            </h3>
          ) : null}
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
