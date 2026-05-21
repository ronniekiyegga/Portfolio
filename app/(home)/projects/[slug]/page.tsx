import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { workItems } from "@/lib/data";
import { ProjectStudyContent } from "@/shared/components/sections/ProjectStudyContent";

export function generateStaticParams() {
  return workItems.map((w) => ({ slug: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = workItems.find((w) => w.id === slug);
  if (!item) return { title: "Project not found" };
  return {
    title: `${item.title} — Case study`,
    description: item.desc.slice(0, 160),
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workItems.find((w) => w.id === slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen min-w-0 bg-background pb-16">
      <header className="sticky top-0 z-40 flex min-w-0 items-center justify-between gap-4 border-b border-border/80 bg-background/95 px-4 py-3 backdrop-blur-md sm:px-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to home
        </Link>
        {item.href && item.href !== "#" ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Live site{" "}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        ) : null}
      </header>
      <ProjectStudyContent
        item={item}
        tracingBeamGradientId={`tb-case-${slug}`}
      />
    </div>
  );
}
