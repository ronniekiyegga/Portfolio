export const figmaFileUrl =
  "https://www.figma.com/design/0wURLIqsRo6YCvukM6o8t1/Design-Work?node-id=0-1";

export type StudyEmphasis = "side" | "center";

export type InterfaceStudy = {
  id: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  objectPosition?: string;
};

export const interfaceRows: (InterfaceStudy & { emphasis: StudyEmphasis })[][] = [
  [
    {
      id: "truefounders",
      title: "TrueFounders",
      description: "Natural, focused interactions",
      src: "/images/design/professional-support.webp",
      alt: "Video support interface with live translation controls",
      emphasis: "side",
    },
    {
      id: "design-collection",
      title: "Student workspace",
      description: "A connected learning workspace",
      src: "/images/design/design-collection.webp",
      alt: "Student portfolio, AI assistant and file upload interfaces",
      emphasis: "center",
    },
    {
      id: "curriculum-folders",
      title: "Curriculum folders",
      description: "Clear content organisation",
      src: "/images/design/folder-curriculum.webp",
      alt: "Layered curriculum folders for IB, A levels and GCSE",
      emphasis: "side",
    },
  ],
  [
    {
      id: "command-student-bio",
      title: "Command & profile",
      description: "Fast access to key actions",
      src: "/images/design/command-home.webp",
      alt: "Light and dark command search interfaces",
      emphasis: "side",
    },
    {
      id: "student-journeys",
      title: "Student journeys",
      description: "Stories that build trust",
      src: "/images/design/testimonials.webp",
      alt: "Student success stories and testimonial cards",
      emphasis: "center",
    },
    {
      id: "learning-navigation",
      title: "Learning navigation",
      description: "Scalable product navigation",
      src: "/images/design/navigation.webp",
      alt: "Responsive navigation concepts for a learning dashboard",
      emphasis: "side",
    },
  ],
];
