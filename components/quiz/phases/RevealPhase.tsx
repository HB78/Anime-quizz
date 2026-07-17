import { QuizQuestion } from "@/hooks/use-quiz";
import Image from "next/image";
import { useState } from "react";

interface RevealPhaseProps {
  question: QuizQuestion;
}

export function RevealPhase({ question }: RevealPhaseProps) {
  const [imgSrc, setImgSrc] = useState(question.imageUrl);

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ animation: "reveal-fade-in 700ms cubic-bezier(.4,0,.2,1) both" }}
    >
      {/* Image plein écran nette */}
      {imgSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imgSrc})`,
            animation: "reveal-bg-zoom 18s ease-in-out infinite alternate",
          }}
        >
          <Image
            src={imgSrc}
            alt={question.source}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            onError={() =>
              setImgSrc(
                question.imageUrl?.replace("maxresdefault", "hqdefault") ?? "",
              )
            }
          />
        </div>
      )}

      {/* Fallback fond sombre si pas d'image */}
      {!imgSrc && <div className="absolute inset-0 bg-zinc-950" />}

      {/* Dégradé bas pour la lisibilité */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />
      {/* Dégradé gauche pour ancrer le texte */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, transparent 55%)",
        }}
      />

      {/* Hint "Suivant" — haut droite */}
      <div
        className="absolute right-9 top-8 z-10 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-3.5 py-2 backdrop-blur-sm"
        style={{ animation: "reveal-fade-in 500ms 600ms ease both" }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full bg-white"
          style={{ animation: "accent-pulse 1s ease-in-out infinite" }}
        />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
          Suivant dans 2s
        </span>
      </div>

      {/* Bloc texte — bas gauche */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-10 pb-16 md:px-16 md:pb-20">
        <div className="max-w-4xl">

          {/* Badge Réponse */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
            style={{ animation: "reveal-drop-down 500ms 100ms ease both" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white">
              Réponse
              {question.type && ` · ${question.type}`}
              {question.sequence ? ` ${question.sequence}` : ""}
            </span>
          </div>

          {/* Titre principal */}
          <h2
            className="mb-3 font-bold leading-[0.92] tracking-tight text-white"
            style={{
              fontSize: "clamp(48px, 7vw, 112px)",
              textShadow: "0 4px 40px rgba(0,0,0,0.6)",
              animation: "reveal-letter-in 700ms 250ms ease both",
            }}
          >
            {question.source}
          </h2>

          {/* Sous-titre si différent du titre */}
          {question.correctAnswer !== question.source && (
            <div
              className="mb-6 text-xl font-normal text-white/80 md:text-2xl"
              style={{ animation: "reveal-letter-in 700ms 350ms ease both" }}
            >
              {question.correctAnswer}
            </div>
          )}

          {/* Métadonnées */}
          {(question.artist || question.year) && (
            <div
              className="flex flex-wrap gap-8 border-t border-white/15 pt-5"
              style={{ animation: "reveal-letter-in 700ms 450ms ease both" }}
            >
              {question.artist && (
                <div>
                  <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                    Artiste
                  </div>
                  <div className="text-base font-semibold text-white">
                    {question.artist}
                  </div>
                </div>
              )}
              {question.year && (
                <div>
                  <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                    Année
                  </div>
                  <div className="text-base font-semibold text-white">
                    {question.year}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
