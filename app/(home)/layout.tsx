import { PortfolioShell } from "@/shared/components/portfolio/PortfolioShell";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortfolioShell>{children}</PortfolioShell>;
}
