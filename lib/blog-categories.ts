import type { Category } from "@/types/post";

/**
 * Blog topic categories. Create matching category documents in Sanity with these slugs to tag posts.
 */
export const BLOG_CATEGORIES: Category[] = [
  { slug: "design", title: "Design" },
  { slug: "engineering", title: "Engineering" },
  { slug: "product", title: "Product" },
];
