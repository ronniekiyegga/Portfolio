"use client";

import { Card } from "@/app/components/ui/card";
import { DesignCardMarquee, DesignMarqueeSection } from "./DesignCardMarquee";
import Image from "next/image";

const projectCard = [
  {
    title: "EduFeedbackPro",
    src: "/DMI.svg",
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
    src: "/MATHS_TUTORING.svg",
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
    src: "/GOOGLE_TEACHABLE.svg",
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
    src: "/AI_PSEUDOCODE.svg",
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
    src: "/TRUE_FOUNDERS.svg",
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
    src: "/GITHUB_FINDER.svg",
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
}

export default function FeaturesSliderSection({
  backgroundImage = "url(/Hero_background.png)",
  backgroundColor = "bg-transparent",
}: FeaturesSliderSectionProps) {
  return (
    <DesignMarqueeSection
      id="design"
      itemCount={projectCard.length}
      className="bg-transparent @container"
    >
      {projectCard.map((content, index) => (
        <div
          key={`${content.title}-${index}`}
          className="flex w-[min(480px,50vw)] min-w-[280px] max-w-[500px] shrink-0 flex-col gap-4"
        >
          <Card
            className={`ring-indigo-600 bg-${backgroundColor} border-white shadow-black/4 relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl shadow-md ring-0`}
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
              width={400}
              height={400}
              sizes="(max-width: 640px) 280px, 480px"
              className="absolute inset-0 size-full object-contain opacity-95 transition-opacity duration-500 hover:opacity-100"
            />
          </Card>
          {content.description}
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
