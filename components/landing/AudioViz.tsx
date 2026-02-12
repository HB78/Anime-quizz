/* Visualiseur audio décoratif — barres verticales qui oscillent
   comme un équaliseur audio. Purement visuel (pas de son),
   apparaît au hover des ModeCards pour renforcer le thème musical. */

import { useMemo } from "react";

export default function AudioViz({
  color = "bg-cyan-400",
  bars = 24,
}: {
  color?: string;
  bars?: number;
}) {
  const barStyles = useMemo(
    () =>
      Array.from({ length: bars }).map((_, i) => {
        const seed = (i + 1) * 3.17;
        const r = (((Math.sin(seed) * 10000) % 1) + 1) % 1;
        return {
          animationDelay: `${i * 0.05}s`,
          height: `${20 + r * 80}%`,
        };
      }),
    [bars],
  );

  return (
    <div className="flex items-end gap-[2px] h-8">
      {barStyles.map((style, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-sm ${color} opacity-60 animate-viz-bar`}
          style={style}
        />
      ))}
    </div>
  );
}
