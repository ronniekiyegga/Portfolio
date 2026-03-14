"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import LogoLoop, { type LogoItem } from "@/app/components/LogoLoop";
import { FaAws } from "react-icons/fa";

const LOGO_SIZE = 28;
const stackLogos: LogoItem[] = [
  { src: "/Typescript_Icon.svg", alt: "TypeScript" },
  { src: "/React_Icon.svg", alt: "React" },
  { src: "/Nextjs_Icon.svg", alt: "Next.js" },
  { src: "/Nodejs_Icon.svg", alt: "Node" },
  {
    node: (
      <FaAws
        className="shrink-0"
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
      />
    ),
    ariaLabel: "AWS",
  },
  { src: "/Docker_Icon.svg", alt: "Docker" },
  { src: "/Figma_Icon.svg", alt: "Figma" },
];

const LogoLoopSection = () => {
  return (
    <>
      {/* Stack logos — LogoLoop (matches stats width) */}
      <div
        data-hero-stack
        className="w-full max-w-2xl mx-auto mb-10 overflow-hidden [&_.flex]:justify-center! "
      >
        <LogoLoop
          logos={stackLogos}
          speed={40}
          direction="left"
          width="100%"
          logoHeight={LOGO_SIZE}
          gap={48}
          pauseOnHover
          fadeOut
          renderItem={(item) => {
            const isNode = "node" in item;
            return (
              <span
                className="flex shrink-0 items-center justify-center"
                style={{
                  width: LOGO_SIZE,
                  height: LOGO_SIZE,
                }}
              >
                {isNode ? (
                  (item as { node: ReactNode }).node
                ) : (
                  <Image
                    src={(item as { src: string }).src}
                    alt={(item as { alt?: string }).alt ?? ""}
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                    className="h-full w-full object-contain"
                  />
                )}
              </span>
            );
          }}
          ariaLabel="Technology stack"
          className="mx-auto [--logoloop-fadeColor:#FEFBF1]  dark:[--logoloop-fadeColor:#0a0a0a]"
        />
      </div>
    </>
  );
};

export default LogoLoopSection;
