import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import {
  bodoniModa,
  cormorant,
  geistMono,
  geistSans,
  italianno,
  jetbrains,
  outfit,
  playfairDisplay,
  sourceSerif,
} from "./fonts";

export const metadata: Metadata = {
  title: "Ronnie Kiyegga | Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer based in London. I design in Figma and build in TypeScript.",
  openGraph: {
    title: "Ronnie Kiyegga | Full Stack Software Engineer",
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
    <html
      lang="en"
      className="overflow-x-hidden dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${playfairDisplay.variable} ${bodoniModa.variable} ${cormorant.variable} ${jetbrains.variable} ${outfit.variable} ${italianno.variable} antialiased overflow-x-hidden min-h-screen bg-[#FAFAFA]`}
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
          <div
            aria-hidden
            className="fixed inset-0 -z-10 hidden dark:block"
            style={{
              background:
                "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
            }}
          />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
