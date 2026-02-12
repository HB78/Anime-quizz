import FeatureCell from "./FeatureCell";

/* Section fonctionnalités — grille 2x2 de FeatureCells.
   Présente les 4 points forts du site. */

export default function FeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
            {"// Ce qui t'attend"}
          </span>
          <h2 id="features-heading" className="font-display text-4xl text-white md:text-5xl">
            Fonctionnalités
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FeatureCell
            icon="⚡"
            title="Gameplay rapide"
            desc="10 à 20 secondes pour reconnaître le titre. Chaque seconde compte."
          />
          <FeatureCell
            icon="🎼"
            title="3 univers musicaux"
            desc="Anime, films et séries TV. Des centaines de soundtracks à découvrir."
          />
          <FeatureCell
            icon="🎮"
            title="Multiples modes"
            desc="Quiz hardcore pour otakus, mode chill accessible à tous, ou entraînement libre."
          />
          <FeatureCell
            icon="📊"
            title="Suivi & progression"
            desc="Stats détaillées, historique de tes parties et amélioration continue."
          />
        </div>
      </div>
    </section>
  );
}
