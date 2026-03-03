export interface WorkItem {
  type: string
  title: string
  desc: string
  tags: string[]
  metric: string
  href: string
  gradient: string
}

export interface DesignItem {
  type: string
  name: string
  gradient: string
  accentColor: string
  label: string
  sublabel: string
  extras?: 'buttons' | 'logo-circle' | 'code' | 'dots' | 'search'
}

export interface ExperienceItem {
  initial: string
  company: string
  role: string
  desc: string
  tags: string[]
  dates: string
}

export const workItems: WorkItem[] = [
  {
    type: 'B2B SaaS · Analytics Platform',
    title: 'EduFeedbackPro',
    desc: 'School analytics platform for KHDA compliance and student performance tracking. Reduced reporting from 12 hours to 15 minutes.',
    tags: ['Next.js', 'BigQuery', 'MongoDB', 'Docker'],
    metric: 'sub-50ms P95 response',
    href: '#',
    gradient: 'linear-gradient(160deg, #1a0840 0%, #2d0f5c 60%, #15062e 100%)',
  },
  {
    type: 'B2C SaaS · Tutoring Platform',
    title: "Ms. Maryam's Maths",
    desc: 'Production tutoring platform with role-based access, JWT auth, and CI/CD pipeline. Zero unauthorised access incidents post-launch.',
    tags: ['TypeScript', 'PostgreSQL', 'GitHub Actions'],
    metric: '3 min deploy vs 20+ min',
    href: 'https://www.msmaryamsmaths.com',
    gradient: 'linear-gradient(160deg, #051a45 0%, #0c2e7a 60%, #041224 100%)',
  },
  {
    type: 'Educational Tool · ML Classifier',
    title: 'KNN Image Classifier',
    desc: 'Browser-based ML classifier replacing Google Teachable Machine for iPad classrooms. Real-time client-side inference with TensorFlow.js.',
    tags: ['TensorFlow.js', 'React', 'On-device AI'],
    metric: '400+ students, zero infra cost',
    href: '#',
    gradient: 'linear-gradient(160deg, #062010 0%, #0d3c1a 60%, #04120a 100%)',
  },
  {
    type: 'Developer Tool · Open Source',
    title: 'PseudoLab IDE',
    desc: 'Browser-based IDE for Cambridge IGCSE pseudocode. Real-time execution engine for 400+ students preparing for A-Level exams.',
    tags: ['Next.js', 'TypeScript', 'Open Source'],
    metric: 'Exam-spec compliant',
    href: '#',
    gradient: 'linear-gradient(160deg, #061e22 0%, #0d3840 60%, #041215 100%)',
  },
]

export const designItems: DesignItem[] = [
  {
    type: 'Analytics UI',
    name: 'EduFeedbackPro',
    gradient: 'linear-gradient(160deg, #08081a 0%, #1a0d40 50%, #0d0820 100%)',
    accentColor: '#d4ff47',
    label: 'EFP',
    sublabel: 'ANALYTICS PLATFORM',
  },
  {
    type: 'SaaS Platform',
    name: "Ms. Maryam's Maths",
    gradient: 'linear-gradient(160deg, #060e20 0%, #0a1e44 50%, #060e28 100%)',
    accentColor: '#47a8ff',
    label: '∫',
    sublabel: 'TUTORING PLATFORM',
    extras: 'buttons',
  },
  {
    type: 'Brand Identity',
    name: 'True Founders',
    gradient: 'linear-gradient(160deg, #100e00 0%, #2a2200 50%, #181400 100%)',
    accentColor: '#ffd147',
    label: 'TF',
    sublabel: 'COACHING BRAND',
    extras: 'logo-circle',
  },
  {
    type: 'Developer Tool',
    name: 'PseudoLab IDE',
    gradient: 'linear-gradient(160deg, #040e0e 0%, #0a2424 50%, #041414 100%)',
    accentColor: '#44ffcc',
    label: 'PSEUDOLAB',
    sublabel: '',
    extras: 'code',
  },
  {
    type: 'AI Product UI',
    name: 'Numerix AI',
    gradient: 'linear-gradient(160deg, #180010 0%, #320020 50%, #200018 100%)',
    accentColor: '#ff4777',
    label: 'Nx',
    sublabel: 'AI PLATFORM',
    extras: 'dots',
  },
  {
    type: 'Profile UI',
    name: 'Github Finder',
    gradient: 'linear-gradient(160deg, #080818 0%, #120e30 50%, #0a0820 100%)',
    accentColor: '#a78bfa',
    label: 'Gh',
    sublabel: 'GITHUB FINDER',
    extras: 'search',
  },
]

export const experienceItems: ExperienceItem[] = [
  {
    initial: 'S',
    company: 'The School of Research Science',
    role: 'Design Engineer · Next.js, TypeScript, TensorFlow.js',
    desc: 'Built and shipped EdTech products used by 400+ students, including a browser-based Cambridge Pseudocode IDE, a KNN image classifier, and a real-time assessment dashboard — all tested to 95%+ coverage with zero critical regressions over 12 months.',
    tags: ['Next.js', 'TypeScript', 'TensorFlow.js', 'Docker', 'Redis'],
    dates: '2023 — 2026',
  },
  {
    initial: 'F',
    company: 'Freelance Consultant',
    role: 'Design Engineer · React, Node.js, AWS',
    desc: 'Designed and built production-grade products for clients, including a 30+ component design system across 8 storefronts, a microservices e-commerce platform with 99.9% uptime, and a video pipeline that cut media costs by 40%.',
    tags: ['React', 'Node.js', 'AWS S3', 'Stripe', 'Figma'],
    dates: '2020 — 2023',
  },
  {
    initial: 'A',
    company: 'Adaptive Financial Consulting',
    role: 'Software Engineer Intern · React, TypeScript',
    desc: 'Built project timeline visualisations for senior management across 3 product teams. Collaborated with data analysts and the UX team on internal dashboards for financial workflows.',
    tags: ['React', 'TypeScript', 'Data Viz'],
    dates: '2019',
  },
]

export const skillGroups = [
  {
    label: 'Frontend',
    skills: ['TypeScript / JavaScript', 'React and Next.js', 'Tailwind CSS', 'React Query', 'TensorFlow.js'],
  },
  {
    label: 'Backend',
    skills: ['Node.js and Express', 'PostgreSQL / MongoDB', 'RESTful APIs', 'BigQuery', 'Python'],
  },
  {
    label: 'Infrastructure',
    skills: ['Docker and Nginx', 'GitHub Actions CI/CD', 'AWS S3 and EC2', 'DigitalOcean', 'Sentry'],
  },
  {
    label: 'Design',
    skills: ['Figma (Advanced)', 'Design Systems', 'Prototyping', 'WCAG Accessibility', 'Motion Design'],
  },
]
