"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LampHeader from "./LampHeader";
import FeaturesSliderSection from "./FeaturesSliderSection";
import ExpandableFeatures4, { type Feature } from "./ExpandableFeatures4";
import { TracingBeam } from "../components/ui/tracing-beam";
import { ProjectModal } from "./v2/ProjectModal";
import { workItems, type WorkItem } from "@/lib/v2-data";

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProjectModal = (workItem: WorkItem) => {
    setSelectedItem(workItem);
    setModalOpen(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(
      "[data-project-card]",
    );
    if (!cards.length) return;

    cards.forEach((card) => {
      const els = [
        card.querySelector("[data-project-badge]"),
        card.querySelector("[data-project-title]"),
        card.querySelector("[data-project-content]"),
        card.querySelector("[data-project-cta]"),
      ].filter(Boolean) as HTMLElement[];
      gsap.set(els, { autoAlpha: 0, force3D: true });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const badge = card.querySelector("[data-project-badge]");
          const title = card.querySelector("[data-project-title]");
          const content = card.querySelector("[data-project-content]");
          const cta = card.querySelector("[data-project-cta]");
          const els = [badge, title, content, cta].filter(
            Boolean,
          ) as HTMLElement[];

          gsap.to(els, {
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: "auto",
            force3D: true,
          });
          observer.unobserve(card);
        });
      },
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full min-w-0 overflow-x-hidden py-20 bg-[url('/BG_1.png')] bg-cover bg-center bg-no-repeat"
    >
      {/* Light mode: LiquidChrome background */}
      <div className="absolute inset-0 z-0 dark:hidden">
        {/* <LiquidChrome
          baseColor={[0.9, 0.9, 1]}
          speed={0.2}
          amplitude={0.5}
          interactive
          className="size-full opacity-10"
        /> */}
      </div>
      <div className="relative z-10">
        <LampHeader />
        <TracingBeam className="w-full px-12 sm:px-20 lg:px-30 py-12 md:py-2">
          <div
            ref={containerRef}
            className="mx-auto w-full max-w-4xl lg:max-w-5xl antialiased relative"
          >
            {projectContent.map((item, index) => (
              <div key={`content-${index}`} data-project-card className="mb-32">
                <ExpandableFeatures4
                  badge={item.badge}
                  title={item.title}
                  description={item.description}
                  imageOnLeft={index % 2 === 1}
                  detailsImage={item.image}
                  features={item.features}
                  links={item.links}
                  workItem={item.workItem}
                  onOpenProjectModal={openProjectModal}
                />
              </div>
            ))}
          <ProjectModal
            item={selectedItem}
            open={modalOpen}
            onOpenChange={setModalOpen}
          />

            {/* {projectContent.map((item, index) => (
            <div key={`content-${index}`} data-project-card className="mb-10">
              <h4
                data-project-badge
                className="opacity-0 text-white font-bold rounded-full text-[11px] w-fit py-1 mb-2 text-gradient-blue"
              >
                {item.badge}
              </h4>

              <p
                data-project-title
                className={twMerge(
                  inter.className,
                  "opacity-0 text-2xl font-bold mb-4 text-white ",
                )}
              >
                {item.title}
              </p>

              <div
                data-project-content
                className="opacity-0 text-sm prose prose-sm dark:prose-invert text-gray-400"
              >
                {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover text-black dark:text-white"
                  />
                )}
                {item.description}
              </div>
            </div>
          ))} */}

            {/* {PROJECTDISPLAY.map((tab) => {
            const { content: Content, ...tabProps } = tab;
            return (
              <span key={tab.title}>
                <Content {...tabProps} />
              </span>
            );
          })} */}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}

