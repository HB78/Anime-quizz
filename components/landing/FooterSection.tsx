import Link from "next/link";

/* Footer — CTA final avec "Ready?" en gros gradient (cyan → rose → jaune),
   bouton "Lancer une partie" qui passe de cyan à rose au hover, et copyright. */

export default function FooterSection() {
  return (
    <footer aria-label="Appel à l'action et copyright" className="relative z-10 border-t border-white/[0.03] px-6 py-16 text-center">
      <p
        className="mb-8 font-display"
        style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
      >
        <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-300 bg-clip-text text-transparent">
          Ready?
        </span>
      </p>
      <Link
        href="/chill"
        className="clip-cyber mb-10 inline-block bg-cyan-400 px-12 py-5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#07060b] transition-all duration-400 hover:-translate-y-1 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_60px_rgba(255,0,170,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
      >
        Lancer une partie
      </Link>
      <p className="mt-10 font-mono text-[0.6rem] tracking-[0.1em] text-zinc-600">
        AnimeQuiz — 2025 — Fait avec passion et nostalgie
      </p>
    </footer>
  );
}
