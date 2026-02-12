/* Effet glitch cyberpunk — enveloppe du texte avec deux pseudo-éléments
   (::before en cyan, ::after en rose) qui se décalent via les animations
   glitch1/glitch2 définies dans globals.css.
   Le texte original est passé via data-text pour alimenter `content: attr(data-text)`. */

export default function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block glitch-text ${className}`}
      data-text={children}
    >
      {children}
    </span>
  );
}
