import { BlogFilter } from "@/app/(marketing)/blog/category-filter";
import { BlogHeroBackground } from "@/app/(marketing)/blog/blog-hero-background";
import { Button } from "@/app/components/ui/button";
import { getInitialPosts, getTotalPostsCount } from "@/lib/actions";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import Link from "next/link";

const PAGE_SIZE = 12;

export default async function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [posts] = await Promise.all([
    getInitialPosts(PAGE_SIZE),
    getTotalPostsCount(),
  ]);

  // Software engineering topic categories (create matching categories in Sanity to tag posts)
  const categories = BLOG_CATEGORIES;

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 z-10 mx-auto flex max-w-5xl flex-col px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-balance text-6xl font-semibold">
              System design &{" "}
              <span className="bg-linear-to-b from-foreground/50 to-foreground/95 bg-clip-text text-transparent [-webkit-text-stroke:0.5px_var(--color-foreground)]">
                software engineering
              </span>
            </h1>
            <p className="mx-auto mb-6 max-w-xl text-neutral-500 dark:text-neutral-400">
              Caching, load balancing, scaling, and the concepts that power large-scale systems.
            </p>
            <Button asChild size="sm">
              <Link href="#">
                Browse topics
              </Link>
            </Button>
          </div>
        </div>
        <div className="mask-radial-from-65% mask-radial-at-bottom-right mask-radial-[100%_75%] mask-b-from-65% md:aspect-16/7 aspect-square">
          <BlogHeroBackground />
        </div>
      </div>

      <BlogFilter categories={categories} posts={posts} />
      {children}
    </>
  );
}
