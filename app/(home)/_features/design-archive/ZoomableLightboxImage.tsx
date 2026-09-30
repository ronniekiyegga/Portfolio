"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";

const DRAG_THRESHOLD_PX = 4;
/** Below this gain, zooming would barely enlarge the image, so it is disabled. */
const MIN_ZOOM_GAIN = 1.15;

type ZoomOrigin = { x: number; y: number };
type DragState = { x: number; y: number; left: number; top: number; moved: boolean };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** One image pixel per device pixel: the sharpest the export can be shown. */
function nativeDisplayWidth(image: HTMLImageElement) {
  return image.naturalWidth / window.devicePixelRatio;
}

export function ZoomableLightboxImage({ src, alt }: { src: string; alt: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);

  const [isZoomable, setIsZoomable] = useState(false);
  const [zoomWidth, setZoomWidth] = useState(0);
  const [origin, setOrigin] = useState<ZoomOrigin | null>(null);
  const isZoomed = origin !== null;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !origin) return;
    viewport.scrollLeft = origin.x * viewport.scrollWidth - viewport.clientWidth / 2;
    viewport.scrollTop = origin.y * viewport.scrollHeight - viewport.clientHeight / 2;
  }, [origin]);

  const updateZoomable = () => {
    const image = imageRef.current;
    if (!image) return;
    const renderedWidth = image.getBoundingClientRect().width;
    setIsZoomable(nativeDisplayWidth(image) > renderedWidth * MIN_ZOOM_GAIN);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (isZoomed) {
      setOrigin(null);
      return;
    }

    const image = imageRef.current;
    if (!image || !isZoomable) return;

    const rect = image.getBoundingClientRect();
    const isKeyboardActivation = event.detail === 0;
    setZoomWidth(nativeDisplayWidth(image));
    setOrigin(
      isKeyboardActivation
        ? { x: 0.5, y: 0.5 }
        : {
            x: clamp01((event.clientX - rect.left) / rect.width),
            y: clamp01((event.clientY - rect.top) / rect.height),
          },
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!isZoomed || !viewport || event.pointerType !== "mouse") return;
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
      moved: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport) return;

    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) drag.moved = true;

    viewport.scrollLeft = drag.left - dx;
    viewport.scrollTop = drag.top - dy;
  };

  const handlePointerUp = () => {
    if (dragRef.current?.moved) suppressClickRef.current = true;
    dragRef.current = null;
  };

  return (
    <div
      ref={viewportRef}
      className="designLightboxViewport"
      data-zoomed={isZoomed || undefined}
      style={{ "--lightbox-zoom-width": `${zoomWidth}px` } as CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        dragRef.current = null;
      }}
    >
      <button
        type="button"
        className="designLightboxZoomButton"
        data-zoomable={isZoomable || undefined}
        aria-label={isZoomed ? "Zoom out" : "Zoom in to full resolution"}
        aria-pressed={isZoomed}
        disabled={!isZoomable && !isZoomed}
        onClick={handleClick}
      >
        <img
          ref={imageRef}
          className="designLightboxMedia"
          src={src}
          alt={alt}
          decoding="async"
          draggable={false}
          onLoad={updateZoomable}
        />
      </button>
    </div>
  );
}
