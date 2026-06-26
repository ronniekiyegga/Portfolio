"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import { HOME_BLOG_SECTION_HREF } from "@/lib/home-nav";
import {
  categoriesWithPosts,
  FEATURED_ENGINEERING_NOTES,
  type EngineeringNote,
} from "@/lib/featured-engineering-posts";
import {
  isDiagramBlogImage,
  usesCompactBlogHero,
} from "@/lib/engineering-notes";

const NOTES_GRADIENT = "linear-gradient(90deg, #4353ff 0%, #8b5cf6 100%)";
const KICKER_GRADIENT = "linear-gradient(45deg, #667bf6, #26d0ce)";

type BlogFilter = "all" | string;

function postImageProps(note: EngineeringNote) {
  const isDiagram = isDiagramBlogImage(note.image);
  const isCompact = usesCompactBlogHero(note);

  return {
    unoptimized: isDiagram,
    className: cn(
      "transition-transform duration-300 group-hover:scale-[1.02]",
      isCompact && "object-contain p-4 sm:p-5 lg:p-6",
      isDiagram && !isCompact && "object-contain p-2 sm:p-3",
      !isDiagram && !isCompact && "object-cover",
    ),
  };
}

function postImageContainerClass(image: string) {
  return cn(
    "relative block overflow-hidden rounded-lg",
    isDiagramBlogImage(image)
      ? "aspect-[16/10] bg-transparent"
      : "aspect-[16/10] bg-[#f6f6f7] dark:bg-white/5",
  );
}

function featuredImageContainerClass(image: string) {
  return cn(
    "group relative block overflow-hidden rounded-lg",
    isDiagramBlogImage(image)
      ? "aspect-[4/3] bg-transparent"
      : "aspect-[4/3] bg-[#f6f6f7] dark:bg-white/5",
  );
}

function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostAuthorMeta({
  note,
  compact = false,
}: {
  note: EngineeringNote;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[#888888] dark:text-white/45",
        compact ? "text-[11px]" : "text-xs",
      )}
    >
      <span className="inline-flex min-w-0 items-center gap-2">
        <span className="relative size-5 shrink-0 overflow-hidden rounded-full bg-[#f3f3f4] dark:bg-white/10">
          <Image
            src={note.authorImage}
            alt=""
            width={20}
            height={20}
            className="size-full object-cover"
          />
        </span>
        <span className="truncate font-medium text-[#444444] dark:text-white/75">
          {note.authorName}
        </span>
      </span>
      <span aria-hidden className="text-[#b0b0b0] dark:text-white/30">
        ·
      </span>
      <time dateTime={note.date}>{formatPostDate(note.date)}</time>
      <span aria-hidden className="text-[#b0b0b0] dark:text-white/30">
        ·
      </span>
      <span>{note.readTime}</span>
    </div>
  );
}

