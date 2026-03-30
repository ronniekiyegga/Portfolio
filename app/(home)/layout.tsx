import NavV1Wrapper from "@/shared/components/navigation/NavV1Wrapper";
import V1Cursors from "@/shared/components/effects/V1Cursors";
import FooterSection from "@/shared/components/navigation/footer";
import ScrollTriggerReset from "@/shared/components/effects/ScrollTriggerReset";
import { ScrollReveal } from "@/shared/components/effects/ScrollReveal";

export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollTriggerReset />
      <ScrollReveal />
      <NavV1Wrapper />
      <V1Cursors />
      {children}
      <FooterSection />
    </>
  );
}
