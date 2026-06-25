import Image from "next/image";
import { slugify } from "@/lib/slugify";
import { isDiagramBlogImage } from "@/lib/engineering-notes";
import type {
  EngineeringArticleSection,
  EngineeringArticleTable,
} from "@/lib/engineering-notes";

function renderRichText(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-[#f3f4f6] px-1.5 py-0.5 font-mono text-[0.9em] text-foreground dark:bg-white/10"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

function ArticleSectionImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const isDiagram = isDiagramBlogImage(src);

  return (
    <figure className="-mx-4 my-8 sm:-mx-6">
      <div className="relative aspect-[800/520] overflow-hidden rounded-lg bg-transparent">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          unoptimized={isDiagram}
          sizes="(min-width: 768px) 768px, 100vw"
        />
      </div>
    </figure>
  );
}

function ArticleTable({ table }: { table: EngineeringArticleTable }) {
  return (
    <div className="mb-6 overflow-x-auto rounded-lg border border-[#eeeeee] dark:border-white/10">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#eeeeee] bg-[#fafafa] dark:border-white/10 dark:bg-white/[0.03]">
            {table.headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 font-semibold text-[#1a1a2e] dark:text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr
              key={row.join("|")}
              className="border-b border-[#eeeeee] last:border-b-0 dark:border-white/10"
            >
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${index}`}
                  className="px-4 py-3 align-top text-[#666666] dark:text-white/60"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EngineeringArticleBody({
  sections,
}: {
  sections: readonly EngineeringArticleSection[];
}) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {sections.map((section, index) => {
        const headingSlug = section.heading
          ? slugify(section.heading)
          : undefined;
        const sectionKey =
          section.heading ??
          section.paragraphs?.[0] ??
          section.bullets?.[0] ??
          `section-${index}`;

        const isCallout = section.variant === "callout";

        return (
          <section
            key={sectionKey}
            className={
              isCallout
                ? "my-10 rounded-lg border border-[#eeeeee] bg-[#fafafa] px-5 py-5 dark:border-white/10 dark:bg-white/[0.03] sm:px-6"
                : undefined
            }
          >
            {section.heading ? (
              <h2
                id={headingSlug}
                className={
                  isCallout
                    ? "text-foreground mb-3 scroll-mt-28 text-lg font-semibold"
                    : "text-foreground mb-4 mt-16 scroll-mt-28 text-2xl font-semibold first:mt-0"
                }
              >
                {section.heading}
              </h2>
            ) : null}
            {section.paragraphs?.map((paragraph, paragraphIndex) => {
              const imageInsertIndex = section.imageAfterParagraph ?? 0;

              return (
                <div key={paragraph}>
                  <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                    {renderRichText(paragraph)}
                  </p>
                  {section.image &&
                  paragraphIndex === imageInsertIndex ? (
                    <ArticleSectionImage
                      src={section.image}
                      alt={section.imageAlt ?? ""}
                    />
                  ) : null}
                </div>
              );
            })}
            {section.table ? <ArticleTable table={section.table} /> : null}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="text-muted-foreground mb-4 ml-6 list-disc space-y-2">
                {section.bullets.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
