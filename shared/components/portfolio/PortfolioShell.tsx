import { LiveVisitorCount } from "@/app/(home)/_features/visitor-count/LiveVisitorCount";

import { MobilePortfolioNavigation } from "./MobilePortfolioNavigation";
import { PortfolioMain } from "./PortfolioMain";
import { PortfolioNavigation } from "./PortfolioNavigation";
import { SocialLinks } from "./SocialLinks";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <PortfolioNavigation />
      <MobilePortfolioNavigation />
      <PortfolioMain>
        {children}
        <footer className="footer" id="contact">
          <div className="footerCredit">
            <span className="footerName">Ronnie Kiyegga</span>
            <span className="footerYear">2026</span>
          </div>
          <p className="contextLine footerLinks">
            <SocialLinks lead={<LiveVisitorCount initialCount={null} />} />
          </p>
        </footer>
      </PortfolioMain>
    </div>
  );
}
