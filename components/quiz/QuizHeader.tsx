interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  type?: string;
}

export function QuizHeader({
  currentIndex,
  totalQuestions,
  type,
}: QuizHeaderProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        {type && (
          <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            {type}
          </span>
        )}
        <span className="ml-auto rounded-full border border-zinc-700 bg-zinc-800/80 px-4 py-1 text-sm font-medium text-zinc-300">
          Question {currentIndex + 1} / {totalQuestions}
        </span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-500/50 to-cyan-400/50 blur-sm transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
