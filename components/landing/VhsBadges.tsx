"use client";

import { useEffect, useState } from "react";

/* Badges VHS — petits textes dans les coins de l'écran :
   - Haut gauche : "REC" avec un point rouge clignotant + horloge temps réel
   - Bas droite : "PLAY ▶"
   Purement décoratif, caché des lecteurs d'écran. */

export default function VhsBadges() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":"),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true">
      <div className="fixed top-4 left-5 z-[100] pointer-events-none font-mono text-[0.6rem] text-cyan-400/25 tracking-wider">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          REC
        </span>
        <div className="mt-0.5">{time}</div>
      </div>
      <div className="fixed bottom-4 right-5 z-[100] pointer-events-none font-mono text-[0.6rem] text-cyan-400/25 tracking-wider">
        PLAY ▶
      </div>
    </div>
  );
}
