"use client";

import { useMemo } from "react";

import InfiniteSpiral from "@/app/components/InfiniteSpiral";

import type { DesignWork } from "./design-work";

function spiralSource(item: DesignWork) {
  return item.mediaType === "video" ? item.poster : item.src;
}

export function DesignSpiralGallery({
  items,
  onOpen,
}: {
  items: DesignWork[];
  onOpen: (item: DesignWork) => void;
}) {
  const byId = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  const spiralItems = useMemo(
    () =>
      items.flatMap((item) => {
        const src = spiralSource(item);
        if (!src) return [];
        return [
          {
            id: item.id,
            src,
            alt: item.title,
            label: item.title,
          },
        ];
      }),
    [items],
  );

  return (
    <div className="designSpiral">
      <InfiniteSpiral
        items={spiralItems}
        grayscale={0}
        cardWidth={192}
        cardHeight={192}
        cardRadius={10}
        radius={290}
        verticalSpacing={104}
        cardsPerTurn={6}
        centerScale={1.16}
        edgeFade={0.28}
        edgeBlur={8}
        pauseOnHover
        animationMode="auto"
        onItemSelect={(item) => {
          const work = byId.get(String(item.id));
          if (work) onOpen(work);
        }}
      />
    </div>
  );
}