function FeaturedPost({ note }: { note: EngineeringNote }) {
  return (
    <article className="grid gap-8 border-b border-[#eeeeee] pb-12 lg:grid-cols-2 lg:items-center lg:gap-12 dark:border-white/10">
      <Link
        href={note.href}
        className={featuredImageContainerClass(note.image)}
      >
        <Image
          src={note.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          {...postImageProps(note)}
        />
      </Link>

      <div className="flex min-w-0 flex-col gap-3 lg:py-2">
        <h3 className="text-xl font-semibold leading-[1.3] tracking-tight text-[#1a1a2e] dark:text-white sm:text-[1.35rem]">
          <Link href={note.href} className="hover:text-[#4353ff]">
            {note.title}
          </Link>
        </h3>
        <p className="line-clamp-3 max-w-xl text-[13px] leading-[1.6] text-[#666666] dark:text-white/55">
          {note.description}
        </p>
        <PostAuthorMeta note={note} />
      </div>
    </article>
  );
}

function PostCard({ note }: { note: EngineeringNote }) {
  return (
    <article className="group flex min-w-0 flex-col gap-2.5">
      <Link href={note.href} className={postImageContainerClass(note.image)}>
        <Image
          src={note.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          {...postImageProps(note)}
        />
      </Link>

      <h3 className="line-clamp-3 text-[14px] font-semibold leading-[1.35] tracking-tight text-[#1a1a2e] dark:text-white">
        <Link href={note.href} className="hover:text-[#4353ff]">
          {note.title}
        </Link>
      </h3>

      <p className="line-clamp-2 text-[12px] leading-[1.55] text-[#666666] dark:text-white/55">
        {note.description}
      </p>

      <PostAuthorMeta note={note} compact />
    </article>
  );
}

function CategoryNav({
  activeFilter,
  onFilterChange,
  categories,
}: {
  activeFilter: BlogFilter;
  onFilterChange: (filter: BlogFilter) => void;
  categories: readonly { slug: string; title: string }[];
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#eeeeee] dark:border-white/10">
      <nav
        className="-ml-3 flex min-w-0 snap-x snap-mandatory items-center gap-0 overflow-x-auto py-3"
        aria-label="Blog categories"
      >
        <CategoryNavButton
          label="All"
          active={activeFilter === "all"}
          onClick={() => onFilterChange("all")}
        />
        {categories.map((category) => (
          <CategoryNavButton
            key={category.slug}
            label={category.title}
            active={activeFilter === category.slug}
            onClick={() => onFilterChange(category.slug)}
          />
        ))}
      </nav>

      <div className="hidden shrink-0 items-center gap-4 sm:flex">
        <span
          className="h-4 w-px bg-[#dddddd] dark:bg-white/15"
          aria-hidden
        />
        <Link
          href={HOME_BLOG_SECTION_HREF}
          className="text-[13px] font-medium text-[#666666] transition-colors hover:text-[#1a1a2e] dark:text-white/55 dark:hover:text-white"
        >
          View blog
        </Link>
      </div>
    </div>
  );
}

function CategoryNavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "snap-start whitespace-nowrap px-3 py-1.5 text-[13px] transition-colors",
        active
          ? "font-medium text-[#1a1a2e] dark:text-white"
          : "text-[#888888] hover:text-[#444444] dark:text-white/45 dark:hover:text-white/75",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

export default function EngineeringNotesSection({
  notes = FEATURED_ENGINEERING_NOTES,
}: {
  notes?: readonly EngineeringNote[];
}) {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("all");

  const filterCategories = useMemo(
    () => categoriesWithPosts(notes, BLOG_CATEGORIES),
    [notes],
  );

  const filteredNotes = useMemo(
    () =>
      activeFilter === "all"
        ? notes
        : notes.filter((note) => note.categorySlug === activeFilter),
    [notes, activeFilter],
  );

  const [featured, ...gridPosts] = filteredNotes;

  return (
    <section
      id="blog"
      className="relative w-full py-20 md:py-32 dark:bg-transparent"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="size-[5px] shrink-0 rounded-full"
                style={{ background: KICKER_GRADIENT }}
                aria-hidden
              />
              <span
                className="bg-clip-text text-[10px] font-semibold uppercase tracking-[0.15em] text-transparent"
                style={{
                  background: KICKER_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Writing
              </span>
            </div>

            <h2 className="font-cormorant text-[clamp(2.125rem,4.5vw,2.875rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[#1a1a2e] dark:text-white">
              Engineering{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: NOTES_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Notes
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-[13px] leading-[1.65] text-[#666666] dark:text-white/55 lg:pb-1">
            Engineering Decisions, Production notes on architecture, APIs,
            operational analytics, distributed systems, and the trade-offs
            behind the software I build.
          </p>
        </div>

        <CategoryNav
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          categories={filterCategories}
        />

        <div className="pt-10 md:pt-12">
          {featured ? (
            <FeaturedPost note={featured} />
          ) : (
            <p className="py-12 text-center text-sm text-[#888888] dark:text-white/45">
              No posts in this category yet.
            </p>
          )}

          {gridPosts.length > 0 ? (
            <div className="grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {gridPosts.map((note) => (
                <PostCard key={note.slug} note={note} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href={HOME_BLOG_SECTION_HREF}
            className="text-[13px] font-medium text-[#4353ff] hover:underline"
          >
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
