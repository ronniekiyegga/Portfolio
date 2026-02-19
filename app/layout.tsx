import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Dancing_Script, Source_Serif_4, Style_Script, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import HeaderWithFloatingControls from "./components/HeaderWithFloatingControls";
import FooterSection from "./components/footer";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600", "700"],
});

const styleScript = Style_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-style-script",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ronnie Kiyegga",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${sourceSerif.variable} ${styleScript.variable} ${bodoniModa.variable} antialiased overflow-x-hidden bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') document.documentElement.classList.add('dark');
                else if (theme === 'light') document.documentElement.classList.remove('dark');
              })();
            `,
          }}
        />
        <HeaderWithFloatingControls />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
