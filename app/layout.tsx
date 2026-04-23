import type { Metadata } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  Source_Serif_4,
  Style_Script,
  Bodoni_Moda,
  Cormorant_Garamond,
  JetBrains_Mono,
  Outfit,
  David_Libre,
} from "next/font/google";
import "./globals.css";
import { SplashProvider } from "@/shared/contexts/SplashContext";
import { ThemeProvider } from "next-themes";

/* ── V1 fonts ─────────────────────────────────────────────── */
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
const davidLibre = David_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-david-libre",
});

export const metadata: Metadata = {
  title: "Ronnie Kiyegga — Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer based in London. I design in Figma and build in TypeScript.",
  openGraph: {
    title: "Ronnie Kiyegga — Full Stack Software Engineer",
    description: "Full Stack Software Engineer based in London.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${styleScript.variable} ${bodoniModa.variable} ${cormorant.variable} ${jetbrains.variable} ${outfit.variable} ${davidLibre.variable} antialiased overflow-x-hidden min-h-screen bg-white`}
        suppressHydrationWarning
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                var root = document.documentElement;
                if (theme === 'light') {
                  root.classList.remove('dark');
                  root.classList.add('light');
                } else {
                  root.classList.add('dark');
                  root.classList.remove('light');
                }
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

        {/* SVG gradient for pill icons (light mode) */}
        <svg width="0" height="0" aria-hidden>
          <defs>
            <linearGradient
              id="pillIconGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="10.26%" stopColor="#3A07F2" />
              <stop offset="98.05%" stopColor="#0CD1CF" />
            </linearGradient>
          </defs>
        </svg>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/*
           * Dark mode global background — fixed so it covers every section
           * as the user scrolls. hidden in light mode, always behind content.
           * radial-gradient: black core at top-centre → purple at edges/bottom
           */}
          <div
            aria-hidden
            className="fixed inset-0 -z-10 hidden dark:block"
            style={{
              background:
                "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
            }}
          />

          <SplashProvider>{children}</SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
