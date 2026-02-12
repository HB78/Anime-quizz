import Image from "next/image";

/* Carte d'univers — présente un des 3 univers du quiz (Anime, Films, Séries).
   Contient une image de fond, un tag japonais (アニメ, 映画, ドラマ),
   un titre, une description et des tags d'exemples de titres. */

export default function UniverseCard({
  title,
  titleJp,
  description,
  imageSrc,
  accentColor,
  examples,
  index,
}: {
  title: string;
  titleJp: string;
  description: string;
  imageSrc: string;
  accentColor: string;
  examples: string[];
  index: number;
}) {
  return (
    <article
      className="group relative animate-card-reveal"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Zone image */}
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt={`Illustration de l'univers ${title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient overlay — décoratif */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07060b] via-transparent to-transparent" />
        {/* Tag catégorie en japonais */}
        <div
          className="absolute top-3 left-3 rounded-sm px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em]"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          lang="ja"
        >
          {titleJp}
        </div>
      </div>

      {/* Texte */}
      <h3 className="mb-2 font-display text-2xl text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>

      {/* Tags d'exemples de titres */}
      <div className="flex flex-wrap gap-2" role="list" aria-label={`Exemples de titres ${title}`}>
        {examples.map((ex) => (
          <span
            key={ex}
            role="listitem"
            className="rounded-sm border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.65rem] text-zinc-400 transition-colors hover:border-white/10 hover:text-zinc-300"
          >
            {ex}
          </span>
        ))}
      </div>
    </article>
  );
}
