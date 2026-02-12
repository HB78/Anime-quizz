import UniverseCard from "./UniverseCard";

/* Section univers — présente les 3 univers du quiz (Anime, Films, Séries)
   avec un header "// Trois univers, une passion" et une grille de 3 cartes. */

export default function UniversesSection() {
  return (
    <section id="univers" aria-labelledby="universes-heading" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header de section */}
        <div className="mb-16 text-center">
          <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
            {"// Trois univers, une passion"}
          </span>
          <h2 id="universes-heading" className="font-display text-4xl text-white md:text-5xl">
            Anime · Films · Séries
          </h2>
        </div>

        {/* Grille de 3 cartes */}
        <div className="grid gap-10 md:grid-cols-3">
          <UniverseCard
            index={0}
            title="Anime"
            titleJp="アニメ"
            description="Des openings légendaires de Naruto aux endings mélancoliques de Clannad. Des centaines de titres de toutes les époques."
            imageSrc="/images/animequizz.jpg"
            accentColor="#00f0ff"
            examples={[
              "Naruto", "One Piece", "AOT", "Demon Slayer", "Bleach", "Evangelion",
            ]}
          />
          <UniverseCard
            index={1}
            title="Films"
            titleJp="映画"
            description="Les BO mythiques du cinéma : de Hans Zimmer à Joe Hisaishi. Reconnais la musique, trouve le film."
            imageSrc="/images/interstellaranimequizz.jpg"
            accentColor="#ff00aa"
            examples={[
              "Interstellar", "Inception", "Star Wars", "Spirited Away", "The Dark Knight",
            ]}
          />
          <UniverseCard
            index={2}
            title="Séries"
            titleJp="ドラマ"
            description="De Stranger Things à Game of Thrones. Les thèmes qui restent en tête bien après le générique."
            imageSrc="/images/smallville.jpg"
            accentColor="#ffe100"
            examples={[
              "Stranger Things", "Breaking Bad", "GOT", "Arcane", "The Witcher",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
