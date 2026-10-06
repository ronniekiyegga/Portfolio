"use client";

import Link from "next/link";
import { SpecularPill } from "@/app/components/SpecularButton";
import {
  featuredInvestigationSlug,
  thoughtPath,
} from "../thoughts-index/thoughts";
import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const featuredInvestigationHref = thoughtPath(featuredInvestigationSlug);

const supportingThoughts = [
  {
    category: "System Design",
    title: "Why disabling the button did not stop the duplicate request",
    tag: "Reliability",
    date: "15 Sept 2026",
    description: "Retries, duplicate delivery and durable business invariants",
    href: thoughtPath("idempotency-matters"),
  },
  {
    category: "Product",
    title: "Why the empty state should come before the happy path",
    tag: "Product judgement",
    date: "14 Aug 2026",
    description:
      "Designing the first useful action before the populated dashboard",
    href: thoughtPath("empty-state-first"),
  },
  {
    category: "Design",
    title: "Why a component library can make product delivery slower",
    tag: "Design systems",
    date: "9 Jun 2026",
    description: "Reuse only helps when the underlying decision is stable",
    href: thoughtPath("design-systems-remove-decisions"),
  },
] as const;

type ThoughtCardElement = HTMLElement & {
  dataset: DOMStringMap & {
    thoughtIndex?: string;
    copyIndex?: string;
  };
};

function getThoughtCards(track: HTMLDivElement) {
  return Array.from(
    track.querySelectorAll<ThoughtCardElement>("[data-thought-index]"),
  );
}

function getClosestThoughtCard(track: HTMLDivElement) {
  return getClosestThoughtCardAt(track, track.scrollLeft);
}

function getClosestThoughtCardAt(track: HTMLDivElement, scrollLeft: number) {
  const center = scrollLeft + track.clientWidth / 2;

  return getThoughtCards(track).reduce<{
    card: ThoughtCardElement | null;
    distance: number;
  }>(
    (best, card) => {
      const distance = Math.abs(
        card.offsetLeft + card.offsetWidth / 2 - center,
      );
      return distance < best.distance ? { card, distance } : best;
    },
    { card: null, distance: Number.POSITIVE_INFINITY },
  ).card;
}

function getCenteredScrollLeft(
  track: HTMLDivElement,
  card: ThoughtCardElement,
) {
  return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
}

