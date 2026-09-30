import { ProjectContextProvider } from "@/app/contexts/ProjectContext";
import { PortfolioShell } from "@/shared/components/portfolio/PortfolioShell";

export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectContextProvider>
      <PortfolioShell>{children}</PortfolioShell>
    </ProjectContextProvider>
  );
}
