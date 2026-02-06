"use client";

import { TransformedAnime, TransformedTheme } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";

interface AnimeListProps {
  anime: TransformedAnime[];
}

function ThemeCard({ theme }: { theme: TransformedTheme }) {
  const isOP = theme.type === "OP";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl = theme.videos?.[0]?.audioUrl ?? theme.videos?.[0]?.link;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((p) => !p);
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl p-3 transition-all ${
        isOP
          ? "bg-blue-500/5 hover:bg-blue-500/10"
          : "bg-purple-500/5 hover:bg-purple-500/10"
      }`}
    >
      {/* Play Button */}
      {audioUrl ? (
        <>
          <button
            onClick={togglePlay}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm text-white transition-all hover:scale-105 active:scale-95 ${
              isOP ? "bg-blue-500" : "bg-purple-500"
            } ${isPlaying ? "shadow-lg" : ""}`}
          >
            {isPlaying ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <audio
            ref={audioRef}
            src={audioUrl}
            preload="none"
            onEnded={() => setIsPlaying(false)}
          />
        </>
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
          <svg className="h-4 w-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              isOP
                ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
            }`}
          >
            {theme.type}
            {theme.sequence ?? ""}
          </span>
        </div>

        <p className="mt-0.5 truncate text-sm font-medium text-zinc-900 dark:text-white">
          {theme.song ?? "Unknown"}
        </p>

        {theme.artists.length > 0 && (
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            {theme.artists.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

function AnimeCard({ anime }: { anime: TransformedAnime }) {
  const allThemes = [...(anime.openings ?? []), ...(anime.endings ?? [])];

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header with Image */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
        {anime.image && (
          <Image
            src={anime.image}
            alt={anime.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-80 transition-transform group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-white drop-shadow-md">
            {anime.name}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {anime.year && (
              <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {anime.year}
              </span>
            )}
            {anime.season && (
              <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium capitalize text-white backdrop-blur-sm">
                {anime.season}
              </span>
            )}
            <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              {anime.openings?.length ?? 0} OP · {anime.endings?.length ?? 0} ED
            </span>
          </div>
        </div>
      </div>

      {/* Themes */}
      <div className="space-y-1 p-3">
        {allThemes.map((theme, i) => (
          <ThemeCard
            key={`${anime.id}-${theme.type}-${theme.sequence ?? i}`}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

export default function AnimeList({ anime }: AnimeListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {anime.map((a) => (
        <AnimeCard key={a.id} anime={a} />
      ))}
    </div>
  );
}
