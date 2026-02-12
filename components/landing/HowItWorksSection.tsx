/* Section "comment ça marche" — 4 étapes en grille 2x2 :
   Choisis → Écoute → Devine → Progresse.
   Chaque étape a un numéro, une icône, un titre et une description. */

const STEPS = [
  { step: "01", icon: "🎯", title: "Choisis", desc: "Anime, film ou série. Quiz rapide ou mode chill — à toi de décider comment jouer." },
  { step: "02", icon: "🎵", title: "Écoute", desc: "Un extrait musical se lance automatiquement. Opening, ending ou soundtrack complète." },
  { step: "03", icon: "💡", title: "Devine", desc: "Trouve le bon titre parmi les propositions avant la fin du timer. Chaque seconde compte." },
  { step: "04", icon: "🏆", title: "Progresse", desc: "Cumule des points, améliore ton score et deviens incollable sur tes univers préférés." },
];

export default function HowItWorksSection() {
  return (
    <section aria-labelledby="how-heading" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
            {"// Comment ça marche"}
          </span>
          <h2 id="how-heading" className="font-display text-4xl text-white md:text-5xl">
            Simple et addictif
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="group relative rounded-xl border border-white/[0.06] bg-[#0e0c14] p-8 transition-all duration-300 hover:border-white/10 hover:bg-[#121019]"
            >
              {/* Numéro d'étape */}
              <span className="absolute -top-3.5 left-6 bg-[#07060b] px-3 py-0.5 rounded font-mono text-xs tracking-[0.3em] text-cyan-400/60">
                {s.step}
              </span>
              <span className="mb-4 block text-3xl" role="img" aria-hidden="true">{s.icon}</span>
              <h3 className="mb-2 font-display text-xl text-white">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
