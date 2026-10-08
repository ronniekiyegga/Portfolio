import Link from "next/link";

import { SocialLinks } from "@/shared/components/portfolio/SocialLinks";

import { SplashCursorToggle } from "./SplashCursorToggle";

export function Statusbar() {
  return (
    <div className="statusBar">
      <p className="contextLine">
        <SocialLinks />
      </p>
      <div className="statusMeta">
        <Link className="contextLine" href="mailto:kiyeggaronnie@gmail.com">
          <span aria-hidden className="pulseDot ping">
            ●
          </span>{" "}
          Open to opportunities
        </Link>
        <SplashCursorToggle />
      </div>
    </div>
  );
}
