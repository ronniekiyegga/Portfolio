import { getRelatedThoughts } from "./thought-articles";
import { ThoughtPreviewCard } from "./ThoughtPreviewCard";

export function RelatedThoughts({ slug }: { slug: string }) {
  const thoughts = getRelatedThoughts(slug);

  if (thoughts.length === 0) {
    return null;
  }

  return (
    <section className="relatedThoughts" aria-labelledby="related-thoughts-heading">
      <p className="relatedThoughtsKicker">Other articles</p>
      <h2
        id="related-thoughts-heading"
        className="thoughtArticleSectionTitle text-2xl font-semibold leading-snug text-[#131620]"
      >
        Explore other articles
      </h2>
      <div className="thoughtsGrid">
        {thoughts.map((thought) => (
          <ThoughtPreviewCard key={thought.slug} thought={thought} layout="grid" />
        ))}
      </div>
    </section>
  );
}
