import { slugify } from "@/lib/slugify";
import { PortableTextBlock } from "@portabletext/types";
import type { Heading } from "@/types/post";
import type { EngineeringArticleSection } from "@/lib/engineering-notes";

export function extractHeadings(body: PortableTextBlock[]): Heading[] {
  if (!body) return [];

  return body
    .filter(
      (block): block is PortableTextBlock =>
        block._type === "block" &&
        ["h2", "h3"].includes(block.style || ""),
    )
    .map((block) => {
      const text =
        block.children
          ?.map((child) => ("text" in child ? child.text : ""))
          .join("") || "";
      return {
        text,
        level: block.style === "h2" ? 2 : 3,
        slug: slugify(text),
      };
    });
}

export function extractHeadingsFromSections(
  sections: readonly EngineeringArticleSection[],
): Heading[] {
  return sections
    .filter((section) => section.heading?.trim())
    .map((section) => ({
      text: section.heading!.trim(),
      level: 2,
      slug: slugify(section.heading!.trim()),
    }));
}
