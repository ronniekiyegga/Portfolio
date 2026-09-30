"use client";

import { useMemo, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { PanelLeftRightDashed, Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { DesignGalleryCard } from "./DesignGalleryCard";
import {
  designCategories,
  designSorts,
  designWork,
  filterDesignWork,
  sortDesignWork,
  type DesignCategorySlug,
  type DesignSortSlug,
  type DesignWork,
} from "./design-work";
import {
  FEATURED_FRAME,
  MASONRY_IMAGE_SIZES,
  partitionFeaturedDesignWork,
} from "./featured-layout";

const SonukumarShader = dynamic(
  () =>
    import("./SonukumarShader").then((module) => module.SonukumarShader),
  { ssr: false },
);

const DesignLightbox = dynamic(() =>
  import("./DesignLightbox").then((module) => module.DesignLightbox),
);

const DesignSpiralGallery = dynamic(
  () =>
    import("./DesignSpiralGallery").then(
      (module) => module.DesignSpiralGallery,
    ),
  {
    ssr: false,
    loading: () => <div className="designSpiral" aria-hidden />,
  },
);

type DesignLayout = "grid" | "spiral";

export function DesignArchiveSection() {
  const [category, setCategory] = useState<DesignCategorySlug>("all");
  const [sort, setSort] = useState<DesignSortSlug>("latest");
  const [layout, setLayout] = useState<DesignLayout>("grid");
  const [activeItem, setActiveItem] = useState<DesignWork | null>(null);

  const items = useMemo(
    () => sortDesignWork(filterDesignWork(designWork, category), sort),
    [category, sort],
  );

  const showFeaturedLayout = category === "all" && sort === "latest";
  const { featured, rest } = useMemo(
    () =>
      showFeaturedLayout
        ? partitionFeaturedDesignWork(items)
        : { featured: [], rest: items },
    [items, showFeaturedLayout],
  );
  const galleryItems = useMemo(
    () => [...featured.map(({ item }) => item), ...rest],
    [featured, rest],
  );

  return (
    <section className="designArchive" aria-labelledby="design-archive-heading">
      <div className="designArchiveHero">
        <div className="designArchiveShader" aria-hidden>
          <SonukumarShader
            theme="light"
            background={{ dark: "#0f1220", light: "#fafafa" }}
          />
        </div>

        <header className="designArchiveCopy reveal">
          <p className="designArchiveKicker">Design</p>
          <h1 id="design-archive-heading">
            A collection of things I&apos;ve designed.
          </h1>
          <p>
            A growing collection of interfaces, components, interactions and
            small, unfinished ideas.
          </p>
        </header>

        <div className="thoughtsToolbar">
          <div
            className="thoughtsFilters"
            role="tablist"
            aria-label="Design categories"
          >
            {designCategories.map((item) => {
              const isActive = category === item.slug;
              return (
                <button
                  type="button"
                  key={item.slug}
                  role="tab"
                  aria-selected={isActive}
                  className="thoughtsFilter"
                  onClick={() => setCategory(item.slug)}
                >
                  <span className={cn(isActive && "is-active")}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="designToolbarActions">
            <button
              type="button"
              className="designLayoutToggle"
              aria-pressed={layout === "spiral"}
              aria-label={
                layout === "spiral"
                  ? "Show grid layout"
                  : "Show spiral layout"
              }
              onClick={() =>
                setLayout((current) =>
                  current === "grid" ? "spiral" : "grid",
                )
              }
            >
              <PanelLeftRightDashed
                aria-hidden
                size={18}
                strokeWidth={1.75}
              />
            </button>

            <details className="designSort">
            <summary>
              <span className="designSortLead">
                <Search aria-hidden size={13} strokeWidth={1.75} />
                {sort === "latest" ? "Latest..." : "Oldest"}
              </span>
              <span className="designSortTrail">
                <span className="designSortRule" aria-hidden />
                <span className="designSortMenu" aria-hidden>
                  <span className="designSortCaret" />
                </span>
              </span>
            </summary>
            <div className="designSortOptions" role="listbox" aria-label="Sort design work">
              {designSorts.map((item) => (
                <button
                  type="button"
                  role="option"
                  key={item.slug}
                  aria-selected={sort === item.slug}
                  className={cn(sort === item.slug && "is-active")}
                  onClick={(event) => {
                    setSort(item.slug);
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open");
                  }}
                >
                  {item.slug === "latest" ? "Latest..." : item.title}
                </button>
              ))}
            </div>
            </details>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="designEmpty">Nothing in this category yet.</p>
      ) : layout === "spiral" ? (
        <DesignSpiralGallery items={items} onOpen={setActiveItem} />
      ) : (
        <div className="designGalleries">
          {featured.length > 0 ? (
            <div
              className="designGallery"
              data-layout="featured"
              style={
                {
                  "--featured-aspect": `${FEATURED_FRAME.width} / ${FEATURED_FRAME.height}`,
                } as CSSProperties
              }
            >
              {featured.map(({ item, style, sizes, eager }) => (
                <DesignGalleryCard
                  key={item.id}
                  item={item}
                  style={style}
                  sizes={sizes}
                  eager={eager}
                  onOpen={setActiveItem}
                />
              ))}
            </div>
          ) : null}
          {rest.length > 0 ? (
            <div className="designGallery">
              {rest.map((item) => (
                <DesignGalleryCard
                  key={item.id}
                  item={item}
                  sizes={MASONRY_IMAGE_SIZES}
                  onOpen={setActiveItem}
                />
              ))}
            </div>
          ) : null}
        </div>
      )}

      {activeItem ? (
        <DesignLightbox
          item={activeItem}
          items={layout === "grid" ? galleryItems : items}
          onClose={() => setActiveItem(null)}
          onItemChange={setActiveItem}
        />
      ) : null}
    </section>
  );
}
