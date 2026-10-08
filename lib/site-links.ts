const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ronniekiyegga";

export const socialLinks = [
  { label: "GitHub", href: githubUrl },
  { label: "LinkedIn", href: "https://linkedin.com/in/ronniekiyegga" },
] as const;
