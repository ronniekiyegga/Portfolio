"use client";

import type { CSSProperties } from "react";

import { DesignGalleryMedia } from "./DesignGalleryMedia";
import { designCategoryLabels, type DesignWork } from "./design-work";

const GRID_REVEAL_LINE = 0.85;

function CardMeta({ item }: { item: DesignWork }) {
  return (
    <span className="designCardMeta">
      <strong>{item.title}</strong>
      <span>
        {designCategoryLabels[item.category]} · {item.type}
      </span>
    </span>
  );
}

export function DesignGalleryCard({
  item,
  style,
  sizes,
  eager = false,
  onOpen,
}: {
  item: DesignWork;
  style?: CSSProperties;
  sizes: string;
  eager?: boolean;
  onOpen: (item: DesignWork) => void;
}) {
  const label = `${item.title}. ${item.category}, ${item.type}.`;

  return (
    <article
      className="designCard reveal"
      data-reveal-line={GRID_REVEAL_LINE}
      style={{ "--design-card-aspect": item.aspectRatio, ...style } as CSSProperties}
    >
      <button
        type="button"
        className="designCardLink"
        aria-label={label}
        onClick={() => onOpen(item)}
      >
        <span className="designCardFrame">
          <DesignGalleryMedia item={item} sizes={sizes} eager={eager} />
        </span>
        <CardMeta item={item} />
      </button>
    </article>
  );
}
