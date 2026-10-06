import Link from "next/link";
import { Fragment } from "react";

import { LiveVisitorCount } from "@/app/(home)/_features/visitor-count/LiveVisitorCount";

import { MobilePortfolioNavigation } from "./MobilePortfolioNavigation";
import { PortfolioMain } from "./PortfolioMain";
import { PortfolioNavigation } from "./PortfolioNavigation";

const footerLinks = [
  { label: "Github", href: "https://github.com/ronniekiyegga" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ronniekiyegga" },
] as const;

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
          <div className="footerLinks">
            <span className="footerVisitors">
              <LiveVisitorCount initialCount={null} />
            </span>
            {footerLinks.map(({ label, href }, index) => (
              <Fragment key={label}>
                <span
                  className={`footerSep${index === 0 ? " footerVisitorsSep" : ""}`}
                  aria-hidden="true"
                >
                  /
                </span>
                <Link
                  className="footerSocial"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </Link>
              </Fragment>
            ))}
          </div>
        </footer>
      </PortfolioMain>
    </div>
  );
}
