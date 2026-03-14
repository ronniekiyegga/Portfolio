export interface WorkItemInsight {
  title: string;
  content: string;
}

export interface ProjectSectionStat {
  value: string;
  label: string;
}

export interface WorkItem {
  type: string;
  title: string;
  desc: string;
  tags: string[];
  metric: string;
  href: string;
  gradient: string;
  /** Preview variant: inline HTML/CSS mockup (analytics | maths | knn | pseudolab) */
  preview: "analytics" | "maths" | "knn" | "pseudolab";
  /** HERO SVG from public folder for preview image */
  heroImage: string;
  /** Optional blog URL for project modal header */
  blogHref?: string;
  /** Optional GitHub URL for project modal header */
  githubHref?: string;
  /** Optional insights for tracing beam in project modal */
  insights?: WorkItemInsight[];
  /** Optional stats shown in project modal below image, above problem */
  statistics?: ProjectSectionStat[];
}

export interface DesignItem {
  type: string;
  name: string;
  gradient: string;
  accentColor: string;
  label: string;
  sublabel: string;
  extras?: "buttons" | "logo-circle" | "code" | "dots" | "search";
}

import type { TechIconKey } from "@/app/components/integrations-one";

export interface ExperienceItem {
  initial: string;
  company: string;
  role: string;
  desc: string;
  tags: string[];
  techStack?: TechIconKey[];
  dates: string;
}

/** V1 Experiences component (expandable list) */
export interface ExperienceV1Item {
  id: string;
  organisation: string;
  role: string;
  dates: string;
  responsibilities: string;
  techStack?: TechIconKey[];
}

export const experiencesV1: ExperienceV1Item[] = [
  {
    id: "SRS",
    organisation: "The School Of Research Science",
    role: "Software Engineer",
    dates: "2023 - 2026",
    responsibilities:
      "Built multiple internal EdTech platforms used across the school's computer science programme including a real-time student analytics platform, an AI-powered browser-based pseudocode IDE with semantic analysis, and a KNN image classifier for on-device ML inference.",
    techStack: [
      "Figma",
      "Nextjs",
      "Python",
      "TypeScript",
      "Docker",
      "Redis",
      "Nginx",
      "TensorFlow",
    ],
  },
  {
    id: "Freelance",
    organisation: "Freelance (Contract Work)",
    role: "Software Engineer ",
    dates: "2020 - 2023",
    responsibilities:
      "Designed and built production-grade web products for clients, including a 30+ component design system across 8 storefronts, a microservices e-commerce platform with 99.9% uptime, and a video processing pipeline that cut media delivery costs by 40%.",
    techStack: ["Figma", "React", "Python", "TypeScript", "Nginx", "Nodejs"],
  },
  {
    id: "Internship",
    organisation: "Adaptive",
    role: "Software Engineer Intern ",
    dates: "2019 - 2019",
    responsibilities:
      "Built interactive React dashboards with D3.js timeline visualizations for 3 fintech product teams, enabling self-serve reporting for non-technical stakeholders and significantly reducing analyst data retrieval time.",
    techStack: ["React", "TypeScript", "Figma", "Slack", "Nodejs"],
  },
  {
    id: "Fitness",
    organisation: "DW Fitness First Baker Street",
    role: "Senior Strength & Conditioning Consultant",
    dates: "2015 - 2019",
    responsibilities:
      "Led delivery of performance and conditioning programs across multi-club teams, including FGT and Team GB Pro Athlete initiatives. Designed individualised training and nutrition plans while managing onboarding and trainer allocation, improving client performance, recovery, and retention.",
    techStack: [],
  },
];

