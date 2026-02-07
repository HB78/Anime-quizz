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
    <div className="flex items-end justify-center gap-6">
      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={onTogglePause}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full border text-white shadow-lg transition-all duration-300 hover:scale-110 ${
            isPaused
              ? "border-green-500/50 bg-green-500/20 hover:bg-green-500/30"
              : "border-yellow-500/50 bg-yellow-500/20 hover:bg-yellow-500/30"
          }`}
          title={isPaused ? "Reprendre" : "Pause"}
        >
          {!isPaused && (
            <span className="absolute inset-0 animate-ping rounded-full border border-yellow-400/30" />
          )}
          {isPaused ? (
            <Play className="h-6 w-6 text-green-400" />
          ) : (
            <Pause className="h-6 w-6 text-yellow-400" />
          )}
        </button>
        <span className="text-xs text-zinc-500">
          {isPaused ? "Play" : "Pause"}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={onSkip}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/50 bg-purple-500/20 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-purple-500/30"
          title="Skip"
        >
          <SkipForward className="h-6 w-6 text-purple-400" />
        </button>
        <span className="text-xs text-zinc-500">Skip</span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={onReplay}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/20 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-500/30"
          title="Rejouer"
        >
          <RotateCcw className="h-6 w-6 text-blue-400" />
        </button>
        <span className="text-xs text-zinc-500">Rejouer</span>
      </div>
    </div>
  );
}
