import { QuizQuestion } from "@/hooks/use-quiz";
import { Calendar, Music, User } from "lucide-react";
import Image from "next/image";

interface RevealPhaseProps {
  question: QuizQuestion;
}

export function RevealPhase({ question }: RevealPhaseProps) {
  return (
    <div className="animate-in fade-in mx-auto max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl duration-300">
      {/* Image with gradient overlay */}
      {question.imageUrl && (
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={question.imageUrl}
            alt={question.source}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 512px"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900/90 to-transparent" />
        </div>
      )}

      {/* Info section */}
      <div className="p-6 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">
          {question.source}
        </h2>
        <p className="mb-5 text-xl text-zinc-400">{question.correctAnswer}</p>

        {/* Separator */}
        <div className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
            <Music className="h-3.5 w-3.5" />
            {question.type}
            {question.sequence}
          </span>
          {question.artist && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
              <User className="h-3.5 w-3.5" />
              {question.artist}
            </span>
          )}
          {question.year && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
              <Calendar className="h-3.5 w-3.5" />
              {question.year}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
