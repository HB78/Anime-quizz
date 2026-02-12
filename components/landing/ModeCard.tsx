"use client";

import Link from "next/link";
import { useState } from "react";
import AudioViz from "./AudioViz";

/* Carte de mode de jeu — style arrondi avec fond en gradient coloré.
   Au hover : scale-up, bordure colorée, shadow colorée et AudioViz en bas.
   Utilisée pour Quiz, Chill et Training. */

export default function ModeCard({
  href,
  emoji,
  title,
  description,
  cta,
  accentClass,
  gradientClass,
  shadowClass,
  borderHoverClass,
  vizColor,
  delay,
}: {
  href: string;
  emoji: string;
  title: string;
  description: string;
  cta: string;
  accentClass: string;
  gradientClass: string;
  shadowClass: string;
  borderHoverClass: string;
  vizColor: string;
  delay: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      aria-label={`${title} — ${description}`}
      className="group relative block animate-card-reveal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 rounded-2xl"
      style={{ animationDelay: delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 ${gradientClass} p-8 transition-all duration-500 hover:scale-105 ${borderHoverClass} hover:shadow-lg ${shadowClass}`}
      >
        {/* Icône — décoratif */}
        <span className="mb-4 block text-4xl" role="img" aria-hidden="true">{emoji}</span>
        {/* Texte */}
        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
        {/* CTA */}
        <span
          className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:gap-3 ${accentClass}`}
        >
          {cta} →
        </span>
        {/* Visualiseur audio au hover — décoratif */}
        {hovered && (
          <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-7 px-6 opacity-25">
            <AudioViz bars={20} color={vizColor} />
          </div>
        )}
      </div>
    </Link>
  );
}
