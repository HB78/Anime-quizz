import { ChevronRight, Headphones, Zap } from "lucide-react";

interface ReadyPhaseProps {
  questionCount: number;
  type: string;
  onStart: () => void;
}

export function ReadyPhase({ questionCount, type, onStart }: ReadyPhaseProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center backdrop-blur-xl">
        {/* Icon */}
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />
          <Headphones className="relative h-10 w-10 text-blue-400" />
        </div>

        <h2 className="mb-3 text-3xl font-bold text-white">
          Prêt à commencer ?
        </h2>

        {/* Badge type */}
        <span className="mb-4 inline-block rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-zinc-300">
          {type}
        </span>

        <p className="mb-8 text-lg text-zinc-400">
          {questionCount} {type}s t&apos;attendent !
        </p>

        <button
          onClick={onStart}
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
        >
          <Zap className="h-5 w-5" />
          Lancer le Quiz
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
