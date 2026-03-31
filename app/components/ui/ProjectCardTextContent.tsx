"use client";

import { FaGithub } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { motion, useReducedMotion } from "motion/react";
import { useProjectContext } from "@/app/contexts/ProjectContext";
import type { WorkItem } from "@/lib/data";
import ProjectCardItem from "./ProjectCardItem";

export type TechTag = {
  label: string;
  hasBorder: boolean;
  hasBg: boolean;
};

export type ShowcaseProject = {
  category?: string;
  title: string;
  tag: string;
  year: number;
  caseStudy: string;
  description: string;
};

export type ProjectCardTextContentProps = {
  project: ShowcaseProject;
  workItem: WorkItem;
  techTags: readonly TechTag[];
};

const PC_VIEWPORT = { once: true, amount: 0.3 as const };
const PC_EASE = [0.22, 1, 0.36, 1] as const;

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

  const staggerChild = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.46, ease: PC_EASE },
        },
      };

  return (
    <div className="relative z-10 flex min-w-0 flex-1 flex-col items-start gap-6">
      <ProjectCardItem
        index={0}
        title={project.title}
        category={project.category}
        tag={project.tag}
        caseStudy={project.caseStudy}
        year={project.year}
        description={project.description}
        workItem={workItem}
        openModal={openModal}
      />

      <motion.div
        className="flex w-full flex-wrap items-center gap-3"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={PC_VIEWPORT}
      >
        {techTags.map((tag) =>
          tag.hasBg ? (
            <motion.span
              key={`${tag.label}-bg`}
              variants={staggerChild}
              className="rounded-[4.08px] bg-[#fbfbfb] px-[12.23px] text-[10.2px] font-semibold leading-[20.9px] text-[rgba(186,188,205,1)]"
            >
              {tag.label}
            </motion.span>
          ) : (
            <motion.span
              key={tag.label}
              variants={staggerChild}
              className="border-b border-black/10 px-0.5 text-[10.2px] font-semibold leading-[20.9px] text-[rgba(186,188,205,1)]"
            >
              {tag.label}
            </motion.span>
          ),
        )}

        <motion.span
          variants={staggerChild}
          className="mx-2 hidden h-[10.64px] w-px bg-black/15 sm:block"
        />
        <motion.span
          variants={staggerChild}
          className="inline-flex items-center gap-2 text-[rgba(0,0,0,0.65)]"
        >
          <FaGithub />
          <HiArrowTopRightOnSquare />
        </motion.span>
      </motion.div>
    </div>
  );
};

export default ProjectCardTextContent;
