"use client";

import { Card } from "@/app/components/ui/card";
import { DesignMarqueeSection } from "./DesignCardMarquee";
import Image from "next/image";

const projectCard = [
  {
    title: "EduFeedbackPro",
    src: "/images/projects/edufeedbackpro/DMI.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            EduFeedback Pro
          </strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "Maths Tutoring",
    src: "/images/projects/maths-tutoring/MATHS_TUTORING.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            Ms.Maryam&apos;s Math
          </strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "Google Teachable",
    src: "/images/projects/knn-classifier/google-teachable/GOOGLE_TEACHABLE.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            Google Teachable Machine
          </strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "AI-Pseudocode",
    src: "/images/projects/algo-pseudo/AI_PSEUDOCODE.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">AI-Pseudocode</strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "TrueFounders",
    src: "/images/projects/truefounders/TRUE_FOUNDERS.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">TrueFounders</strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "Github Finder",
    src: "/images/projects/github-finder/GITHUB_FINDER.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            Github Finders
          </strong>{" "}
          Desktop and mobile User interface designed to display GitHub user
          profiles and repositories
        </p>
      </>
    ),
  },
];

interface FeaturesSliderSectionProps {
  backgroundImage?: string;
  backgroundColor?: string;
  direction?: "left" | "right";
}

export default function FeaturesSliderSection({
  backgroundImage = "url(/images/backgrounds/BG_1.png)",
  backgroundColor = "bg-transparent",
  direction = "left",
}: FeaturesSliderSectionProps) {
  return (
    <DesignMarqueeSection
      id={direction === "right" ? "design-reverse" : "design"}
      itemCount={projectCard.length}
      direction={direction}
      className="bg-transparent @container py-2"
    >
      {projectCard.map((content, index) => (
        <div
          key={`${content.title}-${index}`}
          className="flex w-[min(480px,40vw)] min-w-[280px] my-4 max-w-[500px] shrink-0 flex-col gap-4"
        >
          <Card
            className={`ring-indigo-600 bg-${backgroundColor} border-white shadow-black/4 relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl shadow-lg ring-0`}
            style={{
              backgroundImage: `url(${backgroundImage.startsWith("/") ? backgroundImage : `/${backgroundImage}`})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Image
              src={content.src}
              alt={content.title}
              width={380}
              height={380}
              sizes="(max-width: 640px) 280px, 460px"
              className="absolute inset-0 size-full object-contain opacity-95 transition-opacity duration-500 hover:opacity-100"
            />
          </Card>
          {/* {content.description} */}
        </div>
      ))}
    </DesignMarqueeSection>
  );
}

{
  /* <div className="scale-90">
  <AiAutocompleteIllustration />
</div> */
}

{
  /* <div className="scale-90">
    <TranslationInterfaceIllustration />
</div> */
}
