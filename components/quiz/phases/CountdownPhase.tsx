const ACCENT = "oklch(0.58 0.2 255)";

interface CountdownPhaseProps {
  countdown: number;
}

export function CountdownPhase({ countdown }: CountdownPhaseProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Chiffre principal */}
      <span
        key={countdown}
        className="animate-countdown-scale block text-[200px] font-black leading-none tabular-nums text-white"
        style={{
          textShadow: `0 0 60px ${ACCENT}, 0 0 120px ${ACCENT}80, 0 4px 30px rgba(0,0,0,0.5)`,
        }}
      >
        {countdown}
      </span>

      {/* Label */}
      <div className="mt-8 flex items-center gap-3">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
        />
        <span
          className="font-mono text-[12px] font-bold uppercase tracking-[0.5em]"
          style={{ color: ACCENT }}
        >
          Prépare-toi
        </span>
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
        />
      </div>

      {/* Indicateurs de progression (3 dots) */}
      <div className="mt-10 flex items-center gap-2">
        {[3, 2, 1].map((n) => (
          <div
            key={n}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: countdown <= n ? "32px" : "8px",
              background: countdown <= n ? ACCENT : "rgba(255,255,255,0.15)",
              boxShadow: countdown <= n ? `0 0 8px ${ACCENT}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
