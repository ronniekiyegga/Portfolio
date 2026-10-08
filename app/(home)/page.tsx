import { AboutSection } from "./_features/about/AboutSection";
import { EducationSection } from "./_features/education/EducationSection";
import { ExperienceSection } from "./_features/experience/ExperienceSection";
import { FeaturedThoughtsSection } from "./_features/featured-thoughts/FeaturedThoughtsSection";
import { IdentitySection } from "./_features/identity/IdentitySection";
import { InterfacesSection } from "./_features/interfaces/InterfacesSection";
import { SelectedWorkSection } from "./_features/selected-design/SelectedWork";
import { ToolsSection } from "./_features/tools/ToolsSection";

export const revalidate = 60;

export default function Home() {
  return (
    <div className="page home">
      <div className="homeIntro">
        <IdentitySection />
        <FeaturedThoughtsSection />
      </div>
      <AboutSection />
      <ToolsSection />
      <ExperienceSection />
      <SelectedWorkSection />
      <EducationSection />
      <InterfacesSection />
    </div>
  );
}
