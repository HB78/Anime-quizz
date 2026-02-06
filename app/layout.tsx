import NavigationWrapper from "@/components/NavigationWrapper";
import Providers from "@/provider/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnimeQuiz - Blind Test Anime, Films & Séries",
  description:
    "Teste tes connaissances sur les openings, endings et soundtracks d'anime, films et séries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NavigationWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
