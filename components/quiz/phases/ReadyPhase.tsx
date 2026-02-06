interface ReadyPhaseProps {
  questionCount: number;
  type: string;
  onStart: () => void;
}

export function ReadyPhase({ questionCount, type, onStart }: ReadyPhaseProps) {
  return (
    <div className="text-center">
      <div className="mb-6 text-8xl">🎮</div>
      <h2 className="mb-4 text-4xl font-bold text-white">
        Prêt à commencer ?
      </h2>
      <p className="mb-8 text-xl text-zinc-400">
        {questionCount} {type}s t&apos;attendent !
      </p>
      <button
        onClick={onStart}
        className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-12 py-6 text-2xl font-bold text-white shadow-2xl shadow-green-500/50 transition-transform hover:scale-105"
      >
        🚀 Lancer le Quiz
      </button>
    </div>
  );
}
