import type { Category } from "@/types/post";
import {
  ENGINEERING_ARTICLES,
  engineeringArticleHref,
  type EngineeringArticle,
} from "@/lib/engineering-notes";

export type EngineeringNote = Pick<
  EngineeringArticle,
  | "categorySlug"
  | "title"
  | "description"
  | "readTime"
  | "image"
  | "date"
  | "authorName"
  | "authorImage"
> & {
  slug: string;
  href: string;
};

export const FEATURED_ENGINEERING_NOTES: EngineeringNote[] =
  ENGINEERING_ARTICLES.map((article) => ({
    slug: article.slug,
    categorySlug: article.categorySlug,
    title: article.title,
    description: article.description,
    readTime: article.readTime,
    href: engineeringArticleHref(article.slug),
    image: article.image,
    date: article.date,
    authorName: article.authorName,
    authorImage: article.authorImage,
  }));

export function categoriesWithPosts(
  notes: readonly EngineeringNote[],
  categories: readonly Category[],
): Category[] {
  const slugs = new Set(notes.map((note) => note.categorySlug));
  return categories.filter((category) => slugs.has(category.slug));
}

export function getFeaturedNoteBySlug(
  slug: string,
): EngineeringNote | undefined {
  return FEATURED_ENGINEERING_NOTES.find((note) => note.slug === slug);
}
