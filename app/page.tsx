import FaceScanIllustration from "@/app/components/illustrations/face-scan";
import IntroductionText from "@/app/components/IntroductionText";
import ContactInfo from "@/app/components/patterns/ContactInfo";
import ProjectSection from "./components/ProjectSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans dark:bg-black">
      <main className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-6xl flex-col items-center justify-center px-8 py-32 md:px-16">
          <FaceScanIllustration />
          <IntroductionText />
          <ContactInfo />
        </div>
        <ProjectSection />
      </main>
    </div>
  );
}
