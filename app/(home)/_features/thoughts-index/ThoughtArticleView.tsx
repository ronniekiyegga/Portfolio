import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { formatDate } from "@/lib/format-date";
import { slugify } from "@/lib/slugify";

import type { ThoughtArticle, ThoughtArticleSection } from "./thought-articles";
import { getThoughtArticleHeadings } from "./thought-articles";
import { thoughtCategoryTitle } from "./thoughts";
import { ThoughtCodeBlock } from "./ThoughtCodeBlock";
import { ThoughtOnThisPage } from "./ThoughtOnThisPage";

function ArticleSectionBody({ section }: { section: ThoughtArticleSection }) {
  const blocks =
    section.blocks ??
    (section.paragraphs ?? []).map((text) => ({ type: "p" as const, text }));

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index}>{block.text}</p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <ThoughtCodeBlock
              key={index}
              code={block.code}
              language={block.language}
            />
          );
        }

        return (
          <pre
            key={index}
            role="img"
            aria-label={block.label}
            className="thoughtCodeDiagram"
          >
            {block.text}
          </pre>
        );
      })}
    </>
  );
}

export function ThoughtArticleView({ article }: { article: ThoughtArticle }) {
  const headings = getThoughtArticleHeadings(article);
  const categoryTitle = thoughtCategoryTitle(article.category);

  return (
    <div className="relative mx-auto w-full max-w-5xl px-0">
      <Breadcrumb>
        <BreadcrumbList className="text-[#595F7A]">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/thoughts"
              className="text-[#595F7A] hover:text-[#212225]"
            >
              Thoughts
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-[#595F7A]" />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/thoughts"
              className="text-[#595F7A] hover:text-[#212225]"
            >
              {categoryTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="mt-8">
        <header className="mb-8 max-w-2xl">
          <h1 className="mb-6 text-balance font-[family-name:var(--font-geist-sans)] text-3xl font-bold text-[#212225] md:text-4xl md:leading-tight">
            {article.overlayTitle}
          </h1>
          {article.title !== article.overlayTitle ? (
            <p className="mb-8 text-lg leading-relaxed text-[#595F7A]">
              {article.title}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <div className="aspect-square size-6 overflow-hidden rounded-md border border-transparent bg-white shadow-md shadow-black/15 ring-1 ring-[#e6e8ef]">
                <Image
                  src={article.authorImage}
                  alt={article.authorName}
                  width={460}
                  height={460}
                  className="size-full object-cover"
                />
              </div>
              <span className="line-clamp-1 text-sm text-[#595F7A]">
                {article.authorName}
              </span>
            </div>
            <time className="text-sm text-[#595F7A]" dateTime={article.dateTime}>
              {formatDate(article.dateTime)}
            </time>
          </div>
        </header>

        <div className="max-w-2xl">
          <div className="relative mb-12 overflow-hidden rounded-xl border border-[#e6e8ef] shadow shadow-black/5">
            <Image
              src={article.image}
              alt=""
              width={1200}
              height={675}
              className="aspect-video w-full object-cover"
              priority
            />
          </div>

          <div className="thoughtArticleCopy max-w-none">
            {article.lede?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {article.sections.map((section, index) => (
              <section key={section.heading}>
                <h2
                  id={slugify(section.heading)}
                  className={`mb-4 scroll-mt-20 text-2xl font-semibold text-[#212225] ${
                    index === 0 && !article.lede?.length ? "mt-0" : "mt-16"
                  }`}
                >
                  {section.heading}
                </h2>
                <ArticleSectionBody section={section} />
              </section>
            ))}
          </div>
        </div>
      </article>
      <ThoughtOnThisPage headings={headings} />
    </div>
  );
}
