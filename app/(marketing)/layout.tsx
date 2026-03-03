import type { Metadata } from "next";
import HeaderWithFloatingControls from "@/app/components/HeaderWithFloatingControls";
import FooterSection from "@/app/components/footer";
import LoadingScreenGate from "@/app/components/LoadingScreenGate";
import ScrollTriggerReset from "@/app/components/ScrollTriggerReset";

export const metadata: Metadata = {
  title: "Ronnie Kiyegga — Blog",
  description: "Thoughts on design engineering, TypeScript, and shipping products.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollTriggerReset />
      <HeaderWithFloatingControls />
      <main
        role="main"
        data-theme="dark"
        className="bg-background"
        style={{
          backgroundImage: `url(/BG_2.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </main>
      <FooterSection />
      <LoadingScreenGate />
    </>
  );
}
