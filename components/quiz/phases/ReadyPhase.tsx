import { Play } from "lucide-react";

interface ReadyPhaseProps {
  questionCount: number;
  type: string;
  onStart: () => void;
}

const ACCENT = "oklch(0.58 0.2 255)";

export function ReadyPhase({ questionCount, type, onStart }: ReadyPhaseProps) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* Eyebrow */}
      <div
        className="mb-8 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.4em]"
        style={{ color: ACCENT }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
        />
        Session Chill · Soundtracks
      </div>

      {/* Title */}
      <h1 className="mb-7 text-6xl font-extrabold leading-[0.92] tracking-tighter text-white md:text-8xl">
        <span className="block">Devine la</span>
        <span className="block" style={{ color: ACCENT }}>
          bande-son.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mb-14 max-w-md text-[17px] leading-relaxed text-white/60">
        {questionCount} extraits aléatoires. 20 secondes pour reconnaître. Tu
        n&apos;as rien à faire — laisse-toi porter.
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
