"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { DesignWork } from "./design-work";
import { ZoomableLightboxImage } from "./ZoomableLightboxImage";

function stepIndex(index: number, delta: number, length: number) {
  if (length <= 0 || index < 0) return -1;
  return (index + delta + length) % length;
}

function previewSrc(item: DesignWork) {
  return item.mediaType === "video" ? item.poster ?? item.src : item.src;
}

function preloadWork(item?: DesignWork) {
  const src = item && previewSrc(item);
  if (!src) return;
  const image = new Image();
  image.src = src;
}

const ARROW_MASK = {
  left: `url("data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>',
  )}")`,
  right: `url("data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  )}")`,
} as const;

function LightboxSlide({
  item,
  state,
  onExitEnd,
}: {
  item: DesignWork;
  state: "static" | "enter" | "exit";
  onExitEnd?: () => void;
}) {
  return (
    <div
      className={cn(
        "designLightboxSlide",
        state === "enter" && "is-enter",
        state === "exit" && "is-exit",
      )}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (state === "exit") onExitEnd?.();
      }}
    >
      {item.src && item.mediaType === "video" ? (
        <video
          className="designLightboxMedia"
          src={item.src}
          poster={item.poster}
          muted
          loop
          autoPlay
          playsInline
        />
      ) : item.src ? (
        <ZoomableLightboxImage src={item.src} alt={item.title} />
      ) : null}
    </div>
  );
}

export function DesignLightbox({
  item,
  items,
  onClose,
  onItemChange,
}: {
  item: DesignWork | null;
  items: DesignWork[];
  onClose: () => void;
  onItemChange: (item: DesignWork) => void;
}) {
  const index = item ? items.findIndex((entry) => entry.id === item.id) : -1;
  const [travel, setTravel] = useState(1);
  const shownRef = useRef<DesignWork | null>(item);
  const [shown, setShown] = useState<DesignWork | null>(item);
  const [leaving, setLeaving] = useState<DesignWork | null>(null);

  const go = useCallback(
    (delta: number) => {
      const nextIndex = stepIndex(index, delta, items.length);
      if (nextIndex < 0) return;
      setTravel(delta);
      onItemChange(items[nextIndex]);
    },
    [index, items, onItemChange],
  );

  useEffect(() => {
    if (!item) {
      shownRef.current = null;
      setShown(null);
      setLeaving(null);
      return;
    }

    const current = shownRef.current;
    if (!current) {
      shownRef.current = item;
      setShown(item);
      return;
    }

    if (current.id === item.id) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      shownRef.current = item;
      setShown(item);
      setLeaving(null);
      return;
    }

    let cancelled = false;
    const src = previewSrc(item);

    const commit = () => {
      if (cancelled) return;
      setLeaving(current);
      shownRef.current = item;
      setShown(item);
    };

    if (!src) {
      commit();
      return;
    }

    const preloader = new Image();
    preloader.src = src;
    if (preloader.complete) {
      commit();
    } else {
      preloader.onload = commit;
      preloader.onerror = commit;
    }

    return () => {
      cancelled = true;
    };
  }, [item]);

  useEffect(() => {
    if (index < 0) return;
    preloadWork(items[stepIndex(index, 1, items.length)]);
    preloadWork(items[stepIndex(index, -1, items.length)]);
  }, [index, items]);

  return (
    <Dialog.Root
      open={item !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="designLightboxOverlay" />
        <Dialog.Content
          className="designLightbox"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              go(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              go(1);
            }
          }}
        >
          <Dialog.Title className="sr-only">
            {item?.title ?? "Design preview"}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Expanded view of the selected design. Use the arrows or left and
            right keys to see more.
          </Dialog.Description>

          <Dialog.Close className="designLightboxClose" aria-label="Close preview">
            <X size={18} strokeWidth={2} />
          </Dialog.Close>

          <div
            className="designLightboxFrame"
            style={{ "--lightbox-travel": travel } as CSSProperties}
          >
            {leaving ? (
              <LightboxSlide
                key={`${leaving.id}-exit`}
                item={leaving}
                state="exit"
                onExitEnd={() => setLeaving(null)}
              />
            ) : null}
            {shown ? (
              <LightboxSlide
                key={`${shown.id}-enter`}
                item={shown}
                state={leaving ? "enter" : "static"}
              />
            ) : null}
          </div>

          <div className="designLightboxNav">
            <button
              type="button"
              className="designLightboxArrow"
              aria-label="Previous design"
              style={{ "--arrow-mask": ARROW_MASK.left } as CSSProperties}
              onClick={() => go(-1)}
            >
              <span className="designLightboxArrowIcon" aria-hidden />
            </button>
            <button
              type="button"
              className="designLightboxArrow"
              aria-label="Next design"
              style={{ "--arrow-mask": ARROW_MASK.right } as CSSProperties}
              onClick={() => go(1)}
            >
              <span className="designLightboxArrowIcon" aria-hidden />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
