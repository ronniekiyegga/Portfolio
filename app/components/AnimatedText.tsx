"use client";
import { LinkPreview } from "@/app/components/ui/link-preview";
import { Style_Script } from "next/font/google";

interface AnimatedTextProps {
  figma?: string;
  engineering?: string;
}

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function AnimatedText({
  figma = "Design",
  engineering = " Engineering",
}: AnimatedTextProps) {
  return (
    <div className="flex justify-center items-start h-40 flex-col px-4">
      {/* <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10">
        Visit{" "}
        <LinkPreview
          url="https://www.msmaryamsmaths.com"
          className="font-bold bg-clip-text text-transparent bg-linear-to-br from-purple-500 to-pink-500"
        >
          Aceternity UI
        </LinkPreview>{" "}
        and for amazing Tailwind and Framer Motion components.
      </div> */}

      <div className=" dark:text-neutral-400 text-4xl text-white md:text-4xl max-w-3xl text-left ">
        Intersection of{" "}
        <LinkPreview
          url="https://www.msmaryamsmaths.com"
          imageSrc="/BLOG.svg"
          isStatic
          className={`${styleScript.className} font-bold text-white text-4xl`}
        >
          {figma}
        </LinkPreview>{" "}
        <span className={`${styleScript.className} font-bold text-white`}>
          &
        </span>
        <LinkPreview
          url="/templates"
          imageSrc="/NUMERIX_AI.svg"
          isStatic
          className={`${styleScript.className} font-bold text-4xl text-white`}
        >
          {engineering}
        </LinkPreview>{" "}
        .
      </div>
    </div>
  );
}
