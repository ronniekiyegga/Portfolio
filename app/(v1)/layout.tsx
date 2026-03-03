import HeaderWithFloatingControls from "@/app/components/HeaderWithFloatingControls";
import FooterSection from "@/app/components/footer";
import LoadingScreenGate from "@/app/components/LoadingScreenGate";
import ScrollTriggerReset from "@/app/components/ScrollTriggerReset";

export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollTriggerReset />
      <HeaderWithFloatingControls />
      {children}
      <FooterSection />
      <LoadingScreenGate />
    </>
  );
}
