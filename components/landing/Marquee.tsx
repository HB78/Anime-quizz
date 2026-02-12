/* Bandeau défilant — liste de noms de titres d'anime, films et séries
   qui défilent horizontalement en boucle infinie.
   Sert de séparateur visuel entre le Hero et les sections suivantes.
   Purement décoratif, caché des lecteurs d'écran. */

const MARQUEE_ITEMS = [
  "Naruto", "One Piece", "Attack on Titan", "Demon Slayer",
  "Interstellar", "Inception", "Jujutsu Kaisen", "Stranger Things",
  "Cowboy Bebop", "Breaking Bad", "Evangelion", "The Dark Knight",
  "Dragon Ball", "Game of Thrones", "Bleach", "Spirited Away",
  "Chainsaw Man", "The Witcher", "Hunter × Hunter", "Arcane",
];

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 overflow-hidden border-y border-white/[0.03] bg-black/30 py-4"
    >
      <div
        className="flex animate-marquee gap-12 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
          <span
            key={i}
            className="font-display text-sm text-zinc-600 flex items-center gap-4"
          >
            {t}
            <span className="text-[0.5rem] text-cyan-400/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
