import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { formatDate } from "@/lib/format-date";
import { portableTextComponents } from "@/shared/components/sections/content-components";
import {
  extractHeadings,
  extractHeadingsFromSections,
} from "@/lib/extract-headings";
import { getPostBySlug, getAllPostSlugs } from "@/lib/actions";
import {
  getAllEngineeringArticleSlugs,
  getEngineeringArticleBySlug,
  isDiagramBlogImage,
  usesCompactBlogHero,
} from "@/lib/engineering-notes";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import { EngineeringArticleBody } from "@/shared/components/sections/EngineeringArticleBody";
import { BlogOnThisPage, BlogArticleScrollTop } from "@/shared/components/sections/BlogOnThisPage";
import { HOME_BLOG_SECTION_HREF } from "@/lib/home-nav";

function categoryTitle(slug: string): string {
  return BLOG_CATEGORIES.find((category) => category.slug === slug)?.title ?? slug;
}

export async function generateStaticParams() {
  const [sanitySlugs, engineeringSlugs] = await Promise.all([
    getAllPostSlugs().catch(() => [] as { slug: string }[]),
    Promise.resolve(getAllEngineeringArticleSlugs().map((slug) => ({ slug }))),
  ]);

  const seen = new Set<string>();
  return [...engineeringSlugs, ...sanitySlugs].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const local = getEngineeringArticleBySlug(slug);

  if (local) {
    return {
      title: `${local.title} | Blog`,
      description: local.description,
      alternates: { canonical: `/blog/${slug}` },
    };
  }

  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

type ArticleMeta = {
  title: string;
  description: string;
  categorySlug: string;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  authorName: string;
  authorImage: string;
  date: string;
  readTime?: string;
};

function ArticleHeader({ meta }: { meta: ArticleMeta }) {
  return (
    <header className="mb-8 max-w-2xl">
      <h1 className="text-foreground mb-6 text-balance text-3xl font-bold md:text-4xl md:leading-tight">
        {meta.title}
      </h1>

      <p className="text-muted-foreground mb-8 text-lg italic leading-relaxed">
        {meta.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <div className="ring-border-illustration bg-card aspect-square size-6 overflow-hidden rounded-md border border-transparent shadow-md shadow-black/15 ring-1">
            <Image
              src={meta.authorImage}
              alt={meta.authorName}
              width={24}
              height={24}
              className="size-full object-cover"
            />
          </div>
          <span className="text-muted-foreground line-clamp-1 text-sm">
            {meta.authorName}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.readTime ? (
            <>
              <span aria-hidden>·</span>
              <span>{meta.readTime}</span>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function ArticleBodyLayout({
  meta,
  slug,
  headings,
  children,
}: {
  meta: ArticleMeta;
  slug: string;
  headings: ReturnType<typeof extractHeadings>;
  children: ReactNode;
}) {
  const compactHero = usesCompactBlogHero({ slug });
  const diagramHero = isDiagramBlogImage(meta.image);
  const containedHero = compactHero || diagramHero;

  return (
    <div className="relative mx-auto max-w-5xl px-6">
      <BlogArticleScrollTop />

      <div className="flex items-start gap-12">
        <div className="min-w-0 flex-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={HOME_BLOG_SECTION_HREF}>Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{meta.categoryLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <article className="mt-12">
            <ArticleHeader meta={meta} />

            <div className="max-w-2xl">
              {containedHero ? (
                <div
                  className={cn(
                    "relative mb-12 aspect-video overflow-hidden rounded-xl",
                    diagramHero ? "bg-transparent" : "bg-muted/30",
                  )}
                >
                  <Image
                    src={meta.image}
                    alt={meta.imageAlt}
                    fill
                    className={cn(
                      "object-contain",
                      compactHero ? "p-2 sm:p-3" : "p-1 sm:p-2",
                    )}
                    priority
                    unoptimized={diagramHero}
                    sizes="(min-width: 768px) 672px, 100vw"
                  />
                </div>
              ) : (
                <div className="relative mb-12 overflow-hidden rounded-xl">
                  <Image
                    src={meta.image}
                    alt={meta.imageAlt}
                    width={1200}
                    height={675}
                    className="aspect-video w-full object-cover"
                    priority
                  />
                </div>
              )}
              {children}
            </div>
          </article>

          <footer className="mt-12 border-t py-8">
            <Link
              href={HOME_BLOG_SECTION_HREF}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Back to blog
            </Link>
          </footer>
        </div>

        <BlogOnThisPage headings={headings} />
      </div>
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const local = getEngineeringArticleBySlug(slug);

  if (local) {
    const headings = extractHeadingsFromSections(local.sections);
    const meta: ArticleMeta = {
      title: local.title,
      description: local.description,
      categorySlug: local.categorySlug,
      categoryLabel: categoryTitle(local.categorySlug),
      image: local.image,
      imageAlt: "",
      authorName: local.authorName,
      authorImage: local.authorImage,
      date: local.date,
      readTime: local.readTime,
    };

    return (
      <ArticleBodyLayout meta={meta} slug={slug} headings={headings}>
        <EngineeringArticleBody sections={local.sections} />
      </ArticleBodyLayout>
    );
  }

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const meta: ArticleMeta = {
    title: post.title,
    description: post.description,
    categorySlug: post.category.slug,
    categoryLabel: post.category.title,
    image: post.image,
    imageAlt: post.title,
    authorName: post.authors[0]?.name ?? "Ronnie Kiyegga",
    authorImage: post.authors[0]?.image ?? "/images/profile/Avatar.svg",
    date: post.publishedAt,
  };

  return (
    <ArticleBodyLayout meta={meta} slug={slug} headings={headings}>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </ArticleBodyLayout>
  );
}
