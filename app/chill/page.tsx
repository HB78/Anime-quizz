"use client";

import Link from "next/link";
import { useState } from "react";

type ChillMode = "anime" | "tv" | "movie" | "tv-movie" | "all";

const modes: {
  key: ChillMode;
  label: string;
  emoji: string;
  description: string;
  gradient: string;
  shadow: string;
}[] = [
  {
    key: "all",
    label: "Tout",
    emoji: "🎲",
    description: "Anime, films et séries mélangés",
    gradient: "from-green-500 to-emerald-500",
    shadow: "shadow-green-500/50",
  },
  {
    key: "anime",
    label: "Anime",
    emoji: "🎌",
    description: "Openings et soundtracks d'anime",
    gradient: "from-pink-500 to-purple-500",
    shadow: "shadow-pink-500/50",
  },
  {
    key: "tv-movie",
    label: "Films & Séries",
    emoji: "🎬",
    description: "Soundtracks de films et séries TV",
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/50",
  },
  {
    key: "movie",
    label: "Films",
    emoji: "🎥",
    description: "Soundtracks de films uniquement",
    gradient: "from-red-500 to-rose-500",
    shadow: "shadow-red-500/50",
  },
  {
    key: "tv",
    label: "Séries",
    emoji: "📺",
    description: "Soundtracks de séries TV uniquement",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/50",
  },
];

export default function ChillPage() {
  const [mode, setMode] = useState<ChillMode>("anime");

  const selected = modes.find((m) => m.key === mode)!;

  return (
    <main className="min-h-screen bg-black px-6 py-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-6xl font-bold text-white">Chill Zone</h1>
          <p className="text-xl text-zinc-400">
            Devine les soundtracks de tes animes, films et séries préférés
          </p>
        </div>

        {/* Sélection du mode */}
        <div className="mb-8 rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Choisis ta catégorie
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {modes.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`group rounded-2xl p-6 transition-all ${
                  mode === m.key
                    ? `bg-gradient-to-br ${m.gradient} shadow-2xl ${m.shadow} scale-105`
                    : "bg-white/10 hover:bg-white/20 hover:scale-105"
                } ${m.key === "all" ? "sm:col-span-2" : ""}`}
              >
                <div
                  className={`mb-3 ${m.key === "all" ? "text-4xl" : "text-5xl"}`}
                >
                  {m.emoji}
                </div>
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
          href={`/chill/play?type=${mode}`}
          className={`block w-full rounded-2xl bg-gradient-to-r ${selected.gradient} ${selected.shadow} px-8 py-6 text-center text-2xl font-bold text-white shadow-2xl transition-all hover:scale-105`}
        >
          🎧 Lancer le Quiz
        </Link>

        {/* Info */}
        <div className="mt-8 rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Comment ça marche ?
          </h3>
          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="text-pink-400">✓</span>
              <span>12 soundtracks aléatoires</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400">✓</span>
              <span>20 secondes pour deviner chaque titre</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400">✓</span>
              <span>La réponse s&apos;affiche après chaque extrait</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
