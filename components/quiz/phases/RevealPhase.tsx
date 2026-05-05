import { QuizQuestion } from "@/hooks/use-quiz";
import { Calendar, Music, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RevealPhaseProps {
  question: QuizQuestion;
}

export function RevealPhase({ question }: RevealPhaseProps) {
  const [imgSrc, setImgSrc] = useState(question.imageUrl);

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-end justify-center duration-500 pb-16 px-6">
      {/* Image en fond plein écran */}
      {question.imageUrl && (
        <>
          <Image
            src={imgSrc}
            alt={question.source}
            fill
            className="object-cover"
            sizes="100vw"
            onError={() => setImgSrc(question.imageUrl.replace("maxresdefault", "hqdefault"))}
          />
          {/* Overlay dégradé sombre */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </>
      )}

      {/* Contenu flottant en bas */}
      <div className="relative z-10 w-full max-w-lg text-center">
        <h2 className="mb-2 text-4xl font-black tracking-tight text-white drop-shadow-lg">
          {question.source}
        </h2>
        <p className="mb-5 text-xl text-zinc-300 drop-shadow">{question.correctAnswer}</p>

        {/* Séparateur */}
        <div className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300 backdrop-blur-sm">
            <Music className="h-3.5 w-3.5" />
            {question.type}
            {question.sequence}
          </span>
          {question.artist && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur-sm">
              <User className="h-3.5 w-3.5" />
              {question.artist}
            </span>
          )}
          {question.year && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur-sm">
              <Calendar className="h-3.5 w-3.5" />
              {question.year}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
