import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

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
  const arcColor =
    ratio > 0.5 ? "#22c55e" : ratio > 0.25 ? "#eab308" : "#ef4444";

  return (
    <div
      className={`flex flex-col items-center text-center transition-opacity duration-500 ${isPaused ? "opacity-50" : "opacity-100"}`}
    >
      {/* Timer SVG */}
      <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
        <svg
          width="160"
          height="160"
          className="absolute inset-0 -rotate-90"
          aria-hidden="true"
        >
          <circle cx="80" cy="80" r="72" fill="none" stroke="#ffffff08" strokeWidth="3" />
          <circle
            cx="80" cy="80" r="72"
            fill="none"
            stroke={arcColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 72}
            strokeDashoffset={(1 - ratio) * 2 * Math.PI * 72}
            style={{ transition: "stroke-dashoffset 1s linear, stroke 700ms" }}
          />
        </svg>
        <span className="relative text-7xl font-bold tabular-nums text-white">
          {countdown}
        </span>
      </div>

      {/* Status */}
      <div className="mb-10 h-6 flex items-center justify-center">
        {isPaused ? (
          <div
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
              En pause
            </span>
          </div>
        ) : isBuffering ? (
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white/40" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
              Synchronisation...
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 shadow-lg shadow-blue-500/10">
            {/* Equalizer bars */}
            <div className="flex items-end gap-0.5 h-3">
              {[0, 150, 300, 150, 0].map((delay, i) => (
                <span
                  key={i}
                  className="w-0.5 rounded-full bg-blue-400"
                  style={{
                    height: i === 2 ? "100%" : i % 2 === 0 ? "50%" : "75%",
                    animation: `viz-bar 0.8s ease-in-out infinite alternate`,
                    animationDelay: `${delay}ms`,
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-300">
              Écoute bien...
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-end justify-center gap-6">
        <div className="flex flex-col items-center gap-1.5">
          <button
            onClick={onTogglePause}
            className={`cursor-pointer relative flex h-14 w-14 items-center justify-center rounded-full border text-white shadow-lg transition-all duration-300 hover:scale-110 ${
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
          <span className="text-xs text-zinc-500">{isPaused ? "Play" : "Pause"}</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <button
            onClick={onSkip}
            className="cursor-pointer flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/50 bg-purple-500/20 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-purple-500/30"
            title="Skip"
          >
            <SkipForward className="h-6 w-6 text-purple-400" />
          </button>
          <span className="text-xs text-zinc-500">Skip</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <button
            onClick={onReplay}
            className="cursor-pointer flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/20 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-500/30"
            title="Rejouer"
          >
            <RotateCcw className="h-6 w-6 text-blue-400" />
          </button>
          <span className="text-xs text-zinc-500">Rejouer</span>
        </div>
      </div>
    </div>
  );
}