function projectVelocity(velocity: number, decelerationRate = 0.99) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

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
}: (typeof supportingThoughts)[number] & {
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
  const [activeThought, setActiveThought] = useState(1);
  const [isCarousel, setIsCarousel] = useState(false);
  const thoughtsRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const dragFrameRef = useRef<number | null>(null);
  const settleFrameRef = useRef<number | null>(null);
  const clickResetTimerRef = useRef<number | null>(null);
  const pendingScrollLeftRef = useRef(0);
  const suppressClickRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
    samples: Array<{ x: number; time: number }>;
  } | null>(null);
  const settleRef = useRef<{
    position: number;
    velocity: number;
    target: number;
    lastTime: number;
  } | null>(null);

  const cancelSettle = useCallback(() => {
    if (settleFrameRef.current !== null) {
      cancelAnimationFrame(settleFrameRef.current);
      settleFrameRef.current = null;
    }
    settleRef.current = null;
    thoughtsRef.current?.classList.remove("is-settling");
  }, []);

  const scrollToThought = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = thoughtsRef.current;
      const card = track?.querySelector<ThoughtCardElement>(
        `[data-copy-index="1"][data-thought-index="${index}"]`,
      );
      if (!track || !card) return;

      track.scrollTo({
        left: getCenteredScrollLeft(track, card),
        behavior,
      });
      setActiveThought(index);
    },
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 52rem)");
    let frame: number | null = null;

    const syncLayout = () => {
      setIsCarousel(mediaQuery.matches);
      if (mediaQuery.matches) {
        frame = requestAnimationFrame(() => scrollToThought(1, "auto"));
      }
    };

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncLayout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [scrollToThought]);

  useEffect(
    () => () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
      if (dragFrameRef.current) cancelAnimationFrame(dragFrameRef.current);
      if (settleFrameRef.current) cancelAnimationFrame(settleFrameRef.current);
      if (clickResetTimerRef.current) {
        window.clearTimeout(clickResetTimerRef.current);
      }
    },
    [],
  );

  const handleThoughtScroll = () => {
    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      const track = thoughtsRef.current;
      if (!track) return;
      const closest = getClosestThoughtCard(track);
      if (!closest) return;

      const thoughtIndex = Number(closest.dataset.thoughtIndex);
      const copyIndex = Number(closest.dataset.copyIndex);
      setActiveThought(thoughtIndex);

      if (isCarousel && copyIndex !== 1) {
        const equivalent = track.querySelector<ThoughtCardElement>(
          `[data-copy-index="1"][data-thought-index="${thoughtIndex}"]`,
        );

        if (equivalent) {
          const shift = equivalent.offsetLeft - closest.offsetLeft;
          track.scrollLeft += shift;
          pendingScrollLeftRef.current += shift;
          if (dragRef.current) {
            dragRef.current.startScrollLeft += shift;
          }
          if (settleRef.current) {
            settleRef.current.position += shift;
            settleRef.current.target += shift;
          }
        }
      }
    });
  };

  const settleToCard = (
    track: HTMLDivElement,
    card: ThoughtCardElement,
    initialVelocity: number,
  ) => {
    cancelSettle();

    const target = getCenteredScrollLeft(track, card);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      track.scrollLeft = target;
      return;
    }

    track.classList.add("is-settling");
    settleRef.current = {
      position: track.scrollLeft,
      velocity: Math.max(-1800, Math.min(1800, initialVelocity)),
      target,
      lastTime: performance.now(),
    };

    const tick = (time: number) => {
      const spring = settleRef.current;
      if (!spring) return;

      const deltaTime = Math.min((time - spring.lastTime) / 1000, 0.032);
      spring.lastTime = time;

      const stiffness = 210;
      const damping = 2 * Math.sqrt(stiffness);
      const displacement = spring.position - spring.target;
      const acceleration =
        -stiffness * displacement - damping * spring.velocity;

      spring.velocity += acceleration * deltaTime;
      spring.position += spring.velocity * deltaTime;
      track.scrollLeft = spring.position;

      if (
        Math.abs(spring.position - spring.target) < 0.5 &&
        Math.abs(spring.velocity) < 5
      ) {
        track.scrollLeft = spring.target;
        track.classList.remove("is-settling");
        settleRef.current = null;
        settleFrameRef.current = null;
        return;
      }

      settleFrameRef.current = requestAnimationFrame(tick);
    };

    settleFrameRef.current = requestAnimationFrame(tick);
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (dragFrameRef.current) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
      event.currentTarget.scrollLeft = pendingScrollLeftRef.current;
    }

    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    suppressClickRef.current = drag.moved;
    if (clickResetTimerRef.current) {
      window.clearTimeout(clickResetTimerRef.current);
    }
    clickResetTimerRef.current = window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
    dragRef.current = null;

    const now = performance.now();
    const recentSamples = drag.samples.filter(
      (sample) => now - sample.time <= 120,
    );
    const firstSample = recentSamples[0] ?? drag.samples.at(-1);
    const lastSample = drag.samples.at(-1);
    const elapsed = Math.max(
      ((lastSample?.time ?? now) - (firstSample?.time ?? now)) / 1000,
      0.001,
    );
    const pointerVelocity =
      ((lastSample?.x ?? event.clientX) - (firstSample?.x ?? event.clientX)) /
      elapsed;
    const scrollVelocity = -pointerVelocity;
    const maxProjection = event.currentTarget.clientWidth * 0.35;
    const projection = Math.max(
      -maxProjection,
      Math.min(maxProjection, projectVelocity(scrollVelocity)),
    );
    const projectedScrollLeft = event.currentTarget.scrollLeft + projection;
    const closest = getClosestThoughtCardAt(
      event.currentTarget,
      projectedScrollLeft,
    );

    if (closest) {
      settleToCard(event.currentTarget, closest, scrollVelocity);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    cancelSettle();
    if (!isCarousel || event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
      samples: [{ x: event.clientX, time: performance.now() }],
    };
    pendingScrollLeftRef.current = event.currentTarget.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 3) drag.moved = true;
    const now = performance.now();
    drag.samples.push({ x: event.clientX, time: now });
    drag.samples = drag.samples.filter((sample) => now - sample.time <= 120);
    pendingScrollLeftRef.current = drag.startScrollLeft - distance;

    if (dragFrameRef.current === null) {
      dragFrameRef.current = requestAnimationFrame(() => {
        if (thoughtsRef.current) {
          thoughtsRef.current.scrollLeft = pendingScrollLeftRef.current;
        }
        dragFrameRef.current = null;
      });
    }
  };

  const handleThoughtClickCapture = (
    event: ReactMouseEvent<HTMLDivElement>,
  ) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

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
        <div className="featuredCopy">
          <p className="articleMeta">
            <strong>Engineering</strong>
            <span>•</span>
            Recently explored
          </p>
          <h2 id="featured-thoughts-heading">
            Problems I&apos;ve been thinking about lately
          </h2>
          <p>
            Recent investigations into performance, real-time systems, product
            decisions and the engineering trade-offs behind software that has to
            work in production.
          </p>
          <SpecularPill className="readButton" href={exploreHref}>
            Explore the work <span aria-hidden>▸</span>
          </SpecularPill>
        </div>
        <Link
          className="featuredCard"
          href={featuredInvestigationHref}
          aria-label="Read How would you keep a React interface responsive while processing 10,000 records?"
        >
          <span className="featuredDate">System Design</span>
          <h3>
            <span className="featuredTitleLine">
              How would you keep a React
            </span>{" "}
            <span className="featuredTitleLine">
              interface responsive while
            </span>{" "}
            <span className="featuredTitleLine">
              processing 10,000 records?
            </span>
          </h3>
          <span className="featuredTag">• Read investigation →</span>
        </Link>
      </div>

      <div
        className="thoughtCards"
        ref={thoughtsRef}
        onScroll={handleThoughtScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onWheel={cancelSettle}
        onClickCapture={handleThoughtClickCapture}
        onDragStart={(event) => {
          if (isCarousel) event.preventDefault();
        }}
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
