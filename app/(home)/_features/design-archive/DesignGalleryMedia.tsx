"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useInView } from "./use-in-view";
import type { DesignWork } from "./design-work";

const SonukumarShader = dynamic(
  () =>
    import("./SonukumarShader").then((module) => module.SonukumarShader),
  { ssr: false },
);

function GalleryVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const [ref, isInView] = useInView<HTMLVideoElement>("40px");
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (isInView && !reduceMotion.current) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isInView, ref]);

  return (
    <video
      ref={ref}
      className="designCardMedia"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={title}
    />
  );
}

function GalleryImage({
  src,
  sizes,
  eager,
}: {
  src: string;
  sizes: string;
  eager: boolean;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // An eager image can finish before hydration attaches `onLoad`.
  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, []);

  return (
    <Image
      ref={imageRef}
      className="designCardMedia"
      src={src}
      alt=""
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      data-loaded={isLoaded || undefined}
      onLoad={() => setIsLoaded(true)}
      onError={() => setIsLoaded(true)}
    />
  );
}

export function DesignGalleryMedia({
  item,
  sizes,
  eager,
}: {
  item: DesignWork;
  sizes: string;
  eager: boolean;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>("120px");

  if (item.mediaType === "video" && item.src) {
    return (
      <GalleryVideo src={item.src} poster={item.poster} title={item.title} />
    );
  }

  if (item.mediaType === "shader") {
    return (
      <div ref={ref} className="designCardShader">
        {isInView ? (
          <SonukumarShader
            theme="light"
            background={{ dark: "#0f1220", light: "#fafafa" }}
          />
        ) : (
          <span className="designCardFallback" aria-hidden />
        )}
      </div>
    );
  }

  if (item.src) {
    return <GalleryImage src={item.src} sizes={sizes} eager={eager} />;
  }

  return (
    <span className="designCardFallback" aria-hidden>
      <svg
        className="designCardMark"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M10 14a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 6.93"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M14 10a5 5 0 0 0-7.07 0L5.5 11.41a5 5 0 0 0 7.07 7.07L14 17.07"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
