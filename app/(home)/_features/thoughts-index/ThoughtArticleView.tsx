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
import { RelatedThoughts } from "./RelatedThoughts";

const operationalContextSlugs = new Set([
  "what-10000-rows-actually-means",
  "idempotency-matters",
  "burst-traffic",
  "10000-concurrent-database-connections",
  "rate-limiting-strategy",
  "logging-under-load",
  "where-request-time-goes",
]);

function ThoughtContextNote() {
  return (
    <aside className="thoughtArticleContextNote" aria-label="Context note">
      <p>
        Examples are simplified or hypothetical; any details drawn from real
        work have been anonymised.
      </p>
    </aside>
  );
}

function ThoughtEditorialBlock({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const rows: Array<
    | { type: "text"; text: string }
    | { type: "relation"; from: string; to: string }
    | { type: "down" }
  > = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const nextLine = lines[index + 1];

    if (/^[↓↘↙↖↗]+$/.test(line)) {
      rows.push({ type: "down" });
      continue;
    }

    if (line.startsWith("→")) {
      rows.push({
        type: "relation",
        from: "",
        to: line.replace(/^→\s*/, ""),
      });
      continue;
    }

    if (nextLine?.startsWith("→")) {
      rows.push({
        type: "relation",
        from: line,
        to: nextLine.replace(/^→\s*/, ""),
      });
      index += 1;
      continue;
    }

    const inlineArrowIndex = line.indexOf("→");
    if (inlineArrowIndex > 0) {
      rows.push({
        type: "relation",
        from: line.slice(0, inlineArrowIndex).trim(),
        to: line.slice(inlineArrowIndex + 1).trim(),
      });
      continue;
    }

    rows.push({ type: "text", text: line });
  }

  const isVerticalFlow =
    rows.some((row) => row.type === "down") &&
    rows.every((row) => row.type === "text" || row.type === "down");

  if (isVerticalFlow) {
    return (
      <figure className="thoughtEditorialFlow">
        {rows.map((row, index) =>
          row.type === "down" ? (
            <span
              key={index}
              className="thoughtEditorialFlowArrow"
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20">
                <path d="M10 3v12m-4-4 4 4 4-4" />
              </svg>
            </span>
          ) : (
            <div key={index} className="thoughtEditorialFlowStep">
              {row.text}
            </div>
          ),
        )}
      </figure>
    );
  }

  return (
    <figure className="thoughtEditorialBlock">
      {rows.map((row, index) => {
        if (row.type === "down") {
          return (
            <span
              key={index}
              className="thoughtEditorialTableDown"
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20">
                <path d="M10 3v12m-4-4 4 4 4-4" />
              </svg>
            </span>
          );
        }

        if (row.type === "relation") {
          return (
            <div
              key={index}
              className="thoughtEditorialTableRow thoughtEditorialTableRelation"
            >
              <span>{row.from}</span>
              <svg viewBox="0 0 24 20" aria-hidden="true">
                <path d="M3 10h16m-5-5 5 5-5 5" />
              </svg>
              <span>{row.to}</span>
            </div>
          );
        }

        return (
          <div key={index} className="thoughtEditorialTableRow">
            {row.text}
          </div>
        );
      })}
    </figure>
  );
}

function isStandaloneQuote(text: string) {
  const value = text.trim();
  return (
    (value.startsWith("“") && value.endsWith("”")) ||
    (value.startsWith('"') && value.endsWith('"'))
  );
}

function ArticleParagraph({ text }: { text: string }) {
  if (text.trim() === "*") {
    return null;
  }

  if (isStandaloneQuote(text)) {
    return <blockquote className="thoughtArticleQuote">{text}</blockquote>;
  }

  return <p>{text}</p>;
}

function ArticleSectionBody({ section }: { section: ThoughtArticleSection }) {
  const blocks =
    section.blocks ??
    (section.paragraphs ?? []).map((text) => ({ type: "p" as const, text }));

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return <ArticleParagraph key={index} text={block.text} />;
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
          if (block.language === "text") {
            return <ThoughtEditorialBlock key={index} text={block.code} />;
          }

          return (
            <ThoughtCodeBlock
              key={index}
              code={block.code}
              language={block.language}
            />
          );
        }

        if (block.type === "image") {
          return (
            <figure
              key={index}
              className="my-6 overflow-hidden rounded-xl border border-[#e6e8ef] bg-[#f4f4f2] shadow-sm shadow-black/5"
            >
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(max-width: 768px) calc(100vw - 2rem), 672px"
                className="h-auto w-full"
              />
            </figure>
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
    <div className="relative mx-auto w-full max-w-6xl px-0">
      <Breadcrumb className="flex justify-center">
        <BreadcrumbList className="justify-center text-[#595F7A]">
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

      <article className="mt-10">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold text-[#0f1115] md:text-4xl md:leading-tight">
            {article.overlayTitle}
          </h1>
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <div className="aspect-square size-6 overflow-hidden rounded-full border border-transparent bg-white shadow-md shadow-black/15 ring-1 ring-[#e6e8ef]">
                <Image
                  src={article.authorImage}
                  alt={article.authorName}
                  width={460}
                  height={460}
                  className="size-full object-cover rounded-full"
                />
              </div>
              <span className="line-clamp-1 text-xs text-[#595f7ab1]">
                {article.authorName}
              </span>
            </div>
            <time
              className="text-xs text-[#595f7ab1]"
              dateTime={article.dateTime}
            >
              {formatDate(article.dateTime)}
            </time>
          </div>
        </header>

        <div className="relative mx-auto mb-12 w-full overflow-hidden rounded-xl border border-[#e6e8ef] shadow shadow-black/5">
          <Image
            src={article.image}
            alt=""
            width={1600}
            height={900}
            sizes="(max-width: 768px) calc(100vw - 2rem), 1152px"
            className="aspect-video w-full object-cover md:aspect-[2/1]"
            priority
          />
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="thoughtArticleCopy max-w-none space-y-12">
            {article.lede?.map((paragraph) => (
              <ArticleParagraph key={paragraph} text={paragraph} />
            ))}
            {article.sections.map((section, index) => (
              <section key={section.heading}>
                <h2
                  id={slugify(section.heading)}
                  className={`thoughtArticleSectionTitle mb-4 scroll-mt-20 text-2xl font-semibold leading-snug text-[#131620] md:mb-3 ${
                    index === 0 && !article.lede?.length
                      ? "mt-0"
                      : "mt-8 md:mt-8"
                  }`}
                >
                  {section.heading}
                </h2>
                <ArticleSectionBody section={section} />
              </section>
            ))}
          </div>
          {operationalContextSlugs.has(article.slug) ? (
            <ThoughtContextNote />
          ) : null}
        </div>
      </article>
      <RelatedThoughts slug={article.slug} />
      <ThoughtOnThisPage headings={headings} />
    </div>
  );
}
