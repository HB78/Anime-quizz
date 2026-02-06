import Link from "next/link";

interface QuizErrorProps {
  message: string;
  onRetry: () => void;
  menuHref?: string;
}

export function QuizError({
  message,
  onRetry,
  menuHref = "/quiz",
}: QuizErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900 px-6">
      <div className="max-w-md text-center">
        <div className="mb-6 text-8xl">❌</div>
        <h1 className="mb-4 text-3xl font-bold text-white">Erreur</h1>
        <p className="mb-6 text-red-400">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onRetry}
            className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
          >
            Réessayer
          </button>
          <Link
            href={menuHref}
            className="rounded-xl bg-zinc-700 px-6 py-3 font-semibold text-white hover:bg-zinc-600"
          >
            Retour
          </Link>
        </div>
      </div>
    </main>
  );
}
