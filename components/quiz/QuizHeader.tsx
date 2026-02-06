interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
}

export function QuizHeader({ currentIndex, totalQuestions }: QuizHeaderProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8 text-center">
      <div className="mb-2 text-zinc-400">
        Question {currentIndex + 1} / {totalQuestions}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
