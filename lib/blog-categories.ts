import type { Category } from "@/types/post";

/**
 * Blog topic categories. Create matching category documents in Sanity with these slugs to tag posts.
 */
export const BLOG_CATEGORIES: Category[] = [
  { slug: "ui-ux", title: "UI/UX" },
  { slug: "dsa", title: "DSA" },
  { slug: "system-design", title: "System Design" },
];
