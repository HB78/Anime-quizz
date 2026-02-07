import { ArrowLeft, RotateCcw, Shuffle, Trophy } from "lucide-react";
import Link from "next/link";

interface FinishedPhaseProps {
  questionCount: number;
  type: string;
  onReplay: () => void;
  onReset?: () => void;
  menuHref: string;
}

export function FinishedPhase({
  questionCount,
  type,
  onReplay,
  onReset,
  menuHref,
}: FinishedPhaseProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Trophy icon with golden glow */}
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/10">
        <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-xl" />
        <Trophy className="relative h-12 w-12 text-yellow-400" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center backdrop-blur-xl">
        <h1 className="mb-3 text-4xl font-bold text-white">Quiz terminé !</h1>
        <p className="mb-8 text-lg text-zinc-400">
          Tu as écouté {questionCount} {type}s
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
          >
            <RotateCcw className="h-5 w-5" />
            Nouveau Quiz
          </button>
          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 py-3 text-base font-bold text-amber-400 transition-all duration-300 hover:scale-105 hover:bg-amber-500/20"
            >
              <Shuffle className="h-5 w-5" />
              Tout remélanger
            </button>
          )}
          <Link
            href={menuHref}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 text-base font-medium text-zinc-300 transition-all duration-300 hover:scale-105 hover:bg-zinc-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
