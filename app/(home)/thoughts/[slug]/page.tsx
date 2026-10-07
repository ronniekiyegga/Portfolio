import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { ThoughtArticleView } from "../../_features/thoughts-index/ThoughtArticleView";
import {
  getAllThoughtArticleSlugs,
  getThoughtArticle,
} from "../../_features/thoughts-index/thought-articles";

const thoughtRedirects: Record<string, string> = {
  "debug-peak-traffic": "where-request-time-goes",
  "responsive-ten-thousand-records": "where-request-time-goes",
  "rate-limiter-1m-rps": "rate-limiting-strategy",
  "streaming-windows": "rate-limiting-strategy",
  "aggregate-logs-10000-servers": "logging-under-load",
};

export function generateStaticParams() {
  return getAllThoughtArticleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getThoughtArticle(thoughtRedirects[slug] ?? slug);

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

  if (thoughtRedirects[slug]) {
    permanentRedirect(`/thoughts/${thoughtRedirects[slug]}`);
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
