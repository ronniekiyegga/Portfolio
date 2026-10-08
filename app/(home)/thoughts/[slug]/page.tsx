import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { ThoughtArticleView } from "../../_features/thoughts-index/ThoughtArticleView";
import {
  getAllThoughtArticleSlugs,
  getThoughtArticle,
} from "../../_features/thoughts-index/thought-articles";
import {
  retiredThoughtSlugs,
  thoughtPath,
} from "../../_features/thoughts-index/thoughts";

export function generateStaticParams() {
  return getAllThoughtArticleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getThoughtArticle(retiredThoughtSlugs[slug] ?? slug);

  if (!article) {
    return { title: "Thought not found" };
  }

  return {
    title: `${article.overlayTitle} | Thoughts`,
    description: article.title,
    alternates: { canonical: article.href },
  };
}

export default async function ThoughtArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const replacementSlug = retiredThoughtSlugs[slug];
  if (replacementSlug) {
    permanentRedirect(thoughtPath(replacementSlug));
  }

  const article = getThoughtArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="page subpage">
      <ThoughtArticleView article={article} />
    </div>
  );
}
