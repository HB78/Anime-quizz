import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";

interface ReadyPhaseProps {
  questionCount: number;
  type: string;
  onStart: () => void;
  menuHref?: string;
}

const ACCENT = "oklch(0.58 0.2 255)";

const COPY: Record<string, { eyebrow: string; titleA: string; titleB: string; subtitle: (n: number) => string }> = {
  opening: {
    eyebrow: "Session Quiz · Openings",
    titleA: "À toi",
    titleB: "de jouer",
    subtitle: (n) => `${n} openings à reconnaître. 25 secondes par extrait. Prêt à tester ta culture anime ?`,
  },
  ending: {
    eyebrow: "Session Quiz · Endings",
    titleA: "À toi",
    titleB: "de jouer",
    subtitle: (n) => `${n} endings à reconnaître. 25 secondes par extrait. Prêt à tester ta culture anime ?`,
  },
  soundtrack: {
    eyebrow: "Session Chill · Soundtracks",
    titleA: "Devine la",
    titleB: "bande-son.",
    subtitle: (n) => `${n} extraits aléatoires. 25 secondes pour reconnaître. Tu n'as rien à faire — laisse-toi porter.`,
  },
};

export function ReadyPhase({ questionCount, type, onStart, menuHref }: ReadyPhaseProps) {
  const copy = COPY[type] ?? COPY.soundtrack;

  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* Bouton retour discret */}
      {menuHref && (
        <Link
          href={menuHref}
          className="group fixed left-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          <div
            className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"
            style={{ background: ACCENT }}
          />
          <ArrowLeft size={15} strokeWidth={2.5} className="relative" />
        </Link>
      )}

      {/* Eyebrow */}
      <div
        className="mb-8 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.4em]"
        style={{ color: ACCENT }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
        />
        {copy.eyebrow}
      </div>

      {/* Title */}
      <h1 className="mb-7 text-6xl font-extrabold leading-[0.92] tracking-tighter text-white md:text-8xl">
        <span className="block">{copy.titleA}</span>
        <span className="block" style={{ color: ACCENT }}>
          {copy.titleB}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mb-14 max-w-md text-[17px] leading-relaxed text-white/75">
        {copy.subtitle(questionCount)}
      </p>

      {/* CTA */}
      <button
        onClick={onStart}
        className="group inline-flex cursor-pointer items-center gap-3.5 rounded-full px-16 py-6 text-lg font-extrabold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
        style={{
          background: ACCENT,
          boxShadow: `0 30px 60px -20px ${ACCENT}, inset 0 0 0 1px rgba(255,255,255,0.12)`,
        }}
      >
        <span>Démarrer</span>
        <Play className="h-[18px] w-[18px] fill-current" />
      </button>

      {/* Hint */}
      <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
        Espace pour pause · → pour passer
      </div>
    </div>
  );
}
