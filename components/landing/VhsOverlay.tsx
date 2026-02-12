/* Overlay VHS — deux couches superposées sur toute la page :
   1. Des lignes de scan horizontales (comme un vieux téléviseur)
   2. Du grain/bruit visuel généré par un SVG inline
   Purement décoratif, caché des lecteurs d'écran. */

export default function VhsOverlay() {
  return (
    <div aria-hidden="true">
      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] mix-blend-multiply"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />
      {/* Noise grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.02] bg-repeat bg-[length:200px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
