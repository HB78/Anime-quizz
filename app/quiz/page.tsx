"use client";

import Link from "next/link";
import { useState } from "react";

type QuizMode = "opening" | "ending";

const modes: {
  key: QuizMode;
  label: string;
  emoji: string;
  description: string;
  gradient: string;
  shadow: string;
}[] = [
  {
    key: "opening",
    label: "Openings",
    emoji: "🎬",
    description: "Les génériques de début",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/50",
  },
  {
    key: "ending",
    label: "Endings",
    emoji: "🎭",
    description: "Les génériques de fin",
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/50",
  },
];

export default function QuizSelectionPage() {
  const [mode, setMode] = useState<QuizMode>("opening");

  const selected = modes.find((m) => m.key === mode)!;

  return (
    <main className="min-h-screen bg-black px-6 py-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-6xl font-bold text-white">
            Blindtest Animé
          </h1>
          <p className="text-xl text-zinc-400">
            Teste tes connaissances sur les openings et endings
          </p>
        </div>

        {/* Sélection du mode */}
        <div className="mb-8 rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Choisis ton mode
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {modes.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`group rounded-2xl p-6 transition-all ${
                  mode === m.key
                    ? `bg-gradient-to-br ${m.gradient} shadow-2xl ${m.shadow} scale-105`
                    : "bg-white/10 hover:bg-white/20 hover:scale-105"
                }`}
              >
                <div className="mb-3 text-5xl">{m.emoji}</div>
                <div className="mb-1 text-xl font-bold text-white">
                  {m.label}
                </div>
                <div className="text-sm text-zinc-300">{m.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Bouton lancer */}
        <Link
          href={`/quiz/play?type=${mode}`}
          className={`block w-full rounded-2xl bg-gradient-to-r ${selected.gradient} ${selected.shadow} px-8 py-6 text-center text-2xl font-bold text-white shadow-2xl transition-all hover:scale-105`}
        >
          🎮 Lancer le Quiz
        </Link>

        {/* Info */}
        <div className="mt-8 rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Comment ça marche ?
          </h3>
          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="text-pink-400">✓</span>
              <span>15 questions aléatoires</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400">✓</span>
              <span>10 secondes pour tester ton oreille</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400">✓</span>
              <span>La réponse apparaît après chaque question</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
