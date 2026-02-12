"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import GlitchText from "./GlitchText";

/* Section héro — plein écran, première chose que voit l'utilisateur.
   - Grille cyberpunk en fond (lignes cyan à 3% d'opacité)
   - Gradient radial qui suit la position de la souris
   - Titre "AnimeQuiz" avec effet glitch
   - Sous-titre japonais + texte descriptif
   - Deux boutons CTA ("Commencer" vers /quiz, "Découvrir" vers #univers)
   - Indicateur de scroll animé en bas */

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      aria-label="Accueil AnimeQuiz"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Fond décoratif — grille cyberpunk + gradient souris */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%] w-[120%] h-[120%] transition-[background] duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,240,255,0.08) 0%, rgba(255,0,170,0.04) 30%, transparent 60%)`,
        }}
      />

      {/* Contenu central */}
      <div className="relative z-10 px-6 text-center">
        <p
          className="animate-fade-up mb-5 font-body text-sm tracking-[0.5em] text-cyan-400/70"
          style={{ animationDelay: "0.2s" }}
          lang="ja"
        >
          アニメクイズ — 音楽の試練
        </p>

        <h1
          className="animate-fade-up mb-6 font-display leading-[0.95]"
          style={{
            animationDelay: "0.4s",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
          }}
        >
          <GlitchText className="bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,240,255,0.2)]">
            AnimeQuiz
          </GlitchText>
        </h1>

        <p
          className="animate-fade-up mx-auto mb-10 max-w-lg font-mono text-sm leading-loose text-zinc-400"
          style={{ animationDelay: "0.6s" }}
        >
          Teste tes connaissances sur les{" "}
          <strong className="text-yellow-300 font-normal">openings</strong>,{" "}
          <strong className="text-yellow-300 font-normal">endings</strong> et{" "}
          <strong className="text-yellow-300 font-normal">soundtracks</strong>{" "}
          de tes animes, films et séries préférés.
        </p>

        <div
          className="animate-fade-up flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "0.8s" }}
        >
          <Link
            href="/quiz"
            className="clip-cyber bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#07060b] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            Commencer
          </Link>
          <a
            href="#univers"
            className="clip-cyber border border-white/10 bg-transparent px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-zinc-400 transition-all duration-400 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-400 hover:shadow-[0_10px_40px_rgba(255,0,170,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
          >
            Découvrir
          </a>
        </div>
      </div>

      {/* Indicateur de scroll — décoratif */}
      <div
        aria-hidden="true"
        className="animate-fade-up absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-zinc-600">
          Scroll
        </span>
        <div className="animate-scroll-pulse h-10 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
      </div>
    </section>
  );
}
