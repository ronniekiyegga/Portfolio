"use client";

import { motion, useReducedMotion } from "motion/react";
import { useProjectContext } from "@/app/contexts/ProjectContext";
import type { WorkItem } from "@/lib/data";
import ProjectCardItem from "./ProjectCardItem";

export type TechTag = string;

export type ShowcaseProject = {
  figmaHref?: string;
  caseStudy: string;
};

export type ProjectCardTextContentProps = {
  project: ShowcaseProject;
  workItem: WorkItem;
  techTags: readonly TechTag[];
};

const PC_VIEWPORT = {
  once: true,
  amount: 0.12 as const,
  margin: "0px 0px -15% 0px",
};

function typeToCategoryAndTag(
  type: string,
  tag?: string,
): {
  category?: string;
  tag: string;
} {
  const parts = type
    .split("·")
    .map((p) => p.trim())
    .filter(Boolean);
  const category = parts[0]?.toUpperCase();
  const resolvedTag = tag ?? parts[1] ?? parts[0] ?? "";
  return { category, tag: resolvedTag };
}

const ProjectCardTextContent = ({
  project,
  workItem,
  techTags,
}: ProjectCardTextContentProps) => {
  const { openModal } = useProjectContext();
  const reduceMotion = useReducedMotion();
  const { tag } = typeToCategoryAndTag(workItem.type, workItem.tag);

  const staggerParent = reduceMotion
    ? {
        hidden: {},
        show: {
          transition: { staggerChildren: 0, delayChildren: 0 },
        },
      }
    : {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.12, delayChildren: 0.35 },
        },
      };

  return (
    <div className="relative z-10 flex min-w-0 flex-1 flex-col items-stretch gap-4 text-left">
      <ProjectCardItem
        index={0}
        title={workItem.title}
        tag={tag}
        caseStudy={project.caseStudy}
        figmaHref={project.figmaHref}
        description={workItem.desc}
        workItem={workItem}
        openModal={openModal}
      />

      <motion.div
        className="flex w-full flex-wrap items-center justify-start gap-1"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={PC_VIEWPORT}
      >
        {techTags.map((techLabel) => (
          <span
            key={techLabel}
            className="inline-flex rounded-full bg-gray-50 px-2 py-0.5 dark:bg-gray-800"
          >
            <span className="text-[8.5px] font-semibold leading-[20.9px]  bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] bg-clip-text text-transparent">
              {techLabel}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectCardTextContent;