export const workItems: WorkItem[] = [
  {
    type: "B2B SaaS · Analytics Platform",
    title: "EduFeedbackPro",
    desc: "B2B school analytics platform designed to replace spreadsheet reporting with real-time dashboards and performance insights.",
    tags: ["Next.js", "BigQuery", "MongoDB", "Docker"],
    metric: "sub-50ms P95 response",
    href: "#",
    gradient: "linear-gradient(160deg, #0d0d1f 0%, #1a0d2e 50%, #120820 100%)",
    preview: "analytics",
    heroImage: "/EFP_PNG.png",
    insights: [
      {
        title: "The Problem",
        content:
          "Assessment feedback in schools faces a critical timing challenge. The gap between when students complete an assessment and when they receive actionable feedback directly impacts learning outcomes. Teachers face a fragmented data landscape when preparing student feedback. Assessment results often reside across multiple disconnected systems—exam board portals, spreadsheets, student information systems, and paper-based records. Consolidating this data and generating meaningful, individualised feedback requires significant manual effort. The consequence: feedback reaches students days or weeks after the assessment, by which point they've progressed to new topics.",
      },
    ],
    statistics: [
      { value: "95%", label: "Time Saved" },
      { value: "30+", label: "Teachers" },
      { value: "50ms", label: "P95 Latency" },
    ],
  },
  {
    type: "B2C SaaS · Tutoring Platform",
    title: "Ms. Maryam's Maths",
    desc: "End-to-end design and development of a tutoring platform for GCSE and A-Level students from brand and UX in Figma to a production dashboard system.",
    tags: ["TypeScript", "PostgreSQL", "GitHub Actions"],
    metric: "3 min deploy vs 20+ min",
    href: "https://www.msmaryamsmaths.com/",
    gradient: "linear-gradient(160deg, #0a1628 0%, #0d2244 50%, #081830 100%)",
    preview: "maths",
    heroImage: "/TUTORING_PNG.png",
    insights: [
      {
        title: "The Challenge",
        content:
          "Building a tutoring platform that scales securely required rethinking authentication and deployment. Role-based access with JWT needed to handle multiple user types—students, tutors, and admins—while maintaining zero unauthorised access. The CI/CD pipeline reduced manual deployment from 20+ minutes to under 3 minutes, enabling faster iteration and more reliable releases.",
      },
    ],
    statistics: [
      { value: "20+", label: "Active Students" },
      { value: "3min", label: "Deploy Time" },
    ],
  },
  {
    type: "Educational Tool · ML Classifier",
    title: "KNN Image Classifier",
    desc: "On-device ML image classifier built with TensorFlow.js, enabling students to train and run models directly in the browser without server infrastructure.",
    tags: ["TensorFlow.js", "React", "On-device AI"],
    metric: "400+ students, zero infra cost",
    href: "https://blissfulcoda.github.io/teachablemachine/",
    gradient: "linear-gradient(160deg, #0a1a0a 0%, #0d2e0d 50%, #081808 100%)",
    preview: "knn",
    heroImage: "/KNN_CLASSIFIER.png",
    githubHref: "https://github.com/BlissfulCoda/teachablemachine",
    insights: [
      {
        title: "The Problem",
        content:
          "iPad classrooms couldn't use Google Teachable Machine due to browser restrictions and network requirements. Students needed a way to train and run ML classifiers entirely in the browser, with no server infrastructure. The solution: real-time client-side inference with TensorFlow.js, enabling 400+ students to use the tool with zero infrastructure cost.",
      },
    ],
    statistics: [
      { value: "400+", label: "Students" },
      { value: "BYOK", label: "AI Reviewer" },
    ],
  },
  {
    type: "Developer Tool · Open Source",
    title: "Algo-pseudo IDE",
    desc: "Browser-based pseudocode IDE for GCSE and A-Level students with real-time syntax validation and AI-assisted code review.",
    tags: ["Next.js", "TypeScript", "Open Source"],
    metric: "Exam-spec compliant",
    href: "https://www.algo-pseudo.com/",
    gradient: "linear-gradient(160deg, #0a1a1a 0%, #0d2e2e 50%, #081818 100%)",
    preview: "pseudolab",
    heroImage: "/PSEUDOLAB_PNG.png",
    blogHref: "#",
    githubHref: "https://github.com/BlissfulCoda/pseudolab",
    insights: [
      {
        title: "The Problem",
        content:
          "Students preparing for Cambridge IGCSE and A-Level Computer Science exams needed a way to write and run pseudocode that matched the exam specification exactly. Existing tools were either too generic or required local installation. PseudoLab IDE provides a browser-based environment with real-time execution, syntax highlighting, and a built-in reference—enabling 400+ students to practice exam-style pseudocode with instant feedback.",
      },
    ],
    statistics: [
      { value: "400+", label: "Students" },
      { value: "BYOK", label: "AI Reviewer" },
    ],
  },
];

