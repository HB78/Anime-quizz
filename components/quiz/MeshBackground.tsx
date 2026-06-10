export function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Mesh animé */}
      <div
        className="absolute -inset-[30%] animate-mesh-drift blur-[60px]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, oklch(0.4 0.16 250 / 0.6), transparent 50%),
            radial-gradient(circle at 80% 20%, oklch(0.35 0.14 270 / 0.5), transparent 50%),
            radial-gradient(circle at 60% 80%, oklch(0.38 0.14 230 / 0.5), transparent 50%),
            radial-gradient(circle at 30% 70%, oklch(0.35 0.12 210 / 0.4), transparent 50%)
          `,
        }}
      />

      {/* Vignette pour lisibilité */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
