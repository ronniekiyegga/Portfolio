import type { Metadata } from "next";
import NavV1Wrapper from "@/shared/components/navigation/NavV1Wrapper";
import FooterSection from "@/shared/components/navigation/footer";
import ScrollTriggerReset from "@/shared/components/effects/ScrollTriggerReset";

export const metadata: Metadata = {
  title: "Ronnie Kiyegga — Blog",
  description: "Thoughts on full-stack engineering, TypeScript, and shipping products.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollTriggerReset />
      <NavV1Wrapper />
      <main
        role="main"
        className="bg-background dark:[background-image:url(/images/backgrounds/BG_1.svg)] dark:[background-size:cover] dark:[background-position:center] dark:[background-repeat:no-repeat]"
      >
        {children}
      </main>
      <FooterSection />
    </>
  );
}
