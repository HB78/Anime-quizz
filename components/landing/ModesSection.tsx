import ModeCard from "./ModeCard";

/* Section modes de jeu — présente les 3 modes (Quiz, Chill, Training)
   avec un header "// Choisis ton arène" et une grille de 3 ModeCards. */

export default function ModesSection() {
  return (
    <section id="modes" aria-labelledby="modes-heading" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
            {"// Choisis ton arène"}
          </span>
          <h2 id="modes-heading" className="font-display text-4xl text-white md:text-5xl">
            Modes de jeu
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <ModeCard
            href="/quiz"
            emoji="🎵"
            title="Quiz"
            description="Le défi ultime pour les otakus. 15 questions, 10 secondes — reconnais les openings et endings d'anime."
            cta="Jouer"
            accentClass="text-blue-400 group-hover:text-blue-300"
            gradientClass="bg-gradient-to-br from-blue-600/20 to-cyan-600/20"
            shadowClass="hover:shadow-blue-500/20"
            borderHoverClass="hover:border-blue-500/30"
            vizColor="bg-cyan-400"
            delay="0s"
          />
          <ModeCard
            href="/chill"
            emoji="🎧"
            title="Chill"
            description="Anime, films, séries — devine les soundtracks iconiques de tous les univers. 20 secondes, accessible à tous."
            cta="Jouer"
            accentClass="text-purple-400 group-hover:text-purple-300"
            gradientClass="bg-gradient-to-br from-purple-600/20 to-pink-600/20"
            shadowClass="hover:shadow-purple-500/20"
            borderHoverClass="hover:border-purple-500/30"
            vizColor="bg-pink-400"
            delay="0.1s"
          />
          <ModeCard
            href="/training"
            emoji="📚"
            title="Training"
            description="Explore la base de données complète et entraîne-toi à ton rythme sur n'importe quel titre."
            cta="Explorer"
            accentClass="text-emerald-400 group-hover:text-emerald-300"
            gradientClass="bg-gradient-to-br from-emerald-600/20 to-teal-600/20"
            shadowClass="hover:shadow-emerald-500/20"
            borderHoverClass="hover:border-emerald-500/30"
            vizColor="bg-emerald-400"
            delay="0.2s"
          />
        </div>
      </div>
    </section>
  );
}
