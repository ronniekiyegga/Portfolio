import type { Metadata } from "next";
import HeaderWithFloatingControls from "@/shared/components/navigation/HeaderWithFloatingControls";
import FooterSection from "@/shared/components/navigation/footer";
import ScrollTriggerReset from "@/shared/components/effects/ScrollTriggerReset";

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
          backgroundImage: `url(/images/backgrounds/BG_1.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </main>
      <FooterSection />
    </>
  );
}
