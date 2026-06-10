"use client";

import {
  ArrowRight,
  Clapperboard,
  Dice5,
  Film,
  Headphones,
  Layers,
  Library,
  Music,
  Tv,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ChillMode = "anime" | "tv" | "movie" | "tv-movie" | "all";

interface ModeConfig {
  key: ChillMode;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description: string;
  gradient: string;
  shadowColor: string;
  borderClass: string;
  iconColor: string;
  titleColor: string;
}

const modes: ModeConfig[] = [
  {
    key: "all",
    label: "Tout",
    icon: Dice5,
    description: "Anime, films et séries mélangés",
    gradient: "from-green-500 to-emerald-500",
    shadowColor: "rgba(16,185,129,0.3)",
    borderClass: "border-green-500/25",
    iconColor: "text-green-400",
    titleColor: "text-green-300",
  },
  {
    key: "anime",
    label: "Anime",
    icon: Headphones,
    description: "Openings et soundtracks d'anime",
    gradient: "from-pink-500 to-purple-500",
    shadowColor: "rgba(236,72,153,0.3)",
    borderClass: "border-pink-500/25",
    iconColor: "text-pink-400",
    titleColor: "text-pink-300",
  },
  {
    key: "tv-movie",
    label: "Films & Séries",
    icon: Clapperboard,
    description: "Soundtracks de films et séries TV",
    gradient: "from-amber-500 to-orange-500",
    shadowColor: "rgba(245,158,11,0.3)",
    borderClass: "border-amber-500/25",
    iconColor: "text-amber-400",
    titleColor: "text-amber-300",
  },
  {
    key: "movie",
    label: "Films",
    icon: Film,
    description: "Soundtracks de films uniquement",
    gradient: "from-red-500 to-rose-500",
    shadowColor: "rgba(239,68,68,0.3)",
    borderClass: "border-red-500/25",
    iconColor: "text-red-400",
    titleColor: "text-red-300",
  },
  {
    key: "tv",
    label: "Séries",
    icon: Tv,
    description: "Soundtracks de séries TV uniquement",
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "rgba(59,130,246,0.3)",
    borderClass: "border-blue-500/25",
    iconColor: "text-blue-400",
    titleColor: "text-blue-300",
  },
];

const primaryModes = modes.slice(0, 2);
const secondaryModes = modes.slice(2);

const stats = [
  { icon: "🎵", label: "Bibliothèque", value: "12 Titres Aléatoires" },
  { icon: "⏱️", label: "Chrono", value: "20s par Round" },
  { icon: "🏆", label: "Défi", value: "Reconnaissance" },
];

function ModeCard({
  mode,
  isHovered,
  onHover,
}: {
  mode: ModeConfig;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}) {
  const Icon = mode.icon;

  return (
    <Link
      href={`/chill/play?type=${mode.key}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        boxShadow: isHovered ? `0 25px 60px -12px ${mode.shadowColor}` : "none",
      }}
      className={`group relative flex h-[340px] w-full cursor-pointer flex-col items-start justify-between overflow-hidden rounded-3xl border p-8 text-left transition-all duration-700 md:h-[380px] md:p-10 ${
        isHovered
          ? "z-20 scale-[1.03] border-white/20"
          : `z-10 ${mode.borderClass}`
      }`}
    >
      {/* Dynamic background */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-[0.12]`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />
      </div>

      {/* Glass base */}
      <div
        className={`absolute inset-0 backdrop-blur-sm transition-all duration-700 ${
          isHovered ? "bg-black/20" : "bg-black/60"
        }`}
      />

      {/* Icon + Arrow play */}
      <div className="relative z-10 flex w-full items-start justify-between">
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-700 md:h-20 md:w-20 ${
            isHovered
              ? `bg-gradient-to-br ${mode.gradient} -translate-y-1 scale-110 text-white shadow-[0_0_30px_rgba(255,255,255,0.15)]`
              : `bg-white/5 ${mode.iconColor}`
          }`}
        >
          {isHovered && (
            <div
              className={`absolute inset-0 animate-pulse rounded-full bg-gradient-to-br ${mode.gradient} opacity-40 blur-2xl`}
            />
          )}
          <Icon size={32} className="relative z-10" />
        </div>

        {/* Arrow play qui apparaît au hover */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-all duration-500 ${
            isHovered
              ? "translate-x-0 opacity-100"
              : "translate-x-2 opacity-0"
          }`}
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 w-full space-y-4">
        <div className="space-y-2">
          {/* "Ready" badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 transition-all duration-700 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r ${mode.gradient}`}
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
              Cliquer pour jouer
            </span>
          </div>

          <h3 className="text-3xl font-black leading-none tracking-tighter text-white md:text-4xl">
            {mode.label}
          </h3>
          <p className="text-sm font-medium leading-relaxed text-zinc-300">
            {mode.description}
          </p>
        </div>

        {/* Progress bar indicator */}
        <div
          className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5"
          role="presentation"
        >
          <div
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out ${mode.gradient} ${
              isHovered ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>
    </Link>
  );
}

export default function ChillPage() {
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  const hovered = modes.find((m) => m.key === hoveredMode) ?? modes[1];

  return (
    <main className="relative min-h-screen bg-[#010101] text-zinc-100">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000"
        aria-hidden="true"
      >
        <div
          className={`absolute -left-[10%] -top-[20%] h-[70%] w-[70%] rounded-full bg-gradient-to-br ${hovered.gradient} opacity-[0.06] blur-[200px] transition-all duration-1000`}
        />
        <div className="absolute -bottom-[15%] -right-[10%] h-[60%] w-[60%] rounded-full bg-white/5 opacity-10 blur-[200px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 py-12 sm:px-10 lg:py-16">
        {/* Header */}
        <header className="mb-16 flex flex-col items-center justify-center text-center">
          <h1 className="mt-15 text-6xl font-black tracking-tighter md:text-8xl">
            <span className="opacity-70">CHILL</span>{" "}
            <span
              className={`bg-gradient-to-r ${hovered.gradient} bg-clip-text text-transparent`}
            >
              ZONE
            </span>
          </h1>
          <p className="text-[16px] mt-3 font-black uppercase tracking-[0.5em] text-zinc-100">
            Devine les soundtracks de tes animes, films et séries
          </p>
        </header>

        {/* Cards */}
        <div className="flex-grow space-y-10">
          {/* Primary modes (2 cols) */}
          <section aria-label="Catégories principales">
            <div className="mb-4 flex items-center gap-3 px-1">
              <Layers size={14} className="text-zinc-600" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                Catégories Principales
              </h2>
              <div
                className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent"
                role="presentation"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {primaryModes.map((m) => (
                <ModeCard
                  key={m.key}
                  mode={m}
                  isHovered={hoveredMode === m.key}
                  onHover={(h) => setHoveredMode(h ? m.key : null)}
                />
              ))}
            </div>
          </section>

          {/* Secondary modes (3 cols) */}
          <section aria-label="Catégories thématiques">
            <div className="mb-4 flex items-center gap-3 px-1">
              <Library size={14} className="text-zinc-600" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                Archives Thématiques
              </h2>
              <div
                className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent"
                role="presentation"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {secondaryModes.map((m) => (
                <ModeCard
                  key={m.key}
                  mode={m}
                  isHovered={hoveredMode === m.key}
                  onHover={(h) => setHoveredMode(h ? m.key : null)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Info bar */}
        <section
          aria-label="Informations du quiz"
          className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
                {stat.icon}
              </div>
              <div>
                <p className="mb-0.5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </p>
                <p className="text-base font-black text-zinc-200">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/5 pt-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <Music size={14} className="text-zinc-600" />
            <p className="text-[16px] font-black uppercase tracking-[0.5em] text-zinc-100">
              Fait avec passion par &amp; pour les fans d&apos;anime
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
