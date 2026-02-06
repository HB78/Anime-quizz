interface CountdownPhaseProps {
  countdown: number;
}

export function CountdownPhase({ countdown }: CountdownPhaseProps) {
  return (
    <div className="text-center">
      <div className="mb-4 animate-pulse text-9xl font-bold text-white">
        {countdown}
      </div>
      <p className="text-2xl text-zinc-400">Prépare-toi...</p>
    </div>
  );
}
