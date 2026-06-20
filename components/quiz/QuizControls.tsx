import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

interface QuizControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onSkip: () => void;
  onReplay: () => void;
}

export function QuizControls({
  isPaused,
  onTogglePause,
  onSkip,
  onReplay,
}: QuizControlsProps) {
  return (
    <div className="flex items-end justify-center gap-7">
      {/* Action secondaire : Rejouer */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onReplay}
          aria-label="Rejouer l'extrait"
          className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-blue-400/50 bg-blue-500/15 text-white transition-all duration-200 hover:bg-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-safe:hover:scale-105 active:scale-95"
        >
          <RotateCcw className="h-6 w-6 text-blue-300 transition-colors group-hover:text-blue-200" />
        </button>
        <span className="text-[13px] font-medium text-white/75">Rejouer</span>
      </div>

      {/* Action principale : Pause / Reprendre — plus grande */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onTogglePause}
          aria-label={isPaused ? "Reprendre la lecture" : "Mettre en pause"}
          className={`group relative flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full border-2 text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-safe:hover:scale-105 active:scale-95 ${
            isPaused
              ? "border-emerald-400/70 bg-emerald-500/25 shadow-[0_0_30px_-8px] shadow-emerald-500/60 hover:bg-emerald-500/35 focus-visible:ring-emerald-400"
              : "border-amber-400/70 bg-amber-500/25 shadow-[0_0_30px_-8px] shadow-amber-500/60 hover:bg-amber-500/35 focus-visible:ring-amber-400"
          }`}
        >
          {!isPaused && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-amber-300/40 motion-safe:animate-ping"
            />
          )}
          {isPaused ? (
            <Play className="h-8 w-8 fill-emerald-300 text-emerald-300" />
          ) : (
            <Pause className="h-8 w-8 fill-amber-300 text-amber-300" />
          )}
        </button>
        <span className="text-sm font-semibold text-white/90">
          {isPaused ? "Reprendre" : "Pause"}
        </span>
      </div>

      {/* Action secondaire : Passer */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onSkip}
          aria-label="Passer à l'extrait suivant"
          className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-purple-400/50 bg-purple-500/15 text-white transition-all duration-200 hover:bg-purple-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-safe:hover:scale-105 active:scale-95"
        >
          <SkipForward className="h-6 w-6 text-purple-300 transition-colors group-hover:text-purple-200" />
        </button>
        <span className="text-[13px] font-medium text-white/75">Passer</span>
      </div>
    </div>
  );
}
