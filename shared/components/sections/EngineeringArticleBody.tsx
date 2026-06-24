import { slugify } from "@/lib/slugify";
import type { EngineeringArticleSection } from "@/lib/engineering-notes";

export function EngineeringArticleBody({
  sections,
}: {
  sections: readonly EngineeringArticleSection[];
}) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {sections.map((section) => {
        const headingSlug = section.heading
          ? slugify(section.heading)
          : undefined;

        return (
          <section
            key={section.heading ?? section.paragraphs?.[0] ?? section.bullets?.[0]}
          >
            {section.heading ? (
              <h2
                id={headingSlug}
                className="text-foreground mb-4 mt-16 scroll-mt-28 text-2xl font-semibold first:mt-0"
              >
                {section.heading}
              </h2>
            ) : null}
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted-foreground mb-4 text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
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
