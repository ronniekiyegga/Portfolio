import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getCenteredScrollLeft,
  getClosestThoughtCard,
  getClosestThoughtCardAt,
  projectVelocity,
  type ThoughtCardElement,
} from "./carousel-geometry";

export function useThoughtCarousel() {
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

  return {
    activeThought,
    isCarousel,
    scrollToThought,
    trackProps: {
      ref: thoughtsRef,
      onScroll: handleThoughtScroll,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: finishPointerDrag,
      onPointerCancel: finishPointerDrag,
      onWheel: cancelSettle,
      onClickCapture: handleThoughtClickCapture,
      onDragStart: (event: ReactMouseEvent<HTMLDivElement>) => {
        if (isCarousel) event.preventDefault();
      },
    },
  };
}
