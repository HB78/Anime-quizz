import { ArrowLeft, RotateCcw, Shuffle } from "lucide-react";
import Link from "next/link";

const ACCENT = "oklch(0.58 0.2 255)";

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
    <div className="flex flex-col items-center text-center">
      {/* Vidéo ronde avec halo bleu */}
      <div
        className="relative mb-8 h-32 w-32 overflow-hidden rounded-full border-2"
        style={{ borderColor: `${ACCENT}50` }}
      >
        <div
          className="absolute -inset-4 rounded-full blur-xl"
          style={{ background: `${ACCENT}30` }}
        />
        <video
          className="relative h-full w-full object-cover"
          src="/videos/misterpopo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Titre */}
      <h1 className="mb-6 text-7xl font-bold leading-[0.9] tracking-tighter text-white md:text-8xl">
        Bien <span style={{ color: ACCENT }}>joué</span>
      </h1>

      <p className="mb-14 max-w-md text-[17px] leading-relaxed text-white/75">
        Tu viens d&apos;écouter{" "}
        <span className="font-semibold text-white">
          {questionCount} extraits
        </span>{" "}
        de {type}. Prêt pour un autre tour ?
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onReplay}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full px-10 py-5 text-base font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
          style={{
            background: ACCENT,
            boxShadow: `0 20px 60px -20px ${ACCENT}`,
          }}
        >
          <RotateCcw className="h-5 w-5" />
          Nouvelle session
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-8 py-5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.12]"
          >
            <Shuffle className="h-5 w-5" />
            Tout remélanger
          </button>
        )}

        <Link
          href={menuHref}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] px-7 py-5 text-[15px] font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          Menu
        </Link>
      </div>
    </div>
  );
}
