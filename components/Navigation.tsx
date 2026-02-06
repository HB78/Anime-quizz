import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="AnimeQuiz logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-white">AnimeQuiz</span>
        </Link>

        <div className="flex gap-2">
          <Link
            href="/quiz"
            className="rounded-xl px-4 py-2 font-semibold text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            Quiz
          </Link>
          <Link
            href="/chill"
            className="rounded-xl px-4 py-2 font-semibold text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            Chill
          </Link>
          <Link
            href="/training"
            className="rounded-xl px-4 py-2 font-semibold text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            Training
          </Link>
        </div>
      </div>
    </nav>
  );
}
