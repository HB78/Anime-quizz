/* Cellule de fonctionnalité — bloc avec icône, titre et description.
   Bordure arrondie, fond légèrement éclairci au hover avec glow subtil. */

export default function FeatureCell({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="group rounded-xl border border-white/[0.06] bg-[#0e0c14] p-8 transition-all duration-300 hover:border-white/10 hover:bg-[#121019]"
      role="article"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-2xl transition-colors group-hover:border-white/10">
        <span role="img" aria-hidden="true">{icon}</span>
      </div>
      <h3 className="mb-2 font-display text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
    </div>
  );
}