/** V1 Project section: feature tabs (Design, Engineering, Github) with project-specific images */
export interface ProjectSectionFeature {
  title: string;
  description: string;
  image: string;
  background: "lightPillar" | "prism" | "lightRays" | "floatingLines";
  href?: string;
}

export interface ProjectSectionItem {
  /** WorkItem is the single source of truth for title, desc, modal content */
  workItem: WorkItem;
  /** Short badge for project section (e.g. "B2C SAAS PLATFORM") */
  badge: string;
  /** Feature tabs shown on left - project-specific images */
  features: ProjectSectionFeature[];
  /** Optional links for design file, live site (overrides workItem.href if set) */
  links?: {
    liveWebsite?: string;
    designFile?: string;
    githubHref?: string;
  };
}

/** V1 project section items - derived from workItems, single source of truth */
export const projectSectionItems: ProjectSectionItem[] = [
  {
    workItem: workItems[0],
    badge: "ANALYTICS PLATFORM",
    features: [
      {
        title: "Design blog",
        description: "",
        image: "/DMI_HERO.svg",
        background: "lightPillar",
      },
      {
        title: "Engineering blog",
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
  {
    workItem: workItems[1],
    badge: "B2C SAAS PLATFORM",
    links: {
      designFile:
        "https://www.figma.com/proto/uCGr0CmmdDMJ0ngspgtqDa/Sarah-s-Maths-School?page-id=6%3A113&node-id=49-6208&viewport=616%2C735%2C0.22&t=D4BguGiRPhyckL0L-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=49%3A6208",
      liveWebsite: "https://www.msmaryamsmaths.com/",
    },
    features: [
      {
        title: "Design blog",
        description: "",
        image: "/MATHS_TUTORING_HERO.svg",
        background: "floatingLines",
      },
      {
        title: "Engineering blog",
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
  {
    workItem: workItems[2],
    badge: "EDUCATIONAL TOOL",
    features: [
      {
        title: "Design blog",
        description: "",
        image: "/GOOGLE_TEACHABLE.svg",
        background: "lightRays",
      },
      {
        title: "Engineering blog",
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
  {
    workItem: workItems[3],
    badge: "DEVELOPER TOOL",
    links: { liveWebsite: "https://www.algo-pseudo.com/" },
    features: [
      {
        title: "Design blog",
        description: "",
        image: "/PSEUDOLAB_HERO.svg",
        background: "prism",
      },
      {
        title: "Engineering blog",
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

export const designItems: DesignItem[] = [
  {
    type: "Analytics UI",
    name: "EduFeedbackPro",
    gradient: "linear-gradient(160deg, #08081a 0%, #1a0d40 50%, #0d0820 100%)",
    accentColor: "#d4ff47",
    label: "EFP",
    sublabel: "ANALYTICS PLATFORM",
  },
  {
    type: "SaaS Platform",
    name: "Ms. Maryam's Maths",
    gradient: "linear-gradient(160deg, #060e20 0%, #0a1e44 50%, #060e28 100%)",
    accentColor: "#47a8ff",
    label: "∫",
    sublabel: "TUTORING PLATFORM",
    extras: "buttons",
  },
  {
    type: "Brand Identity",
    name: "True Founders",
    gradient: "linear-gradient(160deg, #100e00 0%, #2a2200 50%, #181400 100%)",
    accentColor: "#ffd147",
    label: "TF",
    sublabel: "COACHING BRAND",
    extras: "logo-circle",
  },
  {
    type: "Developer Tool",
    name: "PseudoLab IDE",
    gradient: "linear-gradient(160deg, #040e0e 0%, #0a2424 50%, #041414 100%)",
    accentColor: "#44ffcc",
    label: "PSEUDOLAB",
    sublabel: "",
    extras: "code",
  },
  {
    type: "AI Product UI",
    name: "Numerix AI",
    gradient: "linear-gradient(160deg, #180010 0%, #320020 50%, #200018 100%)",
    accentColor: "#ff4777",
    label: "Nx",
    sublabel: "AI PLATFORM",
    extras: "dots",
  },
  {
    type: "Profile UI",
    name: "Github Finder",
    gradient: "linear-gradient(160deg, #080818 0%, #120e30 50%, #0a0820 100%)",
    accentColor: "#a78bfa",
    label: "Gh",
    sublabel: "GITHUB FINDER",
    extras: "search",
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    initial: "S",
    company: "The School of Research Science",
    role: "Software Engineer",
    desc: "Built multiple internal EdTech platforms used across the school's computer science programme including a real-time student analytics platform, an AI-powered browser-based pseudocode IDE with semantic analysis, and a KNN image classifier for on-device ML inference.",
    tags: ["Next.js", "TypeScript", "TensorFlow.js", "Docker", "Redis"],
    techStack: [
      "Figma",
      "Nextjs",
      "Python",
      "TypeScript",
      "Docker",
      "Redis",
      "Nginx",
      "TensorFlow",
    ],
    dates: "2023 — 2026",
  },
  {
    initial: "F",
    company: "Freelance ",
    role: "Independent Software Engineer",
    desc: "Designed and built production-grade products for clients, including a 30+ component design system across 8 storefronts, a microservices e-commerce platform with 99.9% uptime, and a video pipeline that cut media costs by 40%.",
    tags: ["React", "Node.js", "AWS S3", "Stripe", "Figma"],
    techStack: ["Figma", "React", "Python", "TypeScript", "Nginx", "Nodejs"],
    dates: "2020 — 2023",
  },
  {
    initial: "A",
    company: "Adaptive",
    role: "Software Engineer Intern",
    desc: "Built project timeline visualisations for senior management across 3 product teams. Collaborated with data analysts and the UX team on internal dashboards for financial workflows.",
    tags: ["React", "TypeScript", "Data Viz"],
    techStack: ["React", "TypeScript", "Figma", "Slack", "Nodejs"],
    dates: "2019 - 2019",
  },
  {
    initial: "D",
    company: "DW Fitness First Baker Street",
    role: "Senior Strength & Conditioning Consultant",
    desc: "Led delivery of performance and conditioning programs across multi-club teams, including FGT and Team GB Pro Athlete initiatives. Designed individualised training and nutrition plans while managing onboarding and trainer allocation.",
    tags: [],
    dates: "2015 — 2019",
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: [
      "TypeScript / JavaScript",
      "React and Next.js",
      "Tailwind CSS",
      "React Query",
      "TensorFlow.js",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js and Express",
      "PostgreSQL / MongoDB",
      "RESTful APIs",
      "BigQuery",
      "Python",
    ],
  },
  {
    label: "Infrastructure",
    skills: [
      "Docker and Nginx",
      "GitHub Actions CI/CD",
      "AWS S3 and EC2",
      "DigitalOcean",
      "Sentry",
    ],
  },
  {
    label: "Design",
    skills: [
      "Figma (Advanced)",
      "Design Systems",
      "Prototyping",
      "WCAG Accessibility",
      "Motion Design",
    ],
  },
];
