import { Loader2, Music } from "lucide-react";

interface QuizLoadingProps {
  type?: string;
}

export function QuizLoading({ type = "opening" }: QuizLoadingProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 px-12 py-10 text-center backdrop-blur-xl">
        <div className="relative mb-6 inline-flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-400" />
          <Music className="absolute h-7 w-7 text-blue-300" />
        </div>
        <p className="text-2xl font-bold text-white">Génération du quiz...</p>
        <p className="mt-2 text-zinc-400">
          Sélection de 15 {type}s aléatoires avec audio
        </p>
      </div>
    </main>
  );
}
