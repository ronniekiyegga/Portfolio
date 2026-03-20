import NavV1Wrapper from "@/app/components/NavV1Wrapper";
import V1Cursors from "@/app/components/V1Cursors";
import FooterSection from "@/app/components/footer";
import ScrollTriggerReset from "@/app/components/ScrollTriggerReset";
import { ScrollReveal } from "@/app/components/ScrollReveal";

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
