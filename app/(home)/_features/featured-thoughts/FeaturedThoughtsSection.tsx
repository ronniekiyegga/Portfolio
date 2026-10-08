"use client";

import Link from "next/link";
import { Fragment } from "react";
import { SpecularPill } from "@/app/components/SpecularButton";

import { useThoughtCarousel } from "./use-thought-carousel";
import {
  featuredInvestigation,
  supportingThoughts,
  type SupportingThought,
} from "./featured-thoughts";

function ThoughtCard({
  category,
  title,
  tag,
  date,
  description,
  href,
  isActive,
  isClone,
  thoughtIndex,
  copyIndex,
}: SupportingThought & {
  isActive: boolean;
  isClone: boolean;
  thoughtIndex: number;
  copyIndex: number;
}) {
  return (
    <article
      className={`thoughtCard${isActive ? " is-active" : ""}`}
      data-thought-index={thoughtIndex}
      data-copy-index={copyIndex}
      aria-hidden={isClone || undefined}
    >
      <Link
        className="thoughtCardImage"
        href={href}
        tabIndex={isClone ? -1 : undefined}
      >
        <div className="thoughtCardCopy">
          <span className="thoughtCardCategory">{category}</span>
          <span className="thoughtCardMobileMeta">
            <strong>{tag}</strong>
            <span>•</span>
            {date}
          </span>
          <h3>{title}</h3>
        </div>
      </Link>
      <p className="thoughtCardMeta">
        <strong>{tag}</strong>
        <span>•</span>
        {date}
      </p>
      <p className="thoughtCardExcerpt">{description}</p>
      <p className="thoughtCardRead">
        <Link href={href} tabIndex={isClone ? -1 : undefined}>
          Read full article
          <span className="thoughtCardPlay" aria-hidden />
        </Link>
      </p>
    </article>
  );
}

export function FeaturedThoughtsSection({
  exploreHref = "/thoughts",
}: {
  exploreHref?: string;
}) {
  const { activeThought, isCarousel, scrollToThought, trackProps } =
    useThoughtCarousel();

  const renderedThoughts = isCarousel
    ? [0, 1, 2].flatMap((copyIndex) =>
        supportingThoughts.map((thought, thoughtIndex) => ({
          ...thought,
          copyIndex,
          thoughtIndex,
          isClone: copyIndex !== 1,
        })),
      )
    : supportingThoughts.map((thought, thoughtIndex) => ({
        ...thought,
        copyIndex: 1,
        thoughtIndex,
        isClone: false,
      }));

  return (
    <section
      id="exploration"
      className="thoughts reveal"
      aria-labelledby="featured-thoughts-heading"
    >
      <div className="featuredThought">
        <div className="featuredCopy lg:pt-2">
          <p className="articleMeta">
            <strong>Engineering</strong>
          </p>
          <h2 id="featured-thoughts-heading">Thinking past the first fix</h2>
          <p>
            Notes on performance, reliability and the engineering decisions
            behind software that holds up in practice.
          </p>
          <SpecularPill className="readButton" href={exploreHref}>
            Explore the notes <span aria-hidden>▸</span>
          </SpecularPill>
        </div>
        <Link
          className="featuredCard"
          href={featuredInvestigation.href}
          aria-label={`Read ${featuredInvestigation.headlineLines.join(" ")}`}
        >
          <span className="thoughtCardCategory">
            {featuredInvestigation.category}
          </span>
          <h3>
            {featuredInvestigation.headlineLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? " " : null}
                <span className="featuredTitleLine">{line}</span>
              </Fragment>
            ))}
          </h3>
          <span className="featuredTag">• Read investigation →</span>
        </Link>
      </div>

      <div
        className="thoughtCards"
        {...trackProps}
        role={isCarousel ? "region" : undefined}
        aria-roledescription={isCarousel ? "carousel" : undefined}
        aria-label={isCarousel ? "More featured thoughts" : undefined}
      >
        {renderedThoughts.map((thought) => (
          <ThoughtCard
            {...thought}
            isActive={activeThought === thought.thoughtIndex}
            key={`${thought.copyIndex}-${thought.title}`}
          />
        ))}
      </div>
      <div className="thoughtPagination" aria-label="Choose a thought">
        {supportingThoughts.map((thought, index) => (
          <button
            type="button"
            key={thought.title}
            aria-label={`Show ${thought.title}`}
            aria-current={activeThought === index ? "true" : undefined}
            onClick={() => scrollToThought(index)}
          />
        ))}
      </div>
    </section>
  );
}
