import type { ReactNode } from "react";

import { type ToolFigureId, tools } from "./tools";

import { ToolCard } from "./ToolCard";
import {
  AwsMark,
  FigmaMark,
  NodejsMark,
  PostgresqlMark,
  PythonMark,
  ReactMark,
  RonnieMark,
  TypescriptMark,
} from "./ToolMarks";

const toolFigures: Record<ToolFigureId, ReactNode> = {
  figma: <FigmaMark />,
  react: <ReactMark />,
  typescript: <TypescriptMark />,
  nodejs: <NodejsMark />,
  aws: <AwsMark />,
  ronnie: <RonnieMark />,
  postgresql: <PostgresqlMark />,
  python: <PythonMark />,
};

export function ToolsSection() {
  return (
    <section
      className="section toolsSection reveal"
      aria-labelledby="tools-heading"
    >
      <p className="sectionLabel">/ Stack &amp; Tools</p>
      <div className="toolsTray">
        <h2 className="sr-only" id="tools-heading">
          Stack and tools
        </h2>
        <ul className="toolScaffold" aria-label="Stack and tools">
          {tools.map((tool) => (
            <ToolCard
              key={tool.name}
              {...tool}
              figure={tool.figure ? toolFigures[tool.figure] : undefined}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
