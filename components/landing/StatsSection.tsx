import AnimCounter from "./AnimCounter";

/* Section statistiques — bandeau horizontal avec 4 compteurs animés.
   Les nombres s'incrémentent de 0 à la valeur cible quand on scrolle dessus. */

const STATS = [
  { target: 500, suffix: "+", label: "Titres" },
  { target: 150, suffix: "+", label: "Animes" },
  { target: 80, suffix: "+", label: "Films & Séries" },
  { target: 3, suffix: "", label: "Modes de jeu" },
];

export default function StatsSection() {
  return (
    <section aria-label="Statistiques de la plateforme" className="relative z-10 border-y border-white/[0.03] px-6 py-20">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="py-4" aria-label={`${s.target}${s.suffix} ${s.label}`}>
            <span className="block font-display text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              <AnimCounter target={s.target} suffix={s.suffix} />
            </span>
            <span className="mt-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
