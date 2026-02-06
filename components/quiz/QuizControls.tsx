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
    <div className="flex justify-center gap-4">
      <button
        onClick={onTogglePause}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-2xl text-white shadow-lg transition-transform hover:scale-110 hover:bg-yellow-600"
        title={isPaused ? "Reprendre" : "Pause"}
      >
        {isPaused ? "▶️" : "⏸️"}
      </button>

      <button
        onClick={onSkip}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-2xl text-white shadow-lg transition-transform hover:scale-110 hover:bg-purple-600"
        title="Skip"
      >
        ⏭️
      </button>

      <button
        onClick={onReplay}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-600"
        title="Rejouer"
      >
        🔄
      </button>
    </div>
  );
}
