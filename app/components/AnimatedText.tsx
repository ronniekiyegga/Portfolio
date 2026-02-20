"use client";
import { LinkPreview } from "@/app/components/ui/link-preview";
import { Style_Script } from "next/font/google";

interface AnimatedTextProps {
  figma?: string;
  engineering?: string;
}

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function AnimatedText({
  figma = "Design, ",
  engineering = "Engineering",
}: AnimatedTextProps) {
  return (
    <div className="flex justify-center items-start h-40 flex-col px-4">
      <div className="text-slate-50 dark:text-white max-w-xs text-[20px] text-center md:text-3xl md:max-w-4xl">
        <span className="font-(family-name:--font-source-serif) font-semibold mr-1">
          Intersection of{" "}
        </span>
        <LinkPreview
          url="https://www.msmaryamsmaths.com"
          imageSrc="/BLOG.svg"
          isStatic
          className={`${styleScript.className} font-bold text-2xl md:text-4xl`}
        >
          {figma}
        </LinkPreview>{" "}
        <LinkPreview
          url="/templates"
          imageSrc="/NUMERIX_AI.svg"
          isStatic
          className={`${styleScript.className} font-bold text-2xl md:text-4xl `}
        >
          {engineering}
        </LinkPreview>{" "}
        <span
          className={`font-(family-name:--font-source-serif) font-semibold `}
        >
          & ML
        </span>
      </div>
    </div>
  );
}