const projectContent: Array<{
  title: string;
  description: React.ReactNode;
  badge: string;
  image?: string;
  statistics?: Array<Record<string, number>>;
  TechStack?: string[];
  features?: Feature[];
  /** Live site URL → "Live Website" or "Live Demo" button. designFile → "Design File" button (e.g. Figma). */
  links?: { liveWebsite?: string; designFile?: string };
  /** WorkItem for ProjectModal (V2-style modal when clicking Live Website). */
  workItem?: WorkItem;
}> = [
  // EduFeedbPro
  {
    title: "EduFeedbackPro",
    workItem: workItems[0],
    description: (
      <>
        <p>
          School analytics platform for KHDA compliance and student performance
          tracking across UAE schools. Reduced manual reporting time from 12
          hours to 15 minutes per cycle.
        </p>
      </>
    ),
    badge: "B2B SAAS PLATFORM",
    statistics: [
      {
        ActiveStudents: 1200,
        schools: 1,
        timesSaved: 98,
        costReduction: 2.4,
      },
    ],
    image: "/DMI_HERO.svg",
    TechStack: [
      "Next.js",
      "MongoDB",
      "BigQuery",
      "NextAuth",
      "Vercel",
      "Github Actions",
    ],
    features: [
      {
        title: "Design",
        description: "",
        image: "/DMI_HERO.svg",
        background: "lightPillar",
      },
      {
        title: "Engineering",
        description: "",
        image: "/EDUFEEDBACKPRO.svg",
        background: "prism",
      },
      {
        title: "Github",
        description: "",
        image: "/NUMERIX_AI.svg",
        background: "lightRays",
      },
    ],
  },
  // Ms Maryam's Maths
  {
    title: "Mathematics Tutoring",
    workItem: workItems[1],
    links: {
      designFile:
        "https://www.figma.com/proto/uCGr0CmmdDMJ0ngspgtqDa/Sarah-s-Maths-School?page-id=6%3A113&node-id=49-6208&viewport=616%2C735%2C0.22&t=D4BguGiRPhyckL0L-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=49%3A6208",
      liveWebsite: "https://www.msmaryamsmaths.com/",
    },
    description: (
      <>
        <p>
          Professional tutoring platform for GCSE and A-Level mathematics.
          Full-stack application with modern design, student engagement
          features, and production deployment architecture.
        </p>
        {/* <p>
          CHALLEGE: Building a professional tutoring presence with engaging UX
          while maintaining scalability for future student management features.
          Needed production-grade infrastructure on a budget, with reliable
          deployment pipeline and secure SSL configuration.
        </p>
        <p>
          SOLUTION: Designed and developed a full-stack Next.js application with
          Express backend for API services. Implemented modern UI with Framer
          Motion animations, Tailwind CSS v4, and responsive design. Deployed on
          VPS with nginx reverse proxy, PM2 process management, and automated
          CI/CD via GitHub Actions. Configured SSL certificates through Certbot
          for secure HTTPS connections.
        </p>
        <p>
          TECHNICAL HIGHLIGHT: Built monorepo architecture separating frontend
          (Next.js on port 3000) and backend (Express on port 3001) with nginx
          routing. Implemented design token system for pixel-perfect
          Figma-to-code translation. Configured production environment with
          zero-downtime deployments using PM2 and GitHub Actions. Integrated
          CORS configuration, environment-based routing, and production-ready
          error handling.
        </p> */}
      </>
    ),
    badge: "B2C SAAS PLATFORM",
    image: "/MATHS_TUTORING.svg",
    TechStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "React 19",
      "Nginx",
      "PM2",
      "Certbot",
      "GitHub Actions",
    ],
    features: [
      {
        title: "Design",
        description: "",
        image: "/MATHS_TUTORING_HERO.svg",
        background: "floatingLines",
      },
      {
        title: "Engineering",
        description: "",
        image: "/MATHS_TUTORING2.svg",
        background: "prism",
      },
      {
        title: "Github",
        description: "",
        image: "/BLOG.svg",
        background: "lightPillar",
      },
    ],
  },
  // Google Teachable Machine
  {
    title: "Google Teachable Machine",
    workItem: workItems[2],
    description: (
      <>
        <p>
          Browser-based machine learning classifier that replaced Google&apos;s
          Teachable Machine for iPad-only classrooms. Enabled 400+ students to
          build ML models without desktop access.
        </p>
        {/* <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p> */}
      </>
    ),
    badge: "EDUCATIONAL TOOL",
    image: "/GOOGLE_TEACHABLE.svg",
    features: [
      {
        title: "Design",
        description: "",
        image: "/GOOGLE_TEACHABLE.svg",
        background: "lightRays",
      },
      {
        title: "Engineering",
        description: "",
        image: "/AI_PSEUDOCODE.svg",
        background: "prism",
      },
      {
        title: "Github",
        description: "",
        image: "/CODE.svg",
        background: "lightPillar",
        href: "https://github.com/BlissfulCoda/teachablemachine",
      },
    ],
  },
  // TrueFounders
  {
    title: "PSEUDOLAB IDE",
    workItem: workItems[3],
    description: (
      <>
        <p>
          Web-based IDE for Cambridge IGCSE pseudocode specification. Used by
          400+ students for exam preparation and coursework development.
        </p>
      </>
    ),
    badge: "DEVELOPER TOOL",
    image: "/PSEUDOLAB_HERO.svg",
    TechStack: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "Figma"],
    features: [
      {
        title: "Design",
        description: "",
        image: "/PSEUDOLAB_HERO.svg",
        background: "prism",
      },
      {
        title: "Engineering",
        description: "",
        image: "/AI_PSEUDOCODE.svg",
        background: "lightPillar",
      },
      {
        title: "Github",
        description: "",
        image: "/CODE.svg",
        background: "floatingLines",
      },
    ],
  },
];

const PROJECTDISPLAY = [
  {
    title: "Code",
    content: FeaturesSliderSection,
    backgroundImage: "/BackgroundImage_2.svg",
    backgroundColor: "black",
    color: "white",
  },
  // {
  //   title: "Design",
  //   content: <FeaturesSliderSection />,
  // },
];
