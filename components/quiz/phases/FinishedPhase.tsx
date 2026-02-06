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
    <div className="text-center">
      <div className="mb-6 text-8xl">🎉</div>
      <h1 className="mb-4 text-5xl font-bold text-white">Quiz terminé !</h1>
      <p className="mb-8 text-xl text-zinc-400">
        Tu as écouté {questionCount} {type}s
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onReplay}
          className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-xl font-bold text-white shadow-2xl shadow-green-500/50 transition-transform hover:scale-105"
        >
          🔄 Nouveau Quiz
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-xl font-bold text-white shadow-2xl shadow-amber-500/50 transition-transform hover:scale-105"
          >
            🔀 Tout remélanger
          </button>
        )}
        <Link
          href={menuHref}
          className="rounded-xl bg-zinc-700 px-8 py-4 text-xl font-bold text-white hover:bg-zinc-600"
        >
          ← Menu
        </Link>
      </div>
    </div>
  );
}
