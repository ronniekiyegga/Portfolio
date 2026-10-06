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

export function getThoughtArticleHeadings(article: ThoughtArticle) {
  return article.sections
    .filter((section) => section.heading.trim().length > 0)
    .map((section) => ({
      text: section.heading,
      slug: slugify(section.heading),
      level: 2 as const,
    }));
}
