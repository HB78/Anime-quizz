import { Music } from "lucide-react";

interface CountdownPhaseProps {
  countdown: number;
}

export function CountdownPhase({ countdown }: CountdownPhaseProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Cercle animé autour du chiffre */}
      <div className="relative mb-6 flex h-40 w-40 items-center justify-center">
        <div className="absolute inset-0 animate-pulse rounded-full border-2 border-blue-500/30" />
        <div className="absolute inset-2 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-xl" />
        <span
          key={countdown}
          className="animate-countdown-scale relative text-8xl font-bold text-white"
        >
          {countdown}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xl text-zinc-400">
        <Music className="h-5 w-5 text-blue-400" />
        <span>Prépare-toi...</span>
      </div>
    </div>
  );
}
