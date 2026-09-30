import Image from "next/image";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

import { SpecularPill } from "@/app/components/SpecularButton";
import { sectionLinks } from "@/lib/constants";
import { getVisitorCount } from "@/lib/visitors/visitor-store";

import {
  AnalyticsMark,
  BookOpenMark,
  GraduateMark,
  UseCasesMark,
} from "./ProfileNavIcons";
import { IdentityShader } from "./IdentityShader";
import { Statusbar } from "./Statusbar";

const profileNavMarks = {
  book: BookOpenMark,
  analytics: AnalyticsMark,
  graduate: GraduateMark,
  usecases: UseCasesMark,
} as const;

export async function IdentitySection() {
  const visitorCount = await getVisitorCount();

  return (
    <header className="identity reveal">
      <IdentityShader />
      <Statusbar visitorCount={visitorCount} />
      <div className="identityRow">
        <Image
          src="/images/profile/Ronnie-suit.jpg"
          alt="Ronnie Kiyegga"
          width={112}
          height={112}
          priority
          sizes="112px"
          quality={75}
          className="portrait"
        />
        <div>
          <h1>Ronnie Kiyegga</h1>
          <p>
            <em>Software Engineer</em> <span aria-hidden>●</span>{" "}
            <span className="identityFocus">Product & Design</span>
          </p>
        </div>
      </div>
      <div className="identityActions">
        <nav className="profileNav" aria-label="Page sections">
          {sectionLinks.map((item) => {
            const Mark = profileNavMarks[item.figure];
            return (
              <Link
                className={item.hideOnMobile ? "mobileHidden" : undefined}
                href={item.href}
                key={item.label}
              >
                <Mark />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <SpecularPill
          className="cvLink"
          href="/Ronnie-Kiyegga-CV.pdf"
          download
        >
          <UserRoundPlus aria-hidden size={13} strokeWidth={1.7} />
          Download CV
        </SpecularPill>
      </div>
    </header>
  );
}
