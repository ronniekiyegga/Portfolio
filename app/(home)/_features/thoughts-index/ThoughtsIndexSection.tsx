"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { GradientDot } from "./GradientDot";
import {
  featuredThoughts,
  gridThoughts,
  thoughtCategories,
  thoughtCategoryTitle,
  type ThoughtCategorySlug,
  type ThoughtPost,
} from "./thoughts";

const ThoughtsSearch = dynamic(
  () => import("./ThoughtsSearch").then((module) => module.ThoughtsSearch),
  {
    loading: () => (
      <button
        type="button"
        className="thoughtsSearch"
        aria-label="Search thoughts"
        disabled
      >
        <span className="thoughtsSearchLabel">
          <Search aria-hidden size={14} strokeWidth={1.75} />
          Search...
        </span>
      </button>
    ),
  },
);

const SonukumarShader = dynamic(
  () =>
    import("../design-archive/SonukumarShader").then(
      (module) => module.SonukumarShader,
    ),
  { ssr: false },
);

function filterThoughts<T extends ThoughtPost>(
  thoughts: T[],
  category: ThoughtCategorySlug,
) {
  return category === "all"
    ? thoughts
    : thoughts.filter((thought) => thought.category === category);
}

function ThoughtArticle({
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

export function ThoughtsIndexSection() {
  const [activeCategory, setActiveCategory] =
    useState<ThoughtCategorySlug>("all");

  const visibleFeatured = useMemo(
    () => filterThoughts(featuredThoughts, activeCategory),
    [activeCategory],
  );
  const visibleGrid = useMemo(
    () => filterThoughts(gridThoughts, activeCategory),
    [activeCategory],
  );

  return (
    <section className="thoughtsIndex" aria-labelledby="thoughts-index-heading">
      <div className="thoughtsIndexHero">
        <div className="thoughtsIndexShader" aria-hidden>
          <SonukumarShader
            theme="light"
            background={{ dark: "#0f1220", light: "#fafafa" }}
          />
        </div>

        <header className="thoughtsIndexHeader reveal">
          <p className="thoughtsIndexMeta">
            <strong>Blog</strong>
          </p>
          <h1 id="thoughts-index-heading">Questions I keep coming back to</h1>
          <p className="thoughtsIndexLead">
            A growing collection of notes on performance, product, and the
            systems questions I keep circling.
          </p>
        </header>

        <div className="thoughtsToolbar">
          <div
            className="thoughtsFilters"
            role="tablist"
            aria-label="Thought categories"
          >
            {thoughtCategories.map((category) => {
              const isActive = activeCategory === category.slug;
              return (
                <button
                  type="button"
                  key={category.slug}
                  role="tab"
                  aria-selected={isActive}
                  className="thoughtsFilter"
                  onClick={() => setActiveCategory(category.slug)}
                >
                  <span className={cn(isActive && "is-active")}>
                    {category.title}
                  </span>
                </button>
              );
            })}
          </div>
          <ThoughtsSearch onSelectCategory={setActiveCategory} />
        </div>
      </div>

      <div className="thoughtsBoard reveal">
        {visibleFeatured.length > 0 ? (
          <div className="thoughtsFeatured">
            {visibleFeatured.map((thought) => (
              <ThoughtArticle
                key={thought.slug}
                thought={thought}
                cover="featured"
              />
            ))}
          </div>
        ) : null}

        {visibleGrid.length > 0 ? (
          <div className="thoughtsGrid">
            {visibleGrid.map((thought) => (
              <ThoughtArticle
                key={thought.slug}
                thought={thought}
                cover="grid"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
