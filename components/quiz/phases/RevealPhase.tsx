import { QuizQuestion } from "@/hooks/use-quiz";
import Image from "next/image";

interface RevealPhaseProps {
  question: QuizQuestion;
}

export function RevealPhase({ question }: RevealPhaseProps) {
  return (
    <div className="animate-in fade-in text-center duration-300">
      {question.imageUrl && (
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={question.imageUrl}
            alt={question.source}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}

      <h2 className="mb-2 text-4xl font-bold text-white">{question.source}</h2>
      <p className="mb-4 text-2xl text-zinc-400">{question.correctAnswer}</p>
      <div className="flex items-center justify-center gap-3 text-zinc-500">
        <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-400">
          {question.type}
          {question.sequence}
        </span>
        <span>{question.artist}</span>
        {question.year && <span>• {question.year}</span>}
      </div>
    </div>
  );
}
