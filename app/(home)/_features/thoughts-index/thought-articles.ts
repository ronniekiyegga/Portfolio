import {
  thoughtArticleContent,
  type ThoughtArticleSection,
} from "@/content/thoughts";
import { slugify } from "@/lib/slugify";

import { allThoughts, renderingHero, type ThoughtPost } from "./thoughts";

export type {
  ThoughtArticleBlock,
  ThoughtArticleSection,
} from "@/content/thoughts";

export type ThoughtArticle = ThoughtPost & {
  image: string;
  authorName: string;
  authorImage: string;
  lede?: string[];
  sections: ThoughtArticleSection[];
};

const author = {
  authorName: "Ronnie Kiyegga",
  authorImage: "/images/profile/Ronnie-suit.jpg",
} as const;

export function getThoughtArticle(slug: string): ThoughtArticle | undefined {
  const thought = allThoughts.find((item) => item.slug === slug);
  const content = thoughtArticleContent.get(slug);

  if (!thought || !content) {
    return undefined;
  }

  return {
    ...thought,
    ...author,
    image: renderingHero,
    lede: content.lede,
    sections: content.sections,
  };
}

export function getAllThoughtArticleSlugs() {
  return allThoughts
    .filter((thought) => thoughtArticleContent.has(thought.slug))
    .map((thought) => ({ slug: thought.slug }));
}

function seededRandom(seed: string) {
  let state = 2166136261;
  for (const char of seed) {
    state = Math.imul(state ^ char.charCodeAt(0), 16777619);
  }
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getRelatedThoughts(slug: string, count = 3): ThoughtPost[] {
  const random = seededRandom(slug);
  const candidates = allThoughts.filter(
    (thought) =>
      thought.slug !== slug && thoughtArticleContent.has(thought.slug),
  );

  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  return candidates.slice(0, count);
}

export function getThoughtArticleHeadings(article: ThoughtArticle) {
  return article.sections
    .filter((section) => section.heading.trim().length > 0)
    .map((section) => ({
      text: section.heading,
      slug: slugify(section.heading),
      level: 2 as const,
    }));
}
