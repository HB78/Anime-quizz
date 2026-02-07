import { Volume2 } from "lucide-react";

import { QuizControls } from "../QuizControls";

interface PlayingPhaseProps {
  countdown: number;
  duration: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onSkip: () => void;
  onReplay: () => void;
}

export function PlayingPhase({
  countdown,
  duration,
  isPaused,
  onTogglePause,
  onSkip,
  onReplay,
}: PlayingPhaseProps) {
  const ratio = countdown / duration;
  const barColor =
    ratio > 0.5
      ? "from-green-500 to-emerald-400"
      : ratio > 0.25
        ? "from-yellow-500 to-amber-400"
        : "from-red-500 to-rose-400";
  const glowColor =
    ratio > 0.5
      ? "from-green-500/50 to-emerald-400/50"
      : ratio > 0.25
        ? "from-yellow-500/50 to-amber-400/50"
        : "from-red-500/50 to-rose-400/50";

  return (
    <div
      className={`text-center transition-opacity duration-500 ${isPaused ? "opacity-60" : "opacity-100"}`}
    >
      {/* Timer circle */}
      <div className="relative mx-auto mb-6 flex h-36 w-36 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-zinc-700" />
        <div
          className={`absolute inset-0 rounded-full border-2 transition-colors duration-1000 ${
            ratio > 0.5
              ? "border-green-500/30"
              : ratio > 0.25
                ? "border-yellow-500/30"
                : "border-red-500/30"
          }`}
        />
        <span className="relative text-7xl font-bold text-white">
          {countdown}
        </span>
      </div>

      {/* Status text */}
      {isPaused ? (
        <div className="mb-6 flex items-center justify-center gap-2 text-xl text-yellow-400">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
          En pause
        </div>
      ) : (
        <div className="mb-6 flex items-center justify-center gap-2 text-xl text-zinc-400">
          <Volume2 className="h-5 w-5 animate-pulse text-blue-400" />
          Écoute bien...
        </div>
      )}

      {/* Progress bar with dynamic color */}
      <div className="mx-auto mb-10 h-2 w-full max-w-md overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`relative h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-1000`}
          style={{ width: `${ratio * 100}%` }}
        >
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${glowColor} blur-sm`}
          />
        </div>
      </div>

      <QuizControls
        isPaused={isPaused}
        onTogglePause={onTogglePause}
        onSkip={onSkip}
        onReplay={onReplay}
      />
    </div>
  );
}
