"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import LampHeader from "./LampHeader";
import FeaturesSliderSection from "./FeaturesSliderSection";
import ExpandableFeatures from "./ExpandableFeatures";

const inter = Inter({ subsets: ["latin"] });
import { TracingBeam } from "../components/ui/tracing-beam";

export default function ProjectSection() {
  return (
    <section
      className="w-full py-10 contrast-100"
      style={{
        backgroundImage: "url(/BG_1.png)",
        // backgroundImage: "url(/Hero_Background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LampHeader />
      <TracingBeam className="w-full px-12 sm:px-20 lg:px-24 py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl lg:max-w-5xl antialiased relative">
          {/* <ExpandableFeatures /> */}
          {projectContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>

              <p
                className={twMerge(inter.className, "text-xl mb-4 text-white")}
              >
                {item.title}
              </p>

              <div className="text-sm  prose prose-sm dark:prose-invert text-gray-700">
                {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                {item.description}
              </div>
            </div>
          ))}

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
    </section>
  );
}

const projectContent = [
  // EduFeedbPro
  {
    title: "EduFeedbackPro",
    description: (
      <>
        <p>
          Schools needed real-time CAT4 score analysis, KHDA compliance
          reporting, and cross-year performance tracking. Existing solutions
          were prohibitively expensive ($800/month) and required extensive
          manual data entry.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
          veniam in commodo id reprehenderit adipisicing. Proident duis
          exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
        </p>
        <p>
          Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
          reprehenderit deserunt amet laborum consequat adipisicing officia qui
          irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
          Amet culpa officia aliquip deserunt veniam deserunt officia
          adipisicing aliquip proident officia sunt.
        </p>
      </>
    ),
    badge: "/ˈEngineering/",
    image: "/NUMERIX_AI.svg",
    TechStack: [
      "Next.js",
      "MongoDB",
      "BigQuery",
      "NextAuth",
      "Vercel",
      "Github Actions",
    ],
  },
  // Ms Maryam's Maths
  {
    title: "Mathematics Tutoring",
    description: (
      <>
        <p>
          Professional tutoring platform for GCSE and A-Level mathematics.
          Full-stack application with modern design, student engagement
          features, and production deployment architecture.
        </p>
        <p>
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
        </p>
      </>
    ),
    badge: "/ˈEngineering/",
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
  },
  // Google Teachable Machine
  {
    title: "Google Teachable Machine",
    description: (
      <>
        <p>
          Browser-based machine learning classifier that replaced Google&apos;s
          Teachable Machine for iPad-only classrooms. Enabled 400+ students to
          build ML models without desktop access.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    badge: "/ˈEngineering'/",
    image: "/GOOGLE_TEACHABLE.svg",
  },
  // TrueFounders
  {
    title: "TrueFounders",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
      </>
    ),
    badge: "/Design'/",
    image: "/DMI.svg",
    TechStack: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "Figma"],
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
