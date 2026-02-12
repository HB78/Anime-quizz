"use client";

import LandingNav from "@/components/LandingNav";
import {
  FloatingKanji,
  VhsOverlay,
  VhsBadges,
  HeroSection,
  Marquee,
  UniversesSection,
  ModesSection,
  StatsSection,
  HowItWorksSection,
  FeaturesSection,
  SpotlightSection,
  FooterSection,
} from "@/components/landing";

/* Page d'accueil — orchestre les overlays, la navigation et toutes les sections
   de la landing page. Le fond est #07060b avec une police Noto Sans JP. */

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#07060b] font-body text-zinc-100">
      {/* Skip to content — accessibilité clavier */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:rounded focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#07060b]"
      >
        Aller au contenu principal
      </a>

      {/* Overlays décoratifs (cachés des lecteurs d'écran) */}
      <VhsOverlay />
      <FloatingKanji />
      <VhsBadges />

      {/* Navigation */}
      <LandingNav />

      {/* Contenu principal */}
      <div id="main-content">
        <HeroSection />
        <Marquee />
        <UniversesSection />
        <ModesSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SpotlightSection />
        <FooterSection />
      </div>
    </main>
  );
}
