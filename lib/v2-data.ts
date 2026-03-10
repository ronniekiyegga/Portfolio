export interface WorkItemInsight {
  title: string;
  content: string;
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

export const workItems: WorkItem[] = [
  {
    type: "B2B SaaS · Analytics Platform",
    title: "EduFeedbackPro",
    desc: "School analytics platform for KHDA compliance and student performance tracking. Reduced reporting from 12 hours to 15 minutes.",
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
  },
  {
    type: "B2C SaaS · Tutoring Platform",
    title: "Ms. Maryam's Maths",
    desc: "Production tutoring platform with role-based access, JWT auth, and CI/CD pipeline. Zero unauthorised access incidents post-launch.",
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
  },
  {
    type: "Educational Tool · ML Classifier",
    title: "KNN Image Classifier",
    desc: "Browser-based ML classifier replacing Google Teachable Machine for iPad classrooms. Real-time client-side inference with TensorFlow.js.",
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
  },
  {
    type: "Developer Tool · Open Source",
    title: "PseudoLab IDE",
    desc: "Browser-based Cambridge Pseudocode IDE with real-time execution, AI-powered code review (BYOK pattern), and Stripe credit system. Adopted by 400+ students, including GCSE/A-Level students.",
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
    desc: "Built and shipped EdTech products used by 400+ students, including a browser-based Cambridge Pseudocode IDE, a KNN image classifier, and a real-time assessment dashboard — all tested to 95%+ coverage with zero critical regressions over 12 months.",
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
    role: "Full-Stack Software Engineer",
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
