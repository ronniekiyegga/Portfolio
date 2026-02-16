import FaceScanIllustration from "@/components/illustrations/face-scan";
import IntroductionText from "@/components/IntroductionText";

export default function Home() {
  return (
    <div className="flex min-h-screen max-w-6xl mx-auto items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* <h1 className="text-center block w-full">Portfolio - Coming Soon.</h1> */}
        {/* <FingerprintIllustration /> */}
        <FaceScanIllustration />
        <IntroductionText />
      </main>
    </div>
  );
}
