"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ACCENT = "oklch(0.58 0.2 255)";

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  type?: string;
  menuHref?: string;
  status?: string;
}

export function QuizHeader({
  currentIndex,
  totalQuestions,
  type,
  menuHref,
  status,
}: QuizHeaderProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="fixed left-0 right-0 top-0 z-40">
      {/* Fond glassmorphism subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-md" />

      <div className="relative flex items-center justify-between px-10 py-6">

        {/* Gauche : retour + label */}
        <div className="flex items-center gap-6">
          {menuHref && (
            <Link
              href={menuHref}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
            >
              <div
                className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"
                style={{ background: ACCENT }}
              />
              <ArrowLeft size={15} className="relative" strokeWidth={2.5} />
            </Link>
          )}

          {type && (
            <div className="flex items-center gap-3">
              {/* Dot accent */}
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
              />
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-white">
                  Chill
                </span>
                <span className="font-mono text-[9px] text-white/25">━━</span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-white/55">
                  {type}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Centre : statut */}
        {status && (
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-full border px-4 py-1.5 backdrop-blur-md"
            style={{
              borderColor: `${ACCENT}40`,
              background: `${ACCENT}15`,
            }}
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: ACCENT }}
            />
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.4em]"
              style={{ color: ACCENT }}
            >
              {status}
            </span>
          </div>
        )}

        {/* Droite : compteur */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
            Extrait
          </span>
          <span className="font-mono text-base font-bold tabular-nums text-white">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-base font-light text-white/25">/</span>
          <span className="font-mono text-base font-medium tabular-nums text-white/50">
            {totalQuestions}
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="relative h-[2px] w-full bg-white/[0.05]">
        <div
          className="relative h-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div
            className="absolute inset-0"
            style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}, 0 0 24px ${ACCENT}60` }}
          />
          {/* Effet de tête lumineuse */}
          <div
            className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full blur-sm"
            style={{ background: ACCENT }}
          />
        </div>
      </div>
    </div>
  );
}
