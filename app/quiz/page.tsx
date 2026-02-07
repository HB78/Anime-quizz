"use client";

import { ChevronRight, Sparkles, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type QuizMode = "opening" | "ending";

const modes: {
  key: QuizMode;
  label: string;
  subLabel: string;
  emoji: string;
  description: string;
  gradient: string;
  shadow: string;
  glowColor: string;
  accentColor: string;
}[] = [
  {
    key: "opening",
    label: "Openings",
    subLabel: "OP Theme",
    emoji: "🎬",
    description:
      "Les génériques de début qui te donnent des frissons. Sauras-tu les reconnaître ?",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/50",
    glowColor: "rgba(59,130,246,0.08)",
    accentColor: "text-blue-400",
  },
  {
    key: "ending",
    label: "Endings",
    subLabel: "ED Theme",
    emoji: "🎭",
    description:
      "Les génériques de fin souvent sous-estimés. Montre que tu es un vrai connaisseur.",
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/50",
    glowColor: "rgba(168,85,247,0.08)",
    accentColor: "text-purple-400",
  },
];

const rules = [
  {
    icon: "🎵",
    text: "15 questions aléatoires tirées de la base de données",
  },
  {
    icon: "⏱️",
    text: "10 secondes pour tester ton oreille et reconnaître le thème",
  },
  {
    icon: "✅",
    text: "La réponse apparaît après chaque question pour apprendre",
  },
];

export default function QuizSelectionPage() {
  const [mode, setMode] = useState<QuizMode>("opening");
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const selected = modes.find((m) => m.key === mode)!;

  return (
    <main className="relative min-h-screen bg-black">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full space-y-12">
          {/* Header */}
          <header className="space-y-4 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Le défi ultime pour Otaku
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl pt-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Blindtest
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Animé
              </span>
            </h1>
            <p className="mx-auto max-w-lg text-lg leading-relaxed text-zinc-400">
              Plonge dans l&apos;univers musical de tes animés préférées.
              <br />
              C&apos;est un mode hardcore réservé aux fanatiques des animés.
            </p>
          </header>

          {/* Mode Selection */}
          <div className="grid gap-6 md:grid-cols-2">
            {modes.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                onMouseEnter={() => setIsHovering(m.key)}
                onMouseLeave={() => setIsHovering(null)}
                className={`group relative overflow-hidden rounded-[2rem] p-8 text-left transition-all duration-500 ${
                  mode === m.key
                    ? "scale-[1.02]"
                    : "opacity-70 hover:scale-[1.01] hover:opacity-100"
                }`}
              >
                {/* Background glow */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    mode === m.key ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-20`}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      boxShadow: `inset 0 0 100px ${m.glowColor}`,
                    }}
                  />
                </div>

                <div
                  className={`absolute inset-0 rounded-[2rem] border bg-zinc-900/60 backdrop-blur-sm transition-all duration-500 ${
                    mode === m.key
                      ? "border-white/20"
                      : "border-zinc-800 group-hover:border-zinc-700"
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-5xl transition-transform duration-500 ${
                        isHovering === m.key ? "rotate-12 scale-110" : ""
                      }`}
                    >
                      {m.emoji}
                    </div>
                    <div
                      className={`text-xs font-mono font-bold uppercase tracking-widest opacity-40 ${m.accentColor}`}
                    >
                      {m.subLabel}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-1 text-3xl font-bold text-white">
                      {m.label}
                    </h3>
                    <p className="pr-8 text-sm leading-relaxed text-zinc-400">
                      {m.description}
                    </p>
                  </div>

                  {/* Selected indicator bar */}
                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r transition-all duration-500 ${m.gradient} ${
                      mode === m.key ? "w-24 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Launch + Info */}
          <div className="space-y-6">
            {/* Launch Button */}
            <Link
              href={`/quiz/play?type=${mode}`}
              className={`group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r ${selected.gradient} ${selected.shadow} p-6 shadow-2xl transition-all duration-300 active:scale-95`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2 text-2xl font-black tracking-tight text-white">
                <Zap className="h-6 w-6 fill-white" />
                LANCER LE QUIZ
              </span>
              <ChevronRight className="relative z-10 h-6 w-6 text-white transition-transform group-hover:translate-x-2" />
            </Link>

            {/* Info Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-sm md:p-10">
              {/* Decorative icon */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-5">
                <Trophy className="h-64 w-64" />
              </div>

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-xl font-bold text-white">
                  <span
                    className={`h-8 w-2 rounded-full bg-gradient-to-b ${selected.gradient}`}
                  />
                  Règles du Jeu
                </h4>
                <div className="space-y-4">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="group flex items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-sm transition-colors group-hover:border-zinc-600">
                        {rule.icon}
                      </div>
                      <p className="py-1 text-sm leading-relaxed text-zinc-400">
                        {rule.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="pb-8 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-600">
              Fait avec passion par &amp; pour les fans d&apos;anime • 2026
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
