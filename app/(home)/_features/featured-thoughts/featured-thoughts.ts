import { formatDayMonthYear } from "@/lib/format-date";

import {
  getThoughtPost,
  thoughtCategoryTitle,
} from "../thoughts-index/thoughts";

export type SupportingThought = {
  category: string;
  title: string;
  tag: string;
  date: string;
  description: string;
  href: string;
};

function supportingThought(
  slug: string,
  tag: string,
  description: string,
): SupportingThought {
  const post = getThoughtPost(slug);
  return {
    category: thoughtCategoryTitle(post.category),
    title: post.title,
    tag,
    date: formatDayMonthYear(post.dateTime),
    description,
    href: post.href,
  };
}

const investigation = getThoughtPost("what-10000-rows-actually-means");

export const featuredInvestigation = {
  href: investigation.href,
  category: thoughtCategoryTitle(investigation.category),
  headlineLines: [
    "How would you keep a React",
    "interface responsive while",
    "processing 10,000 records?",
  ],
} as const;

export const supportingThoughts: SupportingThought[] = [
  supportingThought(
    "idempotency-matters",
    "Reliability",
    "Retries, duplicate delivery and durable business invariants",
  ),
  supportingThought(
    "empty-state-first",
    "Product judgement",
    "Designing the first useful action before the populated dashboard",
  ),
  supportingThought(
    "design-systems-remove-decisions",
    "Design systems",
    "Reuse only helps when the underlying decision is stable",
  ),
];
