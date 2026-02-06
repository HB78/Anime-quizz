interface QuizLoadingProps {
  type?: string;
}

export function QuizLoading({ type = "opening" }: QuizLoadingProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="text-center">
        <div className="mb-6 animate-bounce text-8xl">🎵</div>
        <p className="text-2xl font-bold text-white">Génération du quiz...</p>
        <p className="mt-2 text-zinc-400">
          Sélection de 15 {type}s aléatoires avec audio
        </p>
      </div>
    </main>
  );
}
