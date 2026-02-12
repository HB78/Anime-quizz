"use client";

import { startTransition, useEffect, useMemo, useState } from "react";

/* 20 kanji liés à la musique, l'anime et le combat.
   Positionnés aléatoirement en arrière-plan pour donner
   une atmosphère "japonaise" à la page. Purement décoratif. */
const KANJI = [
  "音", "楽", "曲", "歌", "響", "夢", "星", "光", "闇", "魂",
  "炎", "風", "雷", "剣", "龍", "桜", "月", "戦", "命", "力",
];

export default function FloatingKanji() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  const kanjiStyles = useMemo(
    () =>
      KANJI.map((_, i) => {
        const seed = (i + 1) * 7.31;
        const r1 = (((Math.sin(seed) * 10000) % 1) + 1) % 1;
        const r2 = (((Math.sin(seed + 1) * 10000) % 1) + 1) % 1;
        const r5 = (((Math.sin(seed + 4) * 10000) % 1) + 1) % 1;
        return {
          left: `${r1 * 100}%`,
          top: `${r2 * 100}%`,
          fontSize: `${1 + r5 * 3}rem`,
        };
      }),
    [],
  );

  if (!mounted)
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />
    );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {KANJI.map((k, i) => (
        <span
          key={i}
          className="absolute text-cyan-400/[0.04] select-none"
          style={kanjiStyles[i]}
        >
          {k}
        </span>
      ))}
    </div>
  );
}
