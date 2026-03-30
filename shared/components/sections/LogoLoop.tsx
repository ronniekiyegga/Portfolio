"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import LogoLoop, { type LogoItem } from "@/shared/components/media/LogoLoop";
import { FaAws } from "react-icons/fa";

const LOGO_SIZE = 23;
const stackLogos: LogoItem[] = [
  { src: "/images/icons/Typescript_Icon.svg", alt: "TypeScript" },
  { src: "/images/icons/React_Icon.svg", alt: "React" },
  { src: "/images/icons/Nextjs_Icon.svg", alt: "Next.js" },
  { src: "/images/icons/Nodejs_Icon.svg", alt: "Node" },
  {
    node: (
      <FaAws
        className="shrink-0"
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
      />
    ),
    ariaLabel: "AWS",
  },
  { src: "/images/icons/Docker_Icon.svg", alt: "Docker" },
  { src: "/images/icons/Figma_Icon.svg", alt: "Figma" },
];

const LogoLoopSection = () => {
  return (
    <>
      {/* Stack logos — LogoLoop (matches stats width) */}
      <div
        data-hero-stack
        className="w-full max-w-xl mb-4 overflow-hidden [&_.flex]:justify-center! lg:[&_.flex]:justify-start!"
      >
        <LogoLoop
          logos={stackLogos}
          speed={40}
          direction="left"
          width="80%"
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
          className="mx-auto lg:mx-0 [--logoloop-fadeColor:#FEFBF1] dark:[--logoloop-fadeColor:#0a0a0a]"
        />
      </div>
    </>
  );
};

export default LogoLoopSection;
