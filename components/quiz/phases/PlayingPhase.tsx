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
  return (
    <div className="text-center">
      <div className="mb-8 text-9xl font-bold text-white">{countdown}</div>

      {isPaused ? (
        <p className="mb-8 text-2xl text-yellow-400">⏸️ En pause</p>
      ) : (
        <p className="mb-8 text-2xl text-zinc-400">🎵 Écoute bien...</p>
      )}

      {/* Barre de progression */}
      <div className="mx-auto mb-12 h-3 w-full max-w-md overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
          style={{ width: `${(countdown / duration) * 100}%` }}
        />
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
