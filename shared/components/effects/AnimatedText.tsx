"use client";
import { LinkPreview } from "@/shared/components/ui/link-preview";
import { styleScript } from "@/app/fonts";

interface AnimatedTextProps {
  figma?: string;
  engineering?: string;
}

export default function AnimatedText({
  figma = "Design, ",
  engineering = "Engineering",
}: AnimatedTextProps) {
  return (
    <div className="flex justify-center items-start h-40 flex-col px-4">
      <div className="text-white max-w-xs text-[16px] text-center md:text-xl md:max-w-4xl">
        <span className="font-(family-name:--font-source-serif) font-semibold mr-1">
          Intersection of{" "}
        </span>
        <LinkPreview
          url="https://www.msmaryamsmaths.com"
          imageSrc="/images/illustrations/BLOG.svg"
          isStatic
          className={`${styleScript.className} font-bold text-2xl md:text-2xl`}
        >
          {figma}
        </LinkPreview>{" "}
        <LinkPreview
          url="/templates"
          imageSrc="/images/projects/edufeedbackpro/numerix-ai/NUMERIX_AI.svg"
          isStatic
          className={`${styleScript.className} font-bold text-2xl md:text-2xl `}
        >
          {engineering}
        </LinkPreview>{" "}
        <span
          className={`font-(family-name:--font-source-serif) font-semibold `}
        >
          & AI
        </span>
      </div>
    </div>
  );
}
