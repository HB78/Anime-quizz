import Image from "next/image";
import Link from "next/link";

export default function LandingNav() {
  return (
    <nav
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-max -translate-x-1/2"
      aria-label="Navigation principale"
    >
      <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xl min-md:flex-row min-md:gap-12 min-md:px-6 min-md:py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="AnimeQuiz logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-lg font-bold text-white">AnimeQuiz</span>
        </Link>

        <div className="flex flex-wrap justify-center gap-1">
          <Link
            href="/quiz"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white min-md:px-4"
          >
            Otaku
          </Link>
          <Link
            href="/chill"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white min-md:px-4"
          >
            Blindtest
          </Link>
          <Link
            href="/training"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white min-md:px-4"
          >
            Training
          </Link>
        </div>
      </div>
    </nav>
  );
}
