import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { LINKS } from "@/data/projects";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Valentin Wannesian is a software engineer in Sweden. These are his side projects and other fun little ideas: browser games built with TypeScript, Phaser and Three.js, all playable without installing anything.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kvackie.github.io/portfolio"),
  title: LINKS.headline,
  description: DESCRIPTION,
  authors: [{ name: LINKS.name }],
  creator: LINKS.name,
  keywords: [
    "Valentin Wannesian",
    "software engineer",
    "game developer",
    "TypeScript",
    "Phaser",
    "Three.js",
    "browser games",
    "portfolio",
    "Sweden",
  ],
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: LINKS.headline,
    description: DESCRIPTION,
    siteName: LINKS.name,
  },
  twitter: {
    card: "summary_large_image",
    title: LINKS.headline,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}