import Image from "next/image";
import Link from "next/link";

/* Bannière panoramique — grande image (21:9) avec overlay gradient
   et un CTA "Trouve le titre avant la fin" + bouton "Lancer une partie". */

export default function SpotlightBanner() {
  return (
    <section aria-label="Lancer une partie" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="group relative overflow-hidden rounded-md border border-white/[0.06]">
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src="/images/panorama.jpg"
              alt="Mosaïque de scènes iconiques d'anime, films et séries"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
          {/* Overlay texte */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#07060b] via-[#07060b]/60 to-transparent p-8 text-center">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-cyan-400/70">
              Prêt à tester tes oreilles ?
            </p>
            <h2 className="mb-6 font-display text-3xl text-white md:text-5xl">
              Trouve le titre{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                avant la fin
              </span>
            </h2>
            <Link
              href="/chill"
              className="clip-cyber bg-gradient-to-r from-cyan-400 to-blue-500 px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#07060b] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Lancer une partie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
