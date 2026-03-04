import type { Metadata } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  Dancing_Script,
  Source_Serif_4,
  Style_Script,
  Bodoni_Moda,
  Cormorant_Garamond,
  JetBrains_Mono,
  Outfit,
} from "next/font/google";
import "./globals.css";
import { SplashProvider } from "./contexts/SplashContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ThemeProvider } from "next-themes";

/* ── V1 fonts ─────────────────────────────────────────────── */
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

/* ── V2 fonts ─────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Ronnie Kiyegga — Design Engineer",
  description:
    "Design Engineer based in London. I design in Figma and build in TypeScript.",
  openGraph: {
    title: "Ronnie Kiyegga — Design Engineer",
    description: "Design Engineer based in London.",
    url: "https://ronniekiyegga.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${sourceSerif.variable} ${styleScript.variable} ${bodoniModa.variable} ${cormorant.variable} ${jetbrains.variable} ${outfit.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') document.documentElement.classList.remove('dark');
                else document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
        <Script
          id="scroll-reset"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
                window.scrollTo(0, 0);
              })();
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LoadingProvider>
            <SplashProvider>
              {children}
            </SplashProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
