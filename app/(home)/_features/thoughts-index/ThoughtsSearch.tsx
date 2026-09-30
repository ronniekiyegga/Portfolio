"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command, Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/components/ui/command";

import {
  allThoughts,
  thoughtCategories,
  thoughtCategoryTitle,
  type ThoughtCategorySlug,
  type ThoughtPost,
} from "./thoughts";

const recentThoughts = allThoughts.slice(0, 4);

function searchKeywords(thought: ThoughtPost) {
  return [thoughtCategoryTitle(thought.category), ...thought.tags];
}
const categoryTabs = thoughtCategories.filter(
  (category) => category.slug !== "all",
);

export function ThoughtsSearch({
  onSelectCategory,
}: {
  onSelectCategory: (slug: ThoughtCategorySlug) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ThoughtCategorySlug>("all");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((isOpen) => !isOpen);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) setActiveTab("all");
  }, [open]);

  const visibleRecent = recentThoughts.filter(
    (thought) => activeTab === "all" || thought.category === activeTab,
  );
  const visibleAll = allThoughts.filter(
    (thought) => activeTab === "all" || thought.category === activeTab,
  );

  return (
    <>
      <button
        type="button"
        className="thoughtsSearch"
        onClick={() => setOpen(true)}
        aria-label="Search thoughts"
      >
        <span className="thoughtsSearchLabel">
          <Search aria-hidden size={14} strokeWidth={1.75} />
          Search...
        </span>
        <span className="thoughtsSearchKeys">
          <kbd>
            <Command aria-hidden size={11} strokeWidth={2} />
          </kbd>
          <kbd>K</kbd>
        </span>
      </button>
      <CommandDialog
        className="commandPalette"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="commandPaletteTop">
          <CommandInput placeholder="Type a command or search..." />
          <div className="commandPaletteTabs">
            {categoryTabs.map((category) => (
              <button
                type="button"
                key={category.slug}
                className={
                  activeTab === category.slug ? "is-active" : undefined
                }
                onClick={() => {
                  setActiveTab(category.slug);
                  onSelectCategory(category.slug);
                }}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent">
            {visibleRecent.map((thought) => (
              <CommandItem
                key={`recent-${thought.slug}`}
                value={`recent ${thought.title}`}
                keywords={searchKeywords(thought)}
                onSelect={() => {
                  setOpen(false);
                  router.push(thought.href);
                }}
              >
                <span className="commandPaletteMark" aria-hidden />
                {thought.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="All">
            {visibleAll.map((thought) => (
              <CommandItem
                key={`all-${thought.slug}`}
                value={`all ${thought.title}`}
                keywords={searchKeywords(thought)}
                onSelect={() => {
                  setOpen(false);
                  router.push(thought.href);
                }}
              >
                <span className="commandPaletteMark" aria-hidden />
                {thought.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="commandPaletteFooter">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            to navigate
          </span>
          <span>
            <kbd>X</kbd>
            to close
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
