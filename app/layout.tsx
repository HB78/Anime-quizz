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
  title: {
    default: "AnimeQuiz - Blind Test Anime, Films & Séries",
    template: "%s | AnimeQuiz",
  },
  description:
    "Teste tes connaissances sur les openings, endings et soundtracks d'anime, films et séries. Trois modes de jeu : Quiz, Chill et Training.",
  keywords: [
    "anime quiz",
    "blind test",
    "openings",
    "endings",
    "soundtracks",
    "anime",
    "films",
    "séries",
    "musique anime",
    "quiz musical",
    "blindtest anime",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://animequizz.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://animequizz.vercel.app",
    title: "AnimeQuiz - Blind Test Anime, Films & Séries",
    description:
      "Teste tes connaissances sur les openings, endings et soundtracks d'anime, films et séries.",
    siteName: "AnimeQuiz",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "AnimeQuiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeQuiz - Blind Test Anime, Films & Séries",
    description:
      "Teste tes connaissances sur les openings, endings et soundtracks d'anime, films et séries.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
