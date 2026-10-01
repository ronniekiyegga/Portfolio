import Link from "next/link";
import { Fragment } from "react";
import { MobilePortfolioNavigation } from "./MobilePortfolioNavigation";
import { PortfolioMain } from "./PortfolioMain";
import { PortfolioNavigation } from "./PortfolioNavigation";

const footerLinks = [
  {
    label: "kiyeggaronnie@gmail.com",
    href: "mailto:kiyeggaronnie@gmail.com",
    mobileHidden: true,
  },
  {
    label: "Github",
    href: "https://github.com/ronniekiyegga",
    mobileHidden: false,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ronniekiyegga",
    mobileHidden: false,
  },
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
            {footerLinks.map(({ label, href, mobileHidden }, index) => (
              <Fragment key={label}>
                {index > 0 ? (
                  <span
                    className={`footerSep${index === 1 ? " footerEmailSep" : ""}`}
                    aria-hidden="true"
                  >
                    /
                  </span>
                ) : null}
                <Link
                  className={mobileHidden ? "footerEmail" : "footerSocial"}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
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
