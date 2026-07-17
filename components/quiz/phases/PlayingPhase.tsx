import { Volume2 } from "lucide-react";

import { QuizControls } from "../QuizControls";

const ACCENT = "oklch(0.58 0.2 255)";
const RADIUS = 110;
const CIRC = 2 * Math.PI * RADIUS;

interface PlayingPhaseProps {
  countdown: number;
  duration: number;
  isPaused: boolean;
  isBuffering: boolean;
  onTogglePause: () => void;
  onSkip: () => void;
  onReplay: () => void;
}

export function PlayingPhase({
  countdown,
  duration,
  isPaused,
  isBuffering,
  onTogglePause,
  onSkip,
  onReplay,
}: PlayingPhaseProps) {
  const ratio = countdown / duration;
  const ringColor =
    ratio > 0.5
      ? ACCENT
      : ratio > 0.25
        ? "oklch(0.78 0.16 70)"
        : "oklch(0.7 0.2 25)";

  return (
    <div
      className={`text-center transition-opacity duration-500 ${
        isPaused ? "opacity-70" : "opacity-100"
      }`}
    >
      {/* Statut */}
      <div className="mb-9 flex items-center justify-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.25em]">
        {isPaused ? (
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="text-white/80">En pause</span>
          </div>
        ) : isBuffering ? (
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white/70" />
            <span className="text-white/80">Synchronisation...</span>
          </div>
        ) : (
          <span className="flex items-center gap-2.5 text-white/85">
            <Volume2
              className="h-4 w-4 animate-pulse"
              style={{ color: ACCENT }}
            />
            Écoute attentivement
          </span>
        )}
      </div>

      {/* Timer circulaire */}
      <div className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center">
        {/* Halo */}
        <div
          className="absolute -inset-10 rounded-full blur-3xl"
          style={{
            background: `${ringColor}40`,
            opacity: isPaused ? 0.3 : 0.6,
          }}
        />
        {/* SVG */}
        <svg width="280" height="280" className="absolute -rotate-90">
          <circle
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
          <circle
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - ratio)}
            style={{ transition: "stroke-dashoffset 1s linear, stroke 700ms" }}
          />
        </svg>
        {/* Chiffre */}
        <div className="flex flex-col items-center">
          <span
            className="text-[120px] font-semibold leading-none tabular-nums text-white"
            style={{ textShadow: `0 4px 30px ${ringColor}60` }}
          >
            {countdown}
          </span>
          <span className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            secondes
          </span>
        </div>
      </div>

      {/* Contrôles */}
      <div className="mt-10">
        <QuizControls
          isPaused={isPaused}
          onTogglePause={onTogglePause}
          onSkip={onSkip}
          onReplay={onReplay}
        />
      </div>
    </div>
  );
}
