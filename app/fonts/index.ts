import localFont from "next/font/local";

export const geistSans = localFont({
  src: "./geist/geist-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-sans",
});

export const geistMono = localFont({
  src: "./geist-mono/geist-mono-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
});

export const sourceSerif = localFont({
  src: "./source-serif-4/source-serif-4-latin.woff2",
  weight: "400 700",
  variable: "--font-source-serif",
});

export const playfairDisplay = localFont({
  src: [
    {
      path: "./playfair-display/playfair-display-latin.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "./playfair-display/playfair-display-latin-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-playfair-display",
});

export const bodoniModa = localFont({
  src: "./bodoni-moda/bodoni-moda-latin.woff2",
  weight: "400 700",
  variable: "--font-bodoni-moda",
});

export const cormorant = localFont({
  src: [
    {
      path: "./cormorant-garamond/cormorant-garamond-latin.woff2",
      weight: "300 600",
      style: "normal",
    },
    {
      path: "./cormorant-garamond/cormorant-garamond-latin-italic.woff2",
      weight: "300 600",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
});

export const jetbrains = localFont({
  src: "./jetbrains-mono/jetbrains-mono-latin.woff2",
  weight: "300 500",
  variable: "--font-jetbrains",
});

export const outfit = localFont({
  src: "./outfit/outfit-latin.woff2",
  weight: "300 600",
  variable: "--font-outfit",
});

export const italianno = localFont({
  src: "./italianno/italianno-latin.woff2",
  weight: "400",
  variable: "--font-italianno",
});

export const inter = localFont({
  src: "./inter/inter-latin.woff2",
  weight: "400 500",
});

export const styleScript = localFont({
  src: "./style-script/style-script-latin.woff2",
  weight: "400",
});
