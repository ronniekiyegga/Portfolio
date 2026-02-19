import { Card } from "@/app/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import Image from "next/image";

const projectCard = [
  {
    title: "EduFeedbackPro",
    src: "/public/DMI.svg",
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
    <section className="bg-transparent w-full @container py-24 max-lg:px-1">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          breakpoints: {
            "(max-width: 768px)": {
              slidesToScroll: 1,
            },
            "(min-width: 768px)": {
              slidesToScroll: 2,
            },
          },
        }}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 px-6 lg:mb-10">
          <h5 className="text-left text-xs tracking-widest">EXPERIENCE</h5>
          {/* <SectionKicker>Design Work</SectionKicker> */}
          {/* <h2
            className={` text-foreground max-w-xs text-balance text-sm font-semibold`}
          >
            Intersection Of Projects
          </h2> */}
          <div className="flex items-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        {/* ...Carouself ... */}
        <CarouselContent className="gap-1 pt-6">
          {projectCard.map((content, index) => (
            <CarouselItem
              key={`${content.title}-${index}`}
              className="space-y-4 md:basis-1/2"
            >
              <Card
                className={`ring-indigo-600 bg-${backgroundColor}  border-white shadow-black/4 relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl shadow-md ring-0`}
                style={{
                  backgroundImage: `url(${backgroundImage.startsWith("/") ? backgroundImage : `/${backgroundImage}`})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Image
                  src={content.src}
                  alt="bg c1"
                  width={980}
                  height={980}
                  className="absolute inset-0 size-full opacity-95 hover:opacity-100 transition-opacity duration-500"
                />
              </Card>
              {content.description}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
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
