"use client";

import { motion, useReducedMotion } from "motion/react";
import { useProjectContext } from "@/app/contexts/ProjectContext";
import type { WorkItem } from "@/lib/data";
import ProjectCardItem from "./ProjectCardItem";

export type TechTag = string;

export type ShowcaseProject = {
  category?: string;
  title: string;
  tag: string;
  year: number;
  figmaHref?: string;
  caseStudy: string;
  description: string;
};

export type ProjectCardTextContentProps = {
  project: ShowcaseProject;
  workItem: WorkItem;
  techTags: readonly TechTag[];
};

const PC_VIEWPORT = { once: true, amount: 0.3 as const };

const ProjectCardTextContent = ({
  project,
  workItem,
  techTags,
}: ProjectCardTextContentProps) => {
  const { openModal } = useProjectContext();
  const reduceMotion = useReducedMotion();

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
          transition: { staggerChildren: 0.045, delayChildren: 0.3 },
        },
      };

  return (
    <div className="relative z-10 flex min-w-0 flex-1 flex-col items-start gap-4 text-left">
      <ProjectCardItem
        index={0}
        title={project.title}
        category={project.category}
        tag={project.tag}
        caseStudy={project.caseStudy}
        year={project.year}
        figmaHref={project.figmaHref}
        description={project.description}
        workItem={workItem}
        openModal={openModal}
      />

      <motion.div
        className="flex w-full flex-wrap items-center justify-start gap-2"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={PC_VIEWPORT}
      >
        {techTags.map((tag) => {
          const base =
            "text-[10.2px] font-semibold leading-[20.9px] text-black/60 dark:text-white/60 bg-gray-50 px-1 py-0.5 ";

          return (
            <span key={tag} className={` ${base} dark:bg-gray-600 rounded-sm`}>
              {tag}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProjectCardTextContent;
